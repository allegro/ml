# Allegro ML Research Website

The official website of **[Allegro ML Research](https://ml.allegro.tech)** — Allegro's R&D lab dedicated to developing and applying state-of-the-art machine learning methods across e-commerce.

## Overview

This is a single-page showcase website presenting the work of the Allegro ML Research team, including:

- **Research Areas** — Machine Translation, Language Modeling, Learning to Rank, Computer Vision, Recommendations, and ML Ops
- **Talks** — Conference presentations and meetup recordings
- **Blog** — Latest posts from [blog.allegro.tech](https://blog.allegro.tech) (ML Research tagged)
- **Open Source** — Projects like [AlleNoise](https://github.com/allegro/AlleNoise), [allms](https://github.com/allegro/allms), [allRank](https://github.com/allegro/allRank), [HerBERT](https://huggingface.co/allegro/herbert-large-cased), and more
- **Publications** — Academic papers published at top venues (AAAI, ACL, EACL, AISTATS, RecSys, LREC, etc.)
- **Job Offers** — Current ML-related openings at Allegro (fetched from SmartRecruiters API)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 13](https://nextjs.org/) (Pages Router, Static Export) |
| Language | TypeScript 4.9 |
| UI Library | React 18 |
| Design System | [Allegro Metrum](https://allegro.tech/metrum) (utility CSS classes) |
| UI Components | Material UI 5 (limited use) |
| Styling | Emotion, CSS Modules, Metrum CSS utilities |
| Blog Scraping | Axios + Cheerio |
| Analytics | [Plausible](https://plausible.io/) |

## Project Structure

```
├── pages/                 # Next.js pages (routing)
│   ├── index.tsx          # Main page — all sections live here
│   ├── _app.tsx           # App wrapper (global CSS import)
│   ├── _document.tsx      # Custom HTML document
│   ├── blog/              # Redirect → blog.allegro.tech
│   ├── podcast/           # Redirect → podcast.allegro.tech
│   ├── events/            # Redirect → meetup.com/allegrotech
│   ├── jobs/              # Redirect → allegro.pl/praca
│   └── [year]/[month]/[slug].tsx  # Redirect legacy blog post URLs
│
├── components/            # Page-specific React components
│   ├── Header.tsx         # Navigation bar with smooth scrolling
│   ├── Footer.tsx         # Footer with social media links
│   ├── Post.tsx           # Blog post card
│   ├── Paper.tsx          # Publication entry
│   ├── Podcast.tsx        # Talk/presentation card
│   ├── Job.tsx            # Job offer entry
│   ├── OpenSource.tsx     # Open-source project card
│   └── Projects.tsx       # Research area card
│
├── metrum/                # Internal Metrum design system wrappers
│   ├── Card.tsx
│   ├── Container.tsx
│   ├── Grid.tsx
│   ├── Heading.tsx
│   ├── Link.tsx
│   ├── List.tsx
│   └── Typography.tsx
│
├── data/                  # Static data files (JSON)
│   ├── publications.json  # Academic publications
│   ├── presentations.json # Conference talks and videos
│   ├── open-source.json   # Open-source projects
│   └── projects.json      # Research team descriptions
│
├── styles/
│   ├── global.css         # Global styles + Google Fonts
│   └── metrum.css         # Allegro Metrum CSS imports
│
├── utils/                 # Utility functions
├── public/                # Static assets (images, PDFs, favicon)
└── publications/          # Supplementary research code (Python)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The development server will start at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

### Static Export

```bash
npm run export
```

Generates a fully static HTML site in the `out/` directory, ready to be deployed to any static hosting.

## Data Management

Content is managed through JSON files in the `data/` directory:

- **`publications.json`** — Add new papers with `authors`, `date`, `paper_url`, `accepted_at`, and `paper_title`
- **`presentations.json`** — Add talks with `title`, `url`, `who`, `description`, and `thumb` (thumbnail image path)
- **`open-source.json`** — Add projects with `name`, `url`, and `description`
- **`projects.json`** — Update research team descriptions with `name`, `icon`, and `description`

Blog posts are automatically scraped from [blog.allegro.tech/tag/mlr](https://blog.allegro.tech/tag/mlr) at build time.

Job offers are fetched from the [SmartRecruiters API](https://api.smartrecruiters.com/) at build time.

## Configuration

| Environment Variable | Description |
|---|---|
| `BASE_PATH` | Base path prefix for deployment (e.g., `/ml`) |

## License

This project is licensed under the Apache License 2.0 — see the [LICENSE](LICENSE) file for details.

