# AGENT.md — Nirmal Family Restaurant & Party Hall

This file is the **single source of truth** for this project. Every agent (including future sessions of this agent) MUST read this file first to understand the project, its architecture, and the current task state. All work done MUST be appended to this file.

---

## Project Overview

**Name:** Nirmal Family Restaurant and Party Hall  
**Type:** Multi-page restaurant + banquet hall website  
**Architecture:** pnpm monorepo with shared libraries + two main artifacts:
- `artifacts/nirmal-restaurant/` — React 19 + Vite 7 frontend (port 5173)
- `artifacts/api-server/` — Express 5 API backend (port 8080)
- `lib/` — Shared libraries (API spec, Zod schemas, React client, DB layer)

**Tech Stack:**
- React 19, TypeScript, Vite 7
- Tailwind CSS v4
- Express 5, Drizzle ORM, PostgreSQL
- pnpm workspaces with catalog
- Radix UI primitives, lucide-react, framer-motion
- TanStack Query (React Query), wouter (routing), zod
- pino logging
- Orval for OpenAPI codegen

---

## Project Structure

```
Restaurentwebsite/
├── package.json                 # Root workspace config
├── pnpm-workspace.yaml          # pnpm monorepo config (catalog, overrides, security)
├── tsconfig.base.json           # Base TypeScript config
├── replit.md                    # Project documentation
├── AGENT.md                     # THIS FILE
├── lib/                         # Shared libraries (internal packages)
│   ├── api-spec/                # OpenAPI 3.1 spec + Orval codegen config
│   │   ├── openapi.yaml         # API contract (source of truth)
│   │   ├── orval.config.ts      # Orval config for codegen
│   │   └── package.json         # Runs: pnpm codegen
│   ├── api-zod/                 # Zod schemas generated from OpenAPI
│   │   ├── src/
│   │   │   ├── index.ts         # Exports all generated types
│   │   │   └── generated/       # Auto-generated (do not edit)
│   │   └── package.json
│   ├── api-client-react/        # TanStack Query hooks generated from OpenAPI
│   │   ├── src/
│   │   │   ├── index.ts         # Exports hooks + custom fetch
│   │   │   ├── custom-fetch.ts  # Fetch wrapper with base URL
│   │   │   └── generated/       # Auto-generated hooks (do not edit)
│   │   └── package.json
│   └── db/                      # Drizzle ORM database layer
│       ├── src/
│       │   ├── index.ts         # DB connection + exports
│       │   └── schema/          # Table definitions (currently empty template)
│       ├── drizzle.config.ts    # Drizzle Kit config
│       └── package.json         # Scripts: push, push-force
├── artifacts/
│   ├── nirmal-restaurant/       # Frontend
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── App.tsx          # Routes + providers (QueryClient, Tooltip, Toaster)
│   │   │   ├── index.css        # Tailwind v4 entry (@import "tailwindcss")
│   │   │   ├── lib/
│   │   │   │   ├── utils.ts     # cn() helper (clsx + tailwind-merge)
│   │   │   │   └── paths.ts     # Asset paths
│   │   │   ├── hooks/
│   │   │   │   ├── use-toast.ts
│   │   │   │   └── use-mobile.tsx
│   │   │   ├── components/
│   │   │   │   ├── ui/          # 50+ Radix-based UI components
│   │   │   │   ├── Navbar.tsx   # Fixed header, nav links, Book Table button
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Chatbot.tsx  # Floating AI chat widget (calls /api/chat)
│   │   │   │   └── BookingModal.tsx
│   │   │   └── pages/
│   │   │       ├── Home.tsx
│   │   │       ├── About.tsx
│   │   │       ├── Menu.tsx
│   │   │       ├── Banquet.tsx
│   │   │       ├── Gallery.tsx
│   │   │       ├── Testimonials.tsx
│   │   │       ├── Contact.tsx
│   │   │       └── not-found.tsx
│   └── api-server/              # Backend
│       ├── package.json
│       ├── build.mjs            # esbuild bundler (outputs dist/index.mjs)
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts         # Entry: starts server on PORT
│           ├── app.ts           # Express middleware, CORS, JSON parsing, route mounting
│           ├── routes/
│           │   ├── index.ts     # Route registry
│           │   ├── health.ts    # GET /healthz (health check)
│           │   └── chat.ts      # POST /api/chat (AI assistant)
│           ├── middlewares/
│           └── lib/
│               └── logger.ts    # pino logger
├── scripts/                     # Utility scripts
└── attached_assets/             # Generated images for frontend
    └── generated_images/
```

---

## Shared Libraries (lib/)

| Package | Purpose | Key Files |
|---------|---------|-----------|
| `@workspace/api-spec` | OpenAPI 3.1 spec + Orval codegen | `openapi.yaml`, `orval.config.ts` |
| `@workspace/api-zod` | Zod validation schemas from OpenAPI | `src/generated/` (auto-generated) |
| `@workspace/api-client-react` | TanStack Query hooks + fetch client | `src/generated/api.ts`, `custom-fetch.ts` |
| `@workspace/db` | Drizzle ORM schema + connection | `src/schema/`, `drizzle.config.ts` |

**Codegen workflow:**  
`pnpm --filter @workspace/api-spec run codegen` → generates types in `api-zod` + hooks in `api-client-react` → runs `typecheck:libs`

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `artifacts/nirmal-restaurant/src/App.tsx` | Route definitions (wouter), providers (QueryClient, Tooltip, Toaster) |
| `artifacts/nirmal-restaurant/src/components/Navbar.tsx` | Fixed header, navigation, "Book Table" modal trigger |
| `artifacts/nirmal-restaurant/src/components/Chatbot.tsx` | Floating AI chat widget, calls `/api/chat` |
| `artifacts/api-server/src/routes/chat.ts` | Chat endpoint logic |
| `artifacts/api-server/src/app.ts` | Express middleware, CORS, JSON parsing, route mounting |
| `lib/api-spec/openapi.yaml` | **Source of truth** for API contract |
| `lib/api-spec/orval.config.ts` | Orval config: outputs to api-zod + api-client-react |
| `pnpm-workspace.yaml` | Catalog versions, security overrides (minReleaseAge), package globs |

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, highlights, quick stats |
| `/about` | About Us | Restaurant story & values |
| `/menu` | Menu | Dishes with veg/non-veg filter |
| `/banquet` | Banquet | Party hall booking info |
| `/gallery` | Gallery | Photo gallery |
| `/testimonials` | Reviews | Customer testimonials |
| `/contact` | Contact | Contact form + location |
| `*` | NotFound | 404 page |

---

## API Endpoints

| Method | Path | Operation | Description |
|--------|------|-----------|-------------|
| GET | `/healthz` | healthCheck | Health check (returns `{ status: "ok" }`) |
| POST | `/api/chat` | — | AI assistant chat endpoint |

*Defined in `lib/api-spec/openapi.yaml` — update there, then run codegen.*

---

## Commands

```bash
# Install deps (run from workspace root)
pnpm install

# Dev: runs both frontend & backend via managed workflows
# Frontend: pnpm --filter @workspace/nirmal-restaurant run dev (port 5173)
# Backend:  pnpm --filter @workspace/api-server run dev (port 8080)

# Build all
pnpm run build

# Typecheck all (includes libs)
pnpm run typecheck

# Typecheck libs only
pnpm run typecheck:libs

# Generate API types/hooks from OpenAPI spec
pnpm --filter @workspace/api-spec run codegen

# Database push (Drizzle)
pnpm --filter @workspace/db run push
pnpm --filter @workspace/db run push-force  # force schema changes
```

---

## Environment Variables

**Backend (`artifacts/api-server`):**
- `PORT` — Required (e.g., 8080)
- `DATABASE_URL` — PostgreSQL connection string (for Drizzle)

**Frontend:**
- `BASE_URL` — Vite base path (handled by Vite config)

---

## Current Task State

> **INITIALIZED** — AGENT.md updated with full architecture including shared libraries. No active tasks yet.

---

## Task Log

*All work performed by agents must be appended here with timestamp, agent/session ID, and description.*

| Date | Agent/Session | Task | Status |
|------|---------------|------|--------|
| 2026-08-26 | Initial setup | Created AGENT.md with full project documentation | ✅ Done |
| 2026-08-27 | Architecture audit | Added shared libraries (api-spec, api-zod, api-client-react, db), OpenAPI codegen workflow, Drizzle DB layer, API endpoints table | ✅ Done |

---

## Instructions for Future Agents

1. **Read this file first** — before doing any work
2. **Update the Task Log** — append every task you perform with date, agent/session, task description, status
3. **Keep Current Task State current** — reflect what you're working on
4. **Document decisions** — if you make architectural choices, note them here
5. **Reference file paths** — use `file_path:line_number` format when discussing code
6. **API changes** — modify `lib/api-spec/openapi.yaml`, then run `pnpm --filter @workspace/api-spec run codegen`
7. **Database changes** — add tables to `lib/db/src/schema/`, then run `pnpm --filter @workspace/db run push`

(End of file)