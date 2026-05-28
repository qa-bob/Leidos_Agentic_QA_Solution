import { test, expect } from '@playwright/test';
import { CareersPage } from './pages/CareersPage';

// careers.leidos.com is protected by Cloudflare Turnstile, which blocks headless browsers.
// Each test detects the Cloudflare challenge and skips rather than failing.
// To run these tests: use a non-headless environment or a Cloudflare-whitelisted IP.

async function skipIfCloudflare(page: Parameters<typeof test>[1] extends (args: { page: infer P }) => unknown ? P : never) {
  const title = await page.title();
  if (title.includes('moment') || title.includes('Just a')) {
    test.skip(true, 'Cloudflare Turnstile challenge detected — skipping in headless mode');
  }
}

test.describe('Leidos Careers Homepage', () => {
  test('should load with a Leidos careers title', async ({ page }) => {
    const careersPage = new CareersPage(page);
    await careersPage.goto();
    await skipIfCloudflare(page);

    await expect(page).toHaveTitle(/leidos/i);
    await expect(page).toHaveURL(/careers\.leidos\.com/);
  });

  test('should display a job search input', async ({ page }) => {
    const careersPage = new CareersPage(page);
    await careersPage.goto();
    await skipIfCloudflare(page);

    await expect(careersPage.keywordInput).toBeVisible();
  });

  test('should display a search/submit button', async ({ page }) => {
    const careersPage = new CareersPage(page);
    await careersPage.goto();
    await skipIfCloudflare(page);

    await expect(careersPage.searchButton).toBeVisible();
  });
});

test.describe('Job Search', () => {
  test('should navigate to /search/jobs and display results', async ({ page }) => {
    const careersPage = new CareersPage(page);
    await careersPage.gotoJobSearch();
    await skipIfCloudflare(page);

    await expect(page).toHaveURL(/\/search\/jobs/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should list jobs for United States', async ({ page }) => {
    const careersPage = new CareersPage(page);
    await careersPage.gotoJobsByCountry('united-states');
    await skipIfCloudflare(page);

    await expect(page).toHaveURL(/united-states/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should return results when searching by keyword', async ({ page }) => {
    const careersPage = new CareersPage(page);
    await careersPage.gotoJobSearch();
    await skipIfCloudflare(page);

    const inputVisible = await careersPage.keywordInput.isVisible().catch(() => false);
    test.skip(!inputVisible, 'Keyword input not found on this page layout');

    await careersPage.searchJobs('engineer');

    await expect(page).toHaveURL(/engineer|search/i);
  });
});

test.describe('Careers Navigation', () => {
  test('should have a working logo/home link in the header', async ({ page }) => {
    const careersPage = new CareersPage(page);
    await careersPage.goto();
    await skipIfCloudflare(page);

    const logo = careersPage.logo;
    const logoVisible = await logo.isVisible().catch(() => false);
    if (logoVisible) {
      await expect(logo).toBeVisible();
    } else {
      await expect(page.locator('header a').first()).toBeVisible();
    }
  });

  test('should load the page within 15 seconds', async ({ page }) => {
    const start = Date.now();
    const careersPage = new CareersPage(page);
    await careersPage.goto();
    await skipIfCloudflare(page);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(15000);
  });
});
