import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly navLinks: Locator;
  readonly searchButton: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navLinks = page.locator('nav a');
    this.searchButton = page.locator('[aria-label*="search" i], [data-testid*="search"], button:has-text("Search")').first();
    this.logo = page.locator('header img, header svg, [aria-label*="Leidos"]').first();
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'commit' });
    await this.page.waitForSelector('header', { state: 'attached', timeout: 30000 });
  }

  async getTitle() {
    return this.page.title();
  }
}
