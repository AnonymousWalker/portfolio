import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('hero fills large viewports and keeps its content accessible on short screens', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Viewport sizes are exercised in the desktop browser project.')
  for (const viewport of [{ width: 1920, height: 1080 }, { width: 2560, height: 1440 }, { width: 390, height: 844 }, { width: 320, height: 600 }]) {
    await page.setViewportSize(viewport)
    await page.goto('./')
    const bounds = await page.evaluate(() => ({
      hero: document.querySelector('#home')!.getBoundingClientRect().toJSON(),
      avatar: document.querySelector('.avatar')!.getBoundingClientRect().toJSON(),
      about: document.querySelector('#about')!.getBoundingClientRect().toJSON(),
      arrow: document.querySelector('.scroll-down')!.getBoundingClientRect().toJSON(),
      socials: document.querySelector('.hero-socials')!.getBoundingClientRect().toJSON(),
    }))
    expect(bounds.about.top).toBeGreaterThanOrEqual(viewport.height)
    expect(bounds.arrow.top).toBeGreaterThan(bounds.socials.bottom)
    expect(bounds.arrow.bottom).toBeLessThanOrEqual(bounds.hero.bottom)
    const spaceAbove = bounds.avatar.top - bounds.hero.top
    const spaceBelow = bounds.hero.bottom - bounds.arrow.bottom
    expect(Math.abs(spaceAbove - spaceBelow)).toBeLessThan(1)
    if (viewport.width >= 1920) {
      expect(bounds.hero.bottom).toBe(viewport.height)
      await expect(page.getByRole('link', { name: 'Scroll to about' })).toBeInViewport()
    }
  }
})

test('renders the selected projects, real links, and responsive sections', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  const failedRequests: string[] = []
  page.on('response', response => { if (response.status() >= 400) failedRequests.push(response.url()) })
  await page.goto('./')
  await expect(page).toHaveTitle('Tony Tran — Full-Stack Software Engineer')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hi, I’m Tony Tran.')
  for (const id of ['about', 'experience', 'projects', 'skills', 'education', 'contact']) await expect(page.locator(`#${id}`)).toBeAttached()
  const cards = page.locator('.project-card')
  await expect(cards).toHaveCount(3)
  await expect(page.getByRole('img', { name: 'Portrait of Tony Tran', exact: true })).toBeVisible()
  await expect(cards.getByRole('img')).toHaveCount(5)
  for (const image of await page.locator('.avatar img, .project-image img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toBeVisible()
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true)
  }
  await expect(page.locator('.image-placeholder')).toHaveCount(0)
  for (const name of ['AI Document Translation', 'BIEL Mobile App', 'ATS System']) await expect(cards.getByRole('heading', { name, exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'BIEL Mobile App on GitHub' })).toHaveAttribute('href', 'https://github.com/Bible-Translation-Tools/BIEL-mobile-app')
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Contact by email' })).toBeVisible()
  await expect(page.locator('.experience-row')).toHaveCount(3)
  await expect(page.locator('.education-card')).toHaveCount(2)
  await expect(page.locator('a[download]')).toHaveCount(0)
  await expect(page.getByText('Résumé coming soon')).toHaveCount(0)
  await page.evaluate(() => document.fonts.ready)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  expect(errors).toEqual([])
  expect(failedRequests).toEqual([])
})

test('theme follows preference and persists after reload', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('./')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('case studies open, trap focus, close with Escape, and restore focus', async ({ page }) => {
  await page.goto('./')
  for (const title of ['AI Document Translation', 'BIEL Mobile App', 'ATS System']) {
    const trigger = page.getByRole('button', { name: `Read ${title} case study` })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(title)
    await expect(dialog.getByRole('heading', { name: 'My role', exact: true })).toBeVisible()
    await expect(dialog.getByRole('link', { name: 'Explore repository' })).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Close case study' })).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
  }
})

test('project images open in an accessible gallery viewer', async ({ page }) => {
  await page.goto('./')
  const trigger = page.getByRole('button', { name: 'View AI Document Translation translation workspace in image viewer' }).first()
  await trigger.click()

  const viewer = page.getByRole('dialog', { name: 'AI Document Translation' })
  await expect(viewer).toBeVisible()
  await expect(viewer.getByRole('img')).toHaveAttribute('alt', /Document Translation Tool/)
  await expect(viewer.getByText('1 / 2')).toBeVisible()
  await expect(viewer.getByRole('button', { name: 'Close image viewer' })).toBeFocused()

  await page.keyboard.press('ArrowRight')
  await expect(viewer.getByText('App icon')).toBeVisible()
  await expect(viewer.getByText('2 / 2')).toBeVisible()
  await viewer.getByRole('button', { name: 'View image at full size' }).click()
  await expect(viewer.locator('.viewer-image')).toHaveClass(/zoomed/)

  await page.keyboard.press('Escape')
  await expect(viewer).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await expect(page).toHaveURL(/\/$/)

  await page.getByRole('button', { name: 'Read AI Document Translation case study' }).click()
  const caseStudy = page.getByRole('dialog', { name: 'AI Document Translation' })
  const caseImage = caseStudy.getByRole('button', { name: 'View AI Document Translation translation workspace in image viewer' })
  await caseImage.click()
  const nestedViewer = page.locator('.image-viewer')
  await expect(nestedViewer).toBeVisible()
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(accessibility.violations).toEqual([])
  await page.keyboard.press('Escape')
  await expect(nestedViewer).toHaveCount(0)
  await expect(caseStudy).toBeVisible()
  await expect(caseImage).toBeFocused()
})

test('navigation works and mobile menu closes after selecting a section', async ({ page, isMobile }) => {
  await page.goto('./')
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Skills' }).click()
  await expect(page).toHaveURL(/#skills$/)
  await expect(page.locator('#skills')).toBeInViewport()
  if (isMobile) {
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('navigation').getByRole('link', { name: 'About' }).focus()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
  }
})

test('accessibility checks pass in both themes and in the case-study dialog', async ({ page }) => {
  await page.goto('./')
  for (const theme of ['light', 'dark']) {
    await page.evaluate(theme => { document.documentElement.dataset.theme = theme }, theme)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(results.violations).toEqual([])
  }
  await page.getByRole('button', { name: 'Read BIEL Mobile App case study' }).click()
  const dialogResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(dialogResults.violations).toEqual([])
})

test('layout fits a narrow phone and tablet, with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('./')
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  }
})


test('email requires two deliberate steps, supports cancel and keyboard, and resets on reload', async ({ page }) => {
  const address = 'hoanganhtran1998@gmail.com'
  await page.goto('./')
  await expect(page.locator('body')).not.toContainText(address)
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
  await page.getByRole('button', { name: 'Contact by email' }).click()
  await expect(page.getByRole('button', { name: 'Show email address' })).toBeFocused()
  await expect(page.locator('body')).not.toContainText(address)
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
  const confirmationAudit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(confirmationAudit.violations).toEqual([])
  await page.getByRole('button', { name: 'Cancel', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Contact by email' })).toBeFocused()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Contact by email' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: 'Show email address' })).toBeFocused()
  await page.keyboard.press('Enter')
  const email = page.getByRole('link', { name: 'Email Tony Tran', exact: true })
  await expect(email).toHaveText(address)
  await expect(email).toHaveAttribute('href', `mailto:${address}`)
  await expect(email).toBeFocused()
  const revealedAudit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(revealedAudit.violations).toEqual([])
  await page.reload()
  await expect(page.locator('body')).not.toContainText(address)
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
})
