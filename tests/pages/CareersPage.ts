import { Page, Locator } from '@playwright/test';

export class CareersPage {
  readonly page: Page;
  readonly keywordInput: Locator;
  readonly locationInput: Locator;
  readonly searchButton: Locator;
  readonly jobResults: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.keywordInput = page.locator('input[placeholder*="keyword" i], input[placeholder*="search" i], input[name*="keyword" i], input[id*="keyword" i]').first();
    this.locationInput = page.locator('input[placeholder*="location" i], input[placeholder*="city" i], input[name*="location" i]').first();
    this.searchButton = page.locator('button[type="submit"], button:has-text("Search"), input[type="submit"]').first();
    this.jobResults = page.locator('[class*="job"], [class*="result"], [data-job], article, .card').first();
    this.logo = page.locator('header img, header svg, [aria-label*="Leidos"], a[href="/"] img').first();
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'commit' });
    await this.page.waitForSelector('h1, input, main', { timeout: 30000 });
  }

  async gotoJobSearch() {
    await this.page.goto('/search/jobs', { waitUntil: 'commit' });
    await this.page.waitForSelector('h1, [class*="job"], [class*="result"]', { timeout: 30000 });
  }

  async gotoJobsByCountry(country: string) {
    await this.page.goto(`/search/jobs/in/country/${country}`, { waitUntil: 'commit' });
    await this.page.waitForSelector('h1, [class*="job"]', { timeout: 30000 });
  }

  async searchJobs(keyword: string) {
    await this.keywordInput.fill(keyword);
    await this.searchButton.click();
    await this.page.waitForLoadState('commit');
    await this.page.waitForSelector('[class*="job"], [class*="result"], h2', { timeout: 15000 });
  }
}
