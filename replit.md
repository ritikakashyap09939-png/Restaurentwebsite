# Nirmal Family Restaurant and Party Hall

A professional multi-page restaurant and banquet hall website built with React + Vite (frontend) and Express (backend API).

## Project Structure

This is a pnpm monorepo with two main artifacts:

- `artifacts/nirmal-restaurant/` — React + Vite frontend (served at `/`)
- `artifacts/api-server/` — Express API backend (served at `/api`)
- `attached_assets/generated_images/` — Restaurant and dish photos used by the frontend

## Running the App

Both services start automatically via their managed workflows:

- **Frontend**: `artifacts/nirmal-restaurant: web` — runs `pnpm --filter @workspace/nirmal-restaurant run dev` on port 5173
- **API Server**: `artifacts/api-server: API Server` — runs `pnpm --filter @workspace/api-server run dev` on port 8080

To install dependencies: `pnpm install` from the workspace root.

## Pages

- **Home** — hero, highlights, quick stats
- **About Us** — restaurant story and values
- **Menu** — dishes with veg/non-veg filter
- **Banquet** — party hall booking information
- **Gallery** — photo gallery
- **Reviews** — customer testimonials
- **Contact** — contact form and location info

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS v4
- Express 5 (API)
- TypeScript throughout
- pnpm workspaces

## User Preferences

_None recorded yet._
