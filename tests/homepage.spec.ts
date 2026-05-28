import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Leidos Homepage', () => {
  test('should load and display the homepage', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(page).toHaveTitle(/Leidos/i);
    await expect(page).toHaveURL(/leidos\.com/);
  });

  test('should have navigation links', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    const navLinks = page.locator('nav a:visible').first();
    await expect(navLinks).toBeVisible();
  });

  test('should have a visible logo', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(homePage.logo).toBeVisible();
  });

  test('should respond within acceptable time', async ({ page }) => {
    const start = Date.now();
    await page.goto('/', { waitUntil: 'commit' });
    await page.waitForSelector('header', { state: 'attached', timeout: 30000 });
    const loadTime = Date.now() - start;

    expect(loadTime).toBeLessThan(10000);
  });
});
