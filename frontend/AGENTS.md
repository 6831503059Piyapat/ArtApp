# Agent Guidelines - Frontend Application

## Project Overview
This project is a modern Frontend application built with **React / Next.js / TypeScript / Tailwind CSS**.

---

## 1. Essential Commands

### Development
- `npm run dev` / `pnpm dev` : Start local development server
- `npm run build` / `pnpm build` : Build application for production
- `npm run start` / `pnpm start` : Run production build locally

### Quality & Testing
- `npm run lint` / `pnpm lint` : Run ESLint checks
- `npm run lint:fix` / `pnpm lint:fix` : Fix ESLint errors automatically
- `npm run format` / `pnpm format` : Format code using Prettier
- `npm run type-check` / `pnpm typecheck` : Run TypeScript type checking without emitting files
- `npm run test` / `pnpm test` : Run unit/integration tests with Vitest/Jest
- `npm run test:e2e` / `pnpm test:e2e` : Run Playwright/Cypress end-to-end tests

---

## 2. Tech Stack & Libraries
- **Framework**: Next.js (App Router) / React 18+
- **Language**: TypeScript (Strict Mode enabled)
- **Styling**: Tailwind CSS / Shadcn UI / CSS Modules
- **State Management**: Zustand / React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod
- **Testing**: Vitest + React Testing Library

---

## 3. Project Structure & Conventions

```text
src/
├── app/             # App router pages and layouts
├── components/      # UI components
│   ├── ui/          # Low-level reusable components (buttons, inputs)
│   └── features/    # Feature-specific components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions, API clients, helpers
├── services/        # API calls and data fetching logic
├── store/           # Global state stores (Zustand)
└── types/           # TypeScript interfaces and types