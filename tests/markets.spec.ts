import { test, expect } from '@playwright/test';
import { BasePage } from './pages/BasePage';

const MARKETS = [
  {
    path: '/markets',
    title: /Markets \| Leidos/,
    h1: 'Markets',
    h2: 'Where mission demands meet real-world impact',
    hasBreadcrumb: false,
  },
  {
    path: '/markets/defense',
    title: /Defense \| Leidos/,
    h1: 'Defense',
    h2: 'Where warfighter advantage gets real',
    hasBreadcrumb: true,
  },
  {
    path: '/markets/health',
    title: /Health \| Leidos/,
    h1: 'Health',
    h2: 'Advancing our nation',
    hasBreadcrumb: true,
  },
  {
    path: '/markets/aviation',
    title: /Airports & Air Traffic \| Leidos/,
    h1: 'Airports & Air Traffic',
    h2: 'Delivering systems for modern air travel',
    hasBreadcrumb: true,
  },
  {
    path: '/markets/government',
    title: /Federal Government \| Leidos/,
    h1: 'Federal Government',
    h2: 'The mission moves fast',
    hasBreadcrumb: true,
  },
  {
    path: '/markets/intelligence',
    title: /Intelligence \| Leidos/,
    h1: 'Intelligence',
    h2: 'Fusing tradecraft',
    hasBreadcrumb: true,
  },
  {
    path: '/markets/space',
    title: /Space \| Leidos/,
    h1: 'Space',
    h2: 'Space capabilities designed',
    hasBreadcrumb: true,
  },
  {
    path: '/markets/energy',
    title: /Energy & Infrastructure \| Leidos/,
    h1: 'Energy & Infrastructure',
    h2: 'Powering reliable',
    hasBreadcrumb: true,
  },
  {
    path: '/markets/homeland',
    title: /Homeland \| Leidos/,
    h1: 'Homeland',
    h2: 'Modern infrastructure',
    hasBreadcrumb: true,
  },
  {
    path: '/markets/maritime',
    title: /Maritime \| Leidos/,
    h1: 'Maritime',
    h2: 'Delivering integrated maritime',
    hasBreadcrumb: true,
  },
];

for (const market of MARKETS) {
  test.describe(`Markets: ${market.h1}`, () => {
    test(`should load ${market.path} with correct title and heading`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.goto(market.path);
      await bp.assertPageLoaded(market.title, market.h1);
    });

    test(`${market.path} should have a key section heading`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.goto(market.path);
      await bp.assertH2Contains(market.h2);
    });

    test(`${market.path} should have a CTA section`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.goto(market.path);
      await bp.assertCTA();
    });

    test(`${market.path} should have a footer`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.goto(market.path);
      await bp.assertFooterPresent();
    });
  });
}

// Markets overview — additional checks
test.describe('Markets overview page', () => {
  test('should list all market segments', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/markets');

    const segments = ['Defense', 'Health', 'Airports & Air Traffic', 'Government', 'Intelligence', 'Space', 'Energy', 'Homeland', 'Maritime'];
    for (const segment of segments) {
      await expect(page.locator(`text=${segment}`).first()).toBeAttached();
    }
  });
});
