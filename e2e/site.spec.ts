import { expect, test } from '@playwright/test'

test('home renders the calculator', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'What. The. Chmod.' })
  ).toBeVisible()
  await expect(page.locator('#octal-input')).toHaveValue('755')
  await expect(
    page.getByRole('button', { name: 'Copy chmod command' })
  ).toBeVisible()
})

test('home renders at a phone width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'What. The. Chmod.' })
  ).toBeVisible()
  await expect(page.locator('#octal-input')).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Copy chmod command' })
  ).toBeVisible()
})

test('robots and sitemap are served', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  expect(robots.ok()).toBe(true)
  expect(await robots.text()).toContain('User-agent: *')

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  expect(await sitemap.text()).toContain('https://whatthechmod.vercel.app/')
})
