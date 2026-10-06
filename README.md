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

The public bio, contact email, employment history, education, and AI translation project role reflect details supplied by Tony, who also confirmed end-to-end ownership of BIEL Mobile App. The résumé document itself is not stored in the repository. The site has no résumé download feature.

The contact section requires two deliberate actions: “Contact by email”, then “Show email address”. The address and `mailto:` link are created only after confirmation and hidden again on reload. Cancel and Escape return to the initial state. `profile.emailEncoded` stores the address as Base64; this is obfuscation against simple scrapers, not encryption, human verification, or secure access control. A determined scraper can decode the client-side data. To change the address, Base64-encode the new address and update that field; set it to `null` to omit email contact. Update employment, education, and position-specific technologies in the profile data as needed.

### Avatar and project photos

Place your image files under `public/images/` (create the directory when adding files).

- Set `profile.avatar.src` to a path such as `'/images/tony.jpg'`. Update `profile.avatar.alt` if needed. The portrait is cropped to a circle.
- In `src/data/projects.ts`, set each project image’s `src` to a local path such as `'/images/biel-overview.webp'`, and write descriptive `alt` text. Each project includes two image entries. Remove the second entry if you prefer one photo.
- `null` sources render clearly labeled placeholders, without broken image requests. Real project images are lazy-loaded, and the layout reserves their space.
- Image URLs are relative to `public/`; do not include `public` in the URL. Prefer compressed WebP or JPEG assets. Project images preserve their original proportions; the avatar is cropped to a circle.

Project descriptions were checked against the source commits recorded in the project data. Project roles are attributed only where confirmed; remaining repository features are described neutrally. Source-project tests were inspected, not executed. The supplied portrait and project assets are connected to the avatar and project galleries. Screenshots retain their full proportions and can be opened at full size. ATS uses one score preview; the other projects each use two images. Case-study architecture diagrams remain conceptual.

The original website brief is preserved in `docs/original-brief.md`. The current implementation follows the later request for a single-page site and the updated project selection.

## Deploy

### GitHub Pages (configured)

The workflow in `.github/workflows/deploy-pages.yml` builds with Node.js 24 and publishes `dist/` after each push to `main`. It can also be run manually from the Actions tab. No third-party hosting account or repository secrets are required; deployment uses GitHub's built-in workflow token.

One-time setup in GitHub:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Open **Actions → Deploy portfolio to GitHub Pages** and select **Run workflow** on `main`, or rerun the workflow created by the latest push.
4. Wait for both build and deploy jobs to succeed.

The expected site URL is `https://anonymouswalker.github.io/portfolio/`. The workflow requires GitHub Pages to be enabled for the repository; GitHub Free supports Pages for public repositories. If an earlier deployment failed before Pages was enabled, rerun it after selecting the source.

The workflow sets `VITE_BASE_PATH` to the repository path. Image sources, full-size image links, the favicon, and compiled assets respect that path. Regular development and other hosts default to `/`.

To check the Pages build locally:

```sh
VITE_BASE_PATH=/portfolio/ npm run build
PLAYWRIGHT_BASE_PATH=/portfolio/ npm run test:e2e
```

### Other hosts

For Vercel: import the repository, select Vite, use `npm run build` and `dist` as the output directory.

For Netlify: import the repository, use `npm run build` and `dist` as the publish directory. A `netlify.toml` supplies those settings.

The page uses section anchors and native dialogs, so no SPA route rewrites are needed. Deploy from the repository root.

Social metadata points to the GitHub Pages URL. Update it if using a different domain. Some social platforms do not support SVG previews; export `public/social-card.svg` to a PNG and reference that URL for broad compatibility.
