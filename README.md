# ykapps.ist — YK Apps website

The public website for YK Apps Yazılım Bilgi İşlem Sanayi ve Ticaret Ltd. Şti.

**Live at:** https://www.ykapps.ist

## What this is

A plain static website — hand-written HTML and CSS. There is **no build step**, no
framework, no npm install, no dependencies. Open a `.html` file in a browser and it works.

| File | Page |
|---|---|
| `index.html` | Home — https://www.ykapps.ist/ |
| `support.html` | Support — /support |
| `privacy.html` | Privacy Policy — /privacy |
| `terms.html` | Terms of Service — /terms |
| `refunds.html` | Refund & Cancellation Policy — /refunds |
| `404.html` | Shown for any unknown URL |
| `styles.css` | All styling for every page |
| `logo.jpg` | Logo / favicon |

Supporting files:

- `vercel.json` — hosting config: security headers (CSP, X-Frame-Options, etc.),
  caching rules, and `cleanUrls` (which is why pages are served at `/privacy`,
  not `/privacy.html`).
- `robots.txt`, `sitemap.xml` — search engine instructions.
- `fonts/` — **not currently used by the live site.** These are Google Fonts
  downloaded for possible self-hosting later. The live pages still load fonts from
  Google's CDN. Leave them alone unless deliberately switching to self-hosted fonts.

## How to edit

1. Edit the `.html` or `.css` file you want to change.
2. Preview locally — from this folder run:
   ```
   python3 -m http.server 4173
   ```
   then open http://localhost:4173
3. Commit and push to `main`.
4. Vercel builds and publishes automatically, usually within a minute.

### Things to keep consistent

- The header and footer are **copy-pasted into every page** (there are no templates).
  If you change a footer link, change it in all 6 HTML files.
- Every page's `<head>` has its own `canonical` and `og:` tags pointing at that page's
  URL — update them if you rename or add a page.
- Adding a new page? Also add it to `sitemap.xml` and to the footer links.
- The legal text in `privacy.html`, `terms.html`, and `refunds.html` was written and
  approved by the company. **Do not rewrite or "improve" that wording** — only the
  company decides changes there.

## Hosting

- **Host:** Vercel, project `project-3af8l` (account: Yamac's projects)
- **Domain:** ykapps.ist, registered at GoDaddy. DNS points at Vercel:
  `A @ → 216.198.79.1` and a `CNAME` for `www`.
- `www.ykapps.ist` is the primary address; the bare `ykapps.ist` redirects to it.

## Contact

- support@ykapps.ist — app support
- hello@ykapps.ist — general and legal
