[English](README.md) | [中文](README.zh.md)

# AI Toolkit Guide

Source for [ejuerz.com](https://ejuerz.com/) — practical guides and honest comparisons for the best AI tools, written for real people, not developers.

Forked from [satnaing/astro-paper](https://github.com/satnaing/astro-paper) (AstroPaper v6) and trimmed down for one purpose: ship clean, minimal English content about AI agent skills, CLI tools, and workflows.

## ✨ What's Inside

- **3 English articles** (and counting) on AI agent skills, CLI basics, and multi-agent workflows
- **Dynamic OG images** generated per post (Satori + Sharp)
- **Static search** powered by Pagefind
- **Dark/light mode** with smooth transitions
- **AdSense-integrated** (only on English posts — the student sharing platform under `/forbtbuer/` runs ad-free)
- **i18n ready** (configured `en` only)

## 🛠 Tech Stack

| Layer       | Tool                                                   |
| ----------- | ------------------------------------------------------ |
| Framework   | [Astro 6](https://astro.build/)                        |
| Styling     | [Tailwind CSS 4](https://tailwindcss.com/)             |
| Type check  | TypeScript 6                                           |
| Code block  | Shiki (min-light / night-owl)                          |
| Search      | [Pagefind](https://pagefind.app/)                      |
| OG images   | [Satori](https://github.com/vercel/satori) + Sharp     |
| CI/CD       | GitHub Actions                                         |
| Hosting     | Cloudflare Pages                                       |
| Monetize    | Google AdSense (pub-7420993311388251)                  |

## 📁 Project Structure

```
/
├── src/
│   ├── content/posts/      # English blog articles (the publishable content)
│   ├── layouts/            # Layout.astro, PostLayout.astro
│   ├── components/         # Card, Header, Footer, Tag, etc.
│   ├── pages/              # /, /posts, /tags, /search, /trending, /about
│   ├── i18n/               # en translation strings
│   ├── utils/              # postFilter, getSortedPosts, withBase, ...
│   ├── config.ts           # resolved config (don't edit directly)
│   └── content.config.ts   # collections: posts, btbuer, pages
├── astro-paper.config.ts   # user-editable site config
├── astro.config.ts         # Astro + integrations
├── public/                 # static assets, ads.txt, favicon
└── .github/workflows/      # deploy.yml, ci.yml
```

All published articles live in `src/content/posts/`. Drop a new `*.md` file in there and it appears on the site after the next build.

## 🧞 Running Locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check, build, run pagefind, copy index to public/
npm run preview    # preview the production build
```

Requires Node ≥ 22.12.

## ✍️ Writing a New Post

Create `src/content/posts/your-slug.md`:

```markdown
---
title: "Your Title"
description: "One-line summary that shows in cards and OG."
pubDatetime: 2026-06-04
tags: ["ai-tools", "cli"]
featured: false
draft: false
---

## The Hook

First sentence states the problem.

## What It Does

Direct explanation — no stories, no padding.

## How to Use

The actual steps, copy-pasteable.
```

The slug (filename) becomes the URL. Subdirectories work too — they get prepended to the path.

## 🚀 Deployment

Push to `main` → GitHub Action runs `npm run build` → Cloudflare Pages deploys `dist/`.

Secrets required in repo settings:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CF_PAGES_PROJECT_NAME`

## 📜 License

MIT — based on [satnaing/astro-paper](https://github.com/satnaing/astro-paper) (MIT).

## 📬 Contact

- Site: [ejuerz.com](https://ejuerz.com/)
- X: [@ejuerz](https://x.com/ejuerz)
- Email: ejuer_z@163.com
