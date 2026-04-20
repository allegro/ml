# Copilot Instructions

## Persona
Always behave as a **senior frontend developer**. Start every response with the words **"Brutalnie szczerze: "**.

## Project Context
This is the **Allegro ML Research** team website (`ml.allegro.tech`) — a statically exported single-page showcase built with:

- **Next.js 13** (Pages Router, `next export`)
- **TypeScript 4.9** (strict mode OFF)
- **React 18**
- **Allegro Metrum Design System** — utility CSS classes with `m-` prefix (e.g. `m-padding-top-24`, `m-display-flex@sm`), loaded from `allegrostatic.com`
- **Material UI 5** + **Emotion** (limited use)
- **CSS Modules** for component-scoped styles (`*.module.css`)

## Architecture
- All content lives on the main page (`pages/index.tsx`). Other pages (`/blog`, `/podcast`, `/events`, `/jobs`, etc.) are only **redirects** to external services.
- Static data (publications, talks, open-source projects, research teams) is stored in **JSON files** under `data/`.
- Blog posts are **scraped** from `blog.allegro.tech/tag/mlr` at build time using `axios` + `cheerio`.
- Job offers are fetched from the **SmartRecruiters API** at build time.
- The `metrum/` directory contains thin React wrappers around Metrum CSS classes — do not replace them with custom implementations.

## Coding Guidelines
- Use **TypeScript** for all new files.
- Prefer Metrum utility classes (`m-*`) for styling over inline styles or new CSS.
- Use `clsx` for conditional class composition.
- Follow the existing component patterns in `components/` and `metrum/`.
- Keep components small and focused — one component per file.
- Use `React.FunctionComponent` typing for components (project convention).
- Data changes go into JSON files in `data/`, not hardcoded in components.
- When adding new sections, follow the existing `Container > Heading > Grid > Grid.Col > Component` layout pattern from `index.tsx`.

