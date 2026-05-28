import { test, expect } from '@playwright/test';
import { BasePage } from './pages/BasePage';

// These pages live on www.leidos.com/careers/* (NOT careers.leidos.com)
// and do NOT require Cloudflare bypass.

test.describe('Careers: Life at Leidos', () => {
  test('should load with correct title and heading', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/life');
    await bp.assertPageLoaded(/Life at Leidos \| Leidos/, 'Life at Leidos');
  });

  test('should mention recognition or employee difference', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/life');
    await expect(page.locator('text=/recogni|employee|difference/i').first()).toBeAttached();
  });

  test('should have a CTA section', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/life');
    await bp.assertCTA();
  });

  test('should have a footer', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/life');
    await bp.assertFooterPresent();
  });
});

test.describe('Careers: Pay & Benefits', () => {
  test('should load with correct title and heading', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/pay-benefits');
    await bp.assertPageLoaded(/Pay & Benefits \| Leidos/, 'Pay & Benefits');
  });

  test('should display Compensation section', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/pay-benefits');
    await bp.assertH2Contains('Compensation');
  });

  test('should display Health section', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/pay-benefits');
    await bp.assertH2Contains('Health');
  });

  test('should have a footer', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/pay-benefits');
    await bp.assertFooterPresent();
  });
});

test.describe('Careers: FAQs', () => {
  test('should load with correct title and heading', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/faqs');
    await bp.assertPageLoaded(/Frequently Asked Career Questions \| Leidos/, 'Frequently Asked Career Questions');
  });

  test('should display job application FAQ section', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/faqs');
    await bp.assertH2Contains('Applying for a position');
  });

  test('should display job search FAQ section', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/faqs');
    await bp.assertH2Contains('Searching job openings');
  });

  test('should display hiring process FAQ section', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/faqs');
    await bp.assertH2Contains('Getting status on the hiring process');
  });

  test('FAQ items should be expandable (accordion)', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/faqs');
    const accordion = page.locator('[class*="accordion"], details, [role="button"][aria-expanded], button[aria-controls]').first();
    await expect(accordion).toBeAttached();
  });

  test('should have a footer', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/careers/faqs');
    await bp.assertFooterPresent();
  });
});
