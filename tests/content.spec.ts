import { test, expect } from '@playwright/test';
import { BasePage } from './pages/BasePage';

test.describe('Insights page', () => {
  test('should load with correct title and heading', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/insights');
    await bp.assertPageLoaded(/Insights \| Leidos/, 'Insights');
  });

  test('should display insight articles or cards', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/insights');
    // Articles/cards are typically in a grid or list
    const articles = page.locator('article, [class*="card"], [class*="insight"], h3 a').first();
    await expect(articles).toBeAttached();
  });

  test('should have a footer', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/insights');
    await bp.assertFooterPresent();
  });
});

test.describe('Newsroom page', () => {
  test('should load with correct title and heading', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/newsroom');
    await bp.assertPageLoaded(/Newsroom \| Leidos/, 'Newsroom');
  });

  test('should display news releases section', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/newsroom');
    await bp.assertH2Contains('News Releases');
  });

  test('should display media contacts section', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/newsroom');
    await expect(page.locator('text=/media contact/i').first()).toBeAttached();
  });

  test('should display Leidos in the News section', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/newsroom');
    await bp.assertH2Contains('Leidos in the News');
  });

  test('should have a footer', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/newsroom');
    await bp.assertFooterPresent();
  });
});

// Spot-check an individual insight article
test.describe('Individual Insight article', () => {
  test('should load an insight article page', async ({ page }) => {
    const bp = new BasePage(page);
    // Find the first article link from the insights listing
    await bp.goto('/insights');
    const firstArticleLink = page.locator('a[href*="/insights/"]').first();
    await expect(firstArticleLink).toBeAttached();
    const href = await firstArticleLink.getAttribute('href');
    await bp.goto(href!);
    await expect(page).toHaveTitle(/.+Leidos/);
    await expect(page.locator('h1').first()).toBeAttached();
  });

  test('insight article should have an author', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/insights');
    const firstArticleLink = page.locator('a[href*="/insights/"]').first();
    const href = await firstArticleLink.getAttribute('href');
    await bp.goto(href!);
    // Author is in an <h5 class="author"> or .field--name-field-insight-author
    const author = page.locator('.author, [class*="insight-author"], [class*="field-author"]').first();
    await expect(author).toBeAttached();
  });
});
