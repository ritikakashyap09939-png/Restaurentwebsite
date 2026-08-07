const baseUrl = import.meta.env.BASE_URL;

export function publicAsset(path: string) {
  return `${baseUrl}${path.replace(/^\/+/, '')}`;
}