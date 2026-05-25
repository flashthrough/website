# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page marketing site for **Flashthrough** (flashthrough.ai), an AI-Native Services company. The site is hosted via GitHub Pages — `CNAME` pins the custom domain `flashthrough.ai`, and Cloudflare sits in front (notably providing the email-obfuscation script referenced as `/cdn-cgi/l/email-protection` and `/cdn-cgi/scripts/.../email-decode.min.js`).

There is no build system, no package manager, no framework. Everything ships as-is.

## Structure

- `index.html` — the entire site. All CSS lives in a single `<style>` block in the head; all JS lives in a `<script>` block before `</body>`. Sections are flagged with HTML comments (`<!-- Hero -->`, `<!-- The Shift -->`, etc.).
- `assets/` — favicon set + `logo.png` (used for OG/Twitter card and JSON-LD).
- `CNAME` — `flashthrough.ai` (GitHub Pages custom domain).
- `robots.txt`, `sitemap.xml`, `llms.txt` — SEO/AI-crawler files at root.

## Editing conventions

- **Single source of truth**: when copy or branding changes, it must be updated in *all* of these places to stay consistent: `<title>`, `<meta description>`, OG tags (`og:title`, `og:description`), Twitter tags, JSON-LD `description`, footer copy, and `llms.txt`.
- **Brand wording**: the brand line is "AI-Native Services" (plural). "AI-native services execution" is intentional phrasing — do not "correct" it to "software".
- **Sections use mobile-first CSS** with `@media (min-width: 600px)` (tablet) and `@media (min-width: 900px)` (desktop) breakpoints. The Shift timeline, Ships-vs-Planes grid, Steps grid, Builds grid, and Footer all switch from column to row at 900px.
- **Color tokens** live in `:root` (`--bg`, `--surface`, `--accent: #c8102e`, etc.). Reuse them instead of hardcoding hex values.
- **Email CTA** uses Cloudflare email obfuscation (`/cdn-cgi/l/email-protection#...`). The hash payload is decoded client-side by the `email-decode.min.js` script at the bottom of `<body>`. Do not "fix" this link — it works in production via Cloudflare.

## Local preview

No build step. Open `index.html` directly, or serve with any static server, e.g.:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Deployment

Pushing to the default branch publishes via GitHub Pages on `flashthrough.ai`. No CI, no build artifacts.
