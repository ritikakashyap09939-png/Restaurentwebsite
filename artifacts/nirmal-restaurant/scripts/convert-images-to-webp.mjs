import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(projectRoot, '..', '..');

const roots = [
  path.join(workspaceRoot, 'attached_assets'),
  path.join(projectRoot, 'public', 'images'),
];

const IMAGE_EXT = ['.jpg', '.jpeg', '.png'];
const QUALITY = 85;

async function collectImages(dir) {
  const found = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collectImages(fullPath)));
    } else if (IMAGE_EXT.includes(path.extname(entry.name).toLowerCase())) {
      found.push(fullPath);
    }
  }
  return found;
}

function toWebpPath(filePath) {
  return filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

async function main() {
  let totalOriginal = 0;
  let totalWebp = 0;
  let converted = 0;
  let skipped = 0;
  let failed = 0;
  const results = [];

  for (const root of roots) {
    const images = await collectImages(root);
    for (const imagePath of images) {
      const webpPath = toWebpPath(imagePath);

      if (await exists(webpPath)) {
        const origSize = (await stat(imagePath)).size;
        const webpSize = (await stat(webpPath)).size;
        totalOriginal += origSize;
        totalWebp += webpSize;
        skipped++;
        results.push({ file: webpPath, saved: origSize - webpSize, skipped: true });
        continue;
      }

      const origSize = (await stat(imagePath)).size;
      try {
        await sharp(imagePath)
          .webp({ quality: QUALITY, effort: 4 })
          .toFile(webpPath);
        const webpSize = (await stat(webpPath)).size;
        totalOriginal += origSize;
        totalWebp += webpSize;
        converted++;
        results.push({ file: webpPath, saved: origSize - webpSize, origSize, webpSize });
      } catch (err) {
        failed++;
        process.stderr.write(`FAILED: ${imagePath} -> ${err.message}\n`);
        totalOriginal += origSize;
      }
    }
  }

  for (const r of results) {
    if (r.skipped) {
      process.stdout.write(`SKIP ${path.relative(workspaceRoot, r.file)} (already webp)\n`);
    } else {
      const pct = r.origSize > 0 ? ((r.saved / r.origSize) * 100).toFixed(1) : '0.0';
      process.stdout.write(
        `${pct.padStart(6)}%  ${(r.saved / 1024).toFixed(1).padStart(9)}KB  ${r.origSize / 1024}KB -> ${(r.webpSize / 1024).toFixed(1)}KB  ${path.relative(workspaceRoot, r.file)}\n`,
      );
    }
  }

  const saved = totalOriginal - totalWebp;
  const pct = totalOriginal > 0 ? ((saved / totalOriginal) * 100).toFixed(1) : '0.0';
  process.stdout.write(`\n== SUMMARY ==\n`);
  process.stdout.write(`Converted: ${converted}, skipped: ${skipped}, failed: ${failed}\n`);
  process.stdout.write(
    `Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB, WebP total: ${(totalWebp / 1024 / 1024).toFixed(2)} MB\n`,
  );
  process.stdout.write(`Size reduction: ${saved / 1024 / 1024} MB saved (${pct}% smaller)\n`);
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

await main();