# SEO Configuration - Nirmal Family Restaurant

## Meta Tags

### Required for all pages

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Nirmal Family Restaurant & Party Hall - Authentic Indian flavors in Habri Road, Gausala Market. Book tables, host events, and celebrate special occasions with us." />
<meta name="keywords" content="nirmal restaurant, indian restaurant, habri road, gausala market, party hall, wedding venue, corporate events, family dining" />
<meta name="author" content="Nirmal Family Restaurant" />
<title>Nirmal Family Restaurant & Party Hall</title>
```

### Page-specific meta tags

| Page | title | description |
|------|-------|-------------|
| Home | Nirmal Family Restaurant & Party Hall | Authentic Indian flavors, heritage restaurant in Habri Road. Book tables for lunch or dinner. Walk-ins welcome. |
| About | Nirmal Family Restaurant & Party Hall - Our Story | Rooted in family, seasoned with love. The journey of Nirmal Restaurant since 2025. |
| Menu | Nirmal Family Restaurant & Party Hall - Menu | Authentic Indian cuisine menu. Discover our dishes and flavors at Nirmal Restaurant. |
| Banquet | Nirmal Party Hall & Event Venue | Host your cherished moments at Nirmal Party Hall. Weddings, corporate events, parties up to 500 guests. |
| Contact | Nirmal Family Restaurant & Party Hall - Contact Us | Get in touch. Location: Habri Road, Gausala Market. +91 98139 54399. Open daily. |
| Gallery | Nirmal Family Restaurant & Party Hall - Gallery | View our hall, events, and dining setup. Celebrate special moments at Nirmal. |
| Testimonials | Nirmal Family Restaurant & Party Hall - Testimonials | What our guests say about their experiences at Nirmal Family Restaurant. |

## OG (Open Graph) Tags

```html
<meta property="og:title" content="Nirmal Family Restaurant & Party Hall" />
<meta property="og:description" content="Authentic Indian flavors in Habri Road, Gausala Market. Book tables, host events, and celebrate special occasions with us." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://nirmal-restaurant.vercel.app" />
<meta property="og:image" content="https://nirmal-restaurant.vercel.app/images/exterior.jpg" />
<meta property="og:site_name" content="Nirmal Family Restaurant" />
<meta property="og:locale" content="en_IN" />
```

## Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Nirmal Family Restaurant & Party Hall" />
<meta name="twitter:description" content="Authentic Indian flavors in Habri Road, Gausala Market. Book tables, host events, and celebrate special occasions with us." />
<meta name="twitter:image" content="https://nirmal-restaurant.vercel.app/images/exterior.jpg" />
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
Allow: /menu
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
    <loc>https://nirmal-restaurant.vercel.app/menu</loc>
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