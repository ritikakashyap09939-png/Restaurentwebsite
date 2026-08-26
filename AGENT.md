# AGENT.md — Nirmal Family Restaurant & Party Hall

This file is the **single source of truth** for this project. Every agent (including future sessions of this agent) MUST read this file first to understand the project, its architecture, and the current task state. All work done MUST be appended to this file.

---

## Project Overview

**Name:** Nirmal Family Restaurant and Party Hall  
**Type:** Multi-page restaurant + banquet hall website  
**Architecture:** pnpm monorepo with two main artifacts:
- `artifacts/nirmal-restaurant/` — React 19 + Vite 7 frontend (port 5173)
- `artifacts/api-server/` — Express 5 API backend (port 8080)

**Tech Stack:**
- React 19, TypeScript, Vite 7
- Tailwind CSS v4
- Express 5, Drizzle ORM
- pnpm workspaces
- Radix UI primitives, lucide-react, framer-motion
- TanStack Query, wouter (routing), zod
- pino logging

---

## Project Structure

```
Restaurentwebsite/
├── package.json                 # Root workspace config
├── pnpm-workspace.yaml          # pnpm monorepo config (catalog, overrides)
├── tsconfig.base.json           # Base TypeScript config
├── replit.md                    # Project documentation
├── AGENT.md                     # THIS FILE
├── artifacts/
│   ├── nirmal-restaurant/       # Frontend
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── App.tsx          # Routes + providers
│   │   │   ├── index.css        # Tailwind v4 entry
│   │   │   ├── lib/
│   │   │   │   ├── utils.ts     # cn() helper
│   │   │   │   └── paths.ts     # Asset paths
│   │   │   ├── hooks/
│   │   │   │   ├── use-toast.ts
│   │   │   │   └── use-mobile.tsx
│   │   │   ├── components/
│   │   │   │   ├── ui/          # 50+ Radix-based UI components
│   │   │   │   ├── Navbar.tsx   # Fixed header, nav links, Book Table button
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Chatbot.tsx  # AI assistant (calls /api/chat)
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
│       ├── build.mjs            # esbuild bundler
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts         # Entry: starts server on PORT
│           ├── app.ts           # Express app setup
│           ├── routes/
│           │   ├── index.ts     # Route registry
│           │   ├── health.ts    # GET /health
│           │   └── chat.ts      # POST /api/chat (AI assistant)
│           ├── middlewares/
│           └── lib/
│               └── logger.ts    # pino logger
├── scripts/                     # Utility scripts
└── attached_assets/             # Generated images for frontend
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `artifacts/nirmal-restaurant/src/App.tsx` | Route definitions (wouter), providers (QueryClient, Tooltip, Toaster) |
| `artifacts/nirmal-restaurant/src/components/Navbar.tsx` | Fixed header, navigation, "Book Table" modal trigger |
| `artifacts/nirmal-restaurant/src/components/Chatbot.tsx` | Floating AI chat widget, calls `/api/chat` |
| `artifacts/api-server/src/routes/chat.ts` | Chat endpoint logic |
| `artifacts/api-server/src/app.ts` | Express middleware, CORS, JSON parsing, route mounting |
| `pnpm-workspace.yaml` | Catalog versions, security overrides, package globs |

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

## Commands

```bash
# Install deps (run from workspace root)
pnpm install

# Dev: runs both frontend & backend via managed workflows
# Frontend: pnpm --filter @workspace/nirmal-restaurant run dev (port 5173)
# Backend:  pnpm --filter @workspace/api-server run dev (port 8080)

# Build all
pnpm run build

# Typecheck all
pnpm run typecheck
```

---

## Environment Variables

**Backend (`artifacts/api-server`):**
- `PORT` — Required (e.g., 8080)

**Frontend:**
- `BASE_URL` — Vite base path (handled by Vite config)

---

## Current Task State

> **INITIALIZED** — AGENT.md created. No active tasks yet.

---

## Task Log

*All work performed by agents must be appended here with timestamp, agent/session ID, and description.*

| Date | Agent/Session | Task | Status |
|------|---------------|------|--------|
| 2026-08-26 | Initial setup | Created AGENT.md with full project documentation | ✅ Done |

---

## Instructions for Future Agents

1. **Read this file first** — before doing any work
2. **Update the Task Log** — append every task you perform
3. **Keep Current Task State current** — reflect what you're working on
4. **Document decisions** — if you make architectural choices, note them here
5. **Reference file paths** — use `file_path:line_number` format when discussing code