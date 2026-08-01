# Nirmal Family Restaurant and Party Hall

A professional multi-page restaurant and banquet hall website built with React + Vite + Tailwind CSS.

## Pages
- **Home** — Hero, highlights, featured dishes, party hall preview, testimonials, CTA
- **About Us** — Story, family values, team photos
- **Menu** — Categorized dishes with Veg/Non-Veg filter tabs
- **Party Hall / Banquet** — Hall details, event types, packages, enquiry form
- **Gallery** — Photo grid with lightbox
- **Testimonials** — Customer reviews with star ratings
- **Contact** — Google Map, contact form, WhatsApp button

## Tech Stack
- React 19 + Vite 7
- Tailwind CSS v4
- Wouter (routing)
- Framer Motion (animations)
- Radix UI + shadcn/ui components
- React Hook Form + Zod (forms)

## How to Run
The app runs via the **"Start application"** workflow.

```
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/nirmal-restaurant run dev
```

App is served at port **5173**.

## Project Structure
```
artifacts/nirmal-restaurant/
  src/
    pages/       — Home, About, Menu, Banquet, Gallery, Testimonials, Contact
    components/  — Navbar, Footer, BookingModal, UI components
    hooks/       — Custom React hooks
    lib/         — Utilities
```

## User Preferences
- Language: Hindi/English mixed (Hinglish)
