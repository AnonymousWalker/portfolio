# Tony Tran — Portfolio

A responsive single-page engineering portfolio built with React, TypeScript, Vite, Tailwind CSS, and Lucide icons. Uses an Apple-inspired visual hierarchy with generous spacing, system typography, a translucent navigation bar, a portrait, and project image galleries. Includes light/dark themes, mobile navigation, and accessible case-study dialogs for AI Draft Translation, BIEL Mobile App, and ATS System.

## Develop

Requires Node.js 22.12+ (or 24+) and npm.

```sh
npm ci
npm run dev
```

The development server defaults to port 5173. No backend, API keys, or environment variables are required. Typography uses the device’s system font stack; no web fonts or third-party font services are loaded.

In a cloud environment where the default npm cache is not writable, use `npm ci --cache /tmp/portfolio-npm-cache`.

## Build and preview

```sh
npm run build
npm run preview
```

The build runs the TypeScript check before producing a static `dist/` directory.

## Browser checks

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

If system Chromium exists at `/usr/bin/chromium`, tests use it automatically; the download is unnecessary. For another system path, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. On Linux, Playwright browser dependencies may need `npx playwright install --with-deps chromium`.

Tests exercise desktop and mobile layouts, theme persistence, navigation, case-study keyboard behavior and focus restoration, missing-link handling, reduced motion, and automated WCAG A/AA checks with axe. Automated checks do not replace manual accessibility review.

## Update content

- `src/data/profile.ts`: name, introduction, contact URLs, professional experience, and grouped skills.
- `src/data/projects.ts`: project descriptions, stacks, roles, architectures, case-study sections, and source references.
- `src/styles.css`: theme colors, typography, and responsive layout.
- `public/`: favicon, social card, avatar, and project images.

### Details to add later

The public bio, contact email, employment history, education, and AI translation project role reflect details supplied by Tony. The résumé document itself is not stored in the repository. BIEL contribution details remain unconfirmed. The site has no résumé download feature.

Set `profile.email` to enable email links. Update employment, education, and position-specific technologies in the profile data as needed.

### Avatar and project photos

Place your image files under `public/images/` (create the directory when adding files).

- Set `profile.avatar.src` to a path such as `'/images/tony.jpg'`. Update `profile.avatar.alt` if needed. The portrait is cropped to a circle.
- In `src/data/projects.ts`, set each project image’s `src` to a local path such as `'/images/biel-overview.webp'`, and write descriptive `alt` text. Each project includes two image entries. Remove the second entry if you prefer one photo.
- `null` sources render clearly labeled placeholders, without broken image requests. Real project images are lazy-loaded, and the layout reserves their space.
- Image URLs are relative to `public/`; do not include `public` in the URL. Prefer compressed WebP or JPEG assets. Project images preserve their original proportions; the avatar is cropped to a circle.

Project descriptions were checked against the source commits recorded in the project data. Project roles are attributed only where confirmed; remaining repository features are described neutrally. Source-project tests were inspected, not executed. The supplied portrait and project assets are connected to the avatar and project galleries. Screenshots retain their full proportions and can be opened at full size. ATS uses one score preview; the other projects each use two images. Case-study architecture diagrams remain conceptual.

The original website brief is preserved in `docs/original-brief.md`. The current implementation follows the later request for a single-page site and the updated project selection.

## Deploy

For Vercel: import the repository, select Vite, use `npm run build` and `dist` as the output directory.

For Netlify: import the repository, use `npm run build` and `dist` as the publish directory. A `netlify.toml` supplies those settings.

The page uses section anchors and native dialogs, so no SPA route rewrites are needed. Deploy from the repository root. Deployment is not performed by development or build commands.

Before sharing the site, replace placeholder personal information. At your final HTTPS domain, update social metadata in `index.html` with an absolute `og:url` and absolute image URL. Some social platforms do not support SVG previews; export `public/social-card.svg` to a PNG and reference that URL for broad compatibility.
