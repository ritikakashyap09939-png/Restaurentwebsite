# SEO Configuration - Nirmal Party Hall & Event Venue

## Meta Tags

### Required for all pages

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Nirmal Party Hall & Event Venue - A premium banquet hall on Habri Road, Gausala Market. Book weddings, birthdays, corporate events, and celebrations for up to 500 guests." />
<meta name="keywords" content="nirmal party hall, banquet hall, habri road, gausala market, wedding venue, corporate events, event venue, celebration hall, party hall near me" />
<meta name="author" content="Nirmal Party Hall" />
<title>Nirmal Party Hall & Event Venue</title>
```

### Page-specific meta tags

| Page | title | description |
|------|-------|-------------|
| Home | Nirmal Family Restaurant & Party Hall | Nirmal Family Restaurant & Party Hall - a premium event venue with a 500-guest banquet hall on Habri Road, Gausala Market. Weddings, birthdays, and corporate events. |
| About | Nirmal Family Restaurant & Party Hall - Our Story | Learn the story behind Nirmal Family Restaurant & Party Hall - a family-rooted event venue known for its elegant banquet hall, warm hospitality, and commitment to celebration since 2025. |
| Banquet | Nirmal Party Hall & Event Venue | Host your cherished moments at Nirmal Party Hall. Weddings, corporate events, parties up to 500 guests. |
| Contact | Nirmal Family Restaurant & Party Hall - Contact Us | Get in touch. Location: Habri Road, Gausala Market. +91 98139 54399. Open daily. |
| Gallery | Nirmal Party Hall & Event Venue - Gallery | Browse photos of Nirmal Party Hall — our spacious banquet hall, decorated entrance, elegant event setups, and memorable celebration moments. |
| Testimonials | Nirmal Party Hall & Event Venue - Testimonials | Read genuine guest reviews of Nirmal Party Hall. See why families and corporates trust our banquet venue, professional service, and unforgettable celebration experiences. |

## OG (Open Graph) Tags

```html
<meta property="og:title" content="Nirmal Party Hall & Event Venue" />
<meta property="og:description" content="A premium banquet hall on Habri Road, Gausala Market. Weddings, birthdays, corporate events, and celebrations for up to 500 guests." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://nirmal-restaurant.vercel.app" />
<meta property="og:image" content="https://nirmal-restaurant.vercel.app/images/exterior.webp" />
<meta property="og:site_name" content="Nirmal Party Hall" />
<meta property="og:locale" content="en_IN" />
```

## Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Nirmal Party Hall & Event Venue" />
<meta name="twitter:description" content="A premium banquet hall on Habri Road, Gausala Market. Weddings, birthdays, corporate events, and celebrations for up to 500 guests." />
<meta name="twitter:image" content="https://nirmal-restaurant.vercel.app/images/exterior.webp" />
<meta name="twitter:site" content="@nirmalrestaurant" />
<meta name="twitter:creator" content="@nirmalrestaurant">
```

## robots.txt Recommendations

Current `public/robots.txt`:
```
User-agent: *
Allow: /
```

Enhanced recommended `public/robots.txt`:
```
User-agent: *
Allow: /

# Disallow admin or private routes
Disallow: /api/

# Allow key public pages
Allow: /
Allow: /$
Allow: /about
Allow: /banquet
Allow: /contact
Allow: /gallery
Allow: /testimonials

# Sitemap location
Sitemap: https://nirmal-restaurant.vercel.app/sitemap.xml
```

## Sitemap Recommendations

Create `sitemap.xml` at the root with the following entries:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nirmal-restaurant.vercel.app/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nirmal-restaurant.vercel.app/about</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nirmal-restaurant.vercel.app/banquet</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nirmal-restaurant.vercel.app/gallery</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://nirmal-restaurant.vercel.app/contact</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nirmal-restaurant.vercel.app/testimonials</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

## Image SEO

- All images should have descriptive `alt` attributes
- Use WebP format for faster loading
- Implement `srcset` for responsive images
- Featured images should be 1200x630px for optimal social sharing