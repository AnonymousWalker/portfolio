// Public images must respect Vite's base path on GitHub Pages project sites.
export function publicAssetUrl(path: string): string {
  if (/^(?:https?:|data:|blob:|\/\/)/i.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
