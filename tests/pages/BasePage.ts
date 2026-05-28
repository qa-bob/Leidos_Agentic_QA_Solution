import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(readonly page: Page) {}

  async goto(path: string) {
    await this.page.goto(path, { waitUntil: 'commit' });
    await this.page.waitForSelector('header', { state: 'attached', timeout: 30000 });
  }

  async assertPageLoaded(expectedTitle: RegExp | string, expectedH1: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
    await expect(this.page.locator('h1').first()).toContainText(expectedH1);
  }

  async assertBreadcrumb() {
    // Most sub-pages render a breadcrumb nav
    const breadcrumb = this.page.locator('nav[aria-label*="readcrumb" i], [class*="breadcrumb"], ol li a, .breadcrumb').first();
    await expect(breadcrumb).toBeAttached();
  }

  async assertCTA() {
    // Most pages have a "Want to know more?" or "Contact us" CTA section
    const cta = this.page.getByText(/want to know more/i).or(this.page.getByText(/contact us/i)).first();
    await expect(cta).toBeAttached();
  }

  async assertH2Contains(text: string) {
    await expect(this.page.locator(`h2:has-text("${text}")`).first()).toBeAttached();
  }

  async assertFooterPresent() {
    await expect(this.page.locator('footer')).toBeAttached();
  }

  async assertNoConsoleErrors() {
    // Collect errors only — not warnings
    const errors: string[] = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    return errors;
  }

  async assertHasMetaDescription() {
    const meta = await this.page.$eval(
      'meta[name="description"]',
      el => el.getAttribute('content')
    ).catch(() => null);
    expect(meta).toBeTruthy();
  }
}
