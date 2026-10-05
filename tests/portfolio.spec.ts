import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('renders the selected projects, real links, and responsive sections', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  const failedRequests: string[] = []
  page.on('response', response => { if (response.status() >= 400) failedRequests.push(response.url()) })
  await page.goto('/')
  await expect(page).toHaveTitle('Tony Tran — Full-Stack Software Engineer')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Reliable software.')
  for (const id of ['about', 'experience', 'projects', 'skills', 'contact']) await expect(page.locator(`#${id}`)).toBeAttached()
  const cards = page.locator('.project-card')
  await expect(cards).toHaveCount(3)
  await expect(page.getByRole('img', { name: 'Avatar photo placeholder for Tony Tran', exact: true })).toBeVisible()
  for (const card of await cards.all()) await expect(card.getByRole('img')).toHaveCount(2)
  for (const name of ['AI Draft Translation', 'BIEL Mobile App', 'ATS System']) await expect(cards.getByRole('heading', { name, exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'BIEL Mobile App on GitHub' })).toHaveAttribute('href', 'https://github.com/Bible-Translation-Tools/BIEL-mobile-app')
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
  await expect(page.locator('a[download]')).toHaveCount(0)
  await expect(page.getByText('Résumé coming soon').first()).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  expect(errors).toEqual([])
  expect(failedRequests).toEqual([])
})

test('theme follows preference and persists after reload', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
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
  await page.goto('/')
  for (const title of ['AI Draft Translation', 'BIEL Mobile App', 'ATS System']) {
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

test('navigation works and mobile menu closes after selecting a section', async ({ page, isMobile }) => {
  await page.goto('/')
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
  await page.goto('/')
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
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  }
})
