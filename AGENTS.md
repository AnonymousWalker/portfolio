# Portfolio rules

These rules apply to the whole repository. Follow the user's latest instructions when they change the design or content requirements.

## Apple-inspired design

Maintain the Apple-inspired visual direction requested by the user. Design reference: [What Apple Teaches Us About Web and Product Design](https://blog.snappymob.com/what-apple-teaches-us-about-web-and-product-design).

The reference was inaccessible during implementation because of network restrictions. The following rules record the agreed design direction; they are not quotations or a summary of the unread article. Consult the reference when accessible, while preserving the user's requirements.

- Prioritize clarity, simplicity, and a strong visual hierarchy. Give each section a clear purpose and remove unnecessary decoration.
- Use crisp system typography, generous whitespace, readable body text, and restrained heading styles. Keep the hero summary focused on experience and value; show technologies in a separate compact Tech stack section.
- Use neutral white, gray, and black surfaces with a restrained blue accent. Use the existing theme variables in `src/styles.css` for consistent light and dark themes.
- Keep navigation compact and intuitive. Preserve the translucent sticky header, clear primary actions, and responsive mobile menu.
- Use consistent rounded surfaces and subtle depth. Keep motion short and purposeful, and respect reduced-motion preferences.
- Preserve semantic HTML, keyboard access, visible focus indicators, adequate contrast, and accessible dialog focus behavior. Keep touch controls comfortably sized.
- Use the supplied avatar and project images in their corresponding sections. Preserve full screenshot proportions, reserve image space to prevent layout shifts, and provide descriptive alternative text. Project images should remain accessible at full size.
- Support one or two images per project. If an asset is unavailable, show an explicitly labeled placeholder rather than a broken image or invented screenshot.
- Keep the experience, projects, skills, education, and contact sections responsive across phones, tablets, and desktops. Check both themes after visual changes.

## Content and assets

- Preserve the two-step email reveal: never render the address or a `mailto:` link before confirmation. Keep the address obfuscated in the client data, and do not describe this as secure encryption or bot verification.
- Keep public profile and project content in `src/data/profile.ts` and `src/data/projects.ts`.
- Do not save the user's résumé document or its full verbatim text in the repository. Curated public portfolio details supplied by the user may be reflected in the content data. The user removed the résumé feature; do not add résumé links, coming-soon notices, download configuration, or placeholder PDFs unless explicitly requested.
- Preserve the user's selected projects: AI Draft Translation, BIEL Mobile App, and ATS System, unless asked to change them.
- Attribute personal contributions only when confirmed by the user. Distinguish inspected repository features from the user's own work. Do not invent employment details, performance metrics, or project outcomes.

## Deployment

GitHub Pages deployment is configured in `.github/workflows/deploy-pages.yml`. Keep public image paths compatible with Vite's `BASE_URL` through `src/lib/assets.ts`. The workflow builds with `VITE_BASE_PATH=/portfolio/`; root hosting remains the default. Validate deployment changes with a build and browser checks at `/portfolio/`.

## Validation

Run `npm run build` after application changes. For changes affecting layout, navigation, themes, images, or dialogs, run the relevant existing browser checks with `npm run test:e2e`. Investigate failures and preserve meaningful assertions. No application checks are needed for documentation-only changes.

## Show the result

Always show a full-page screenshot when reporting UI changes. Capture the current rendered page at native resolution with all images loaded, using `fullPage: true`, and return it through the image viewer so the user can open it, zoom, and scroll through the entire page. Also provide a clickable link to the original screenshot file. Do not substitute a viewport-only capture, cropped section, or resized thumbnail for the full-page screenshot. Include a separate full-page mobile screenshot when the change affects responsive layout. Do not present an older screenshot as the current state.
