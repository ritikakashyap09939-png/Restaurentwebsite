# Nirmal Family Restaurant and Party Hall

A multi-page restaurant website for Nirmal Family Restaurant and Party Hall, featuring the menu, banquet/party hall bookings, gallery, testimonials, and a contact form.

## Run & Operate

- `pnpm --filter @workspace/nirmal-restaurant run dev` — run the restaurant website (managed by the "artifacts/nirmal-restaurant: web" workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (requires `DATABASE_URL`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes to the database (dev only)
- Required env for API server: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite, Tailwind CSS, shadcn/ui, Wouter (routing), Framer Motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (schema currently empty — no tables defined yet)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/`)
- Build: esbuild (API server)

## Where things live

- `artifacts/nirmal-restaurant/src/pages/` — one file per page (Home, About, Menu, Banquet, Gallery, Testimonials, Contact)
- `artifacts/nirmal-restaurant/src/components/` — shared components (Navbar, Footer, UI primitives)
- `artifacts/api-server/src/routes/` — Express route handlers
- `lib/db/src/schema/index.ts` — Drizzle schema (add tables here)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contracts)
- `attached_assets/generated_images/` — restaurant images used throughout the site

## Architecture decisions

- Vite config reads `PORT` and `BASE_PATH` from env at startup — both are injected automatically by the Replit artifact system; do not hard-code them.
- The DB schema is intentionally empty on import; tables should be added when the backend features (reservations, contact submissions) are built out.
- Routing uses Wouter with `BASE_URL` as the base path to stay compatible with Replit's path-based artifact routing.

## Product

Multi-page website for a family-run Indian restaurant and party hall. Pages: Home (hero + highlights), About, Menu (food items), Banquet (party hall details), Gallery, Testimonials, Contact.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `pnpm install` must be run from the workspace root before any workflow will start — individual package `node_modules` are absent until then.
- Vite throws at startup if `PORT` or `BASE_PATH` are missing — these are set automatically when running through the Replit workflow, not when invoking `vite` directly.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
