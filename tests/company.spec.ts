import { test, expect } from '@playwright/test';
import { BasePage } from './pages/BasePage';

const COMPANY_PAGES = [
  {
    path: '/company',
    title: /Company \| Leidos/,
    h1: 'Company',
    h2: 'Our Company',
    hasBreadcrumb: false,
  },
  {
    path: '/company/who-we-are',
    title: /Who We Are \| Leidos/,
    h1: 'Who We Are',
    h2: 'About Leidos',
    hasBreadcrumb: true,
  },
  {
    path: '/company/leadership',
    title: /Our Leadership Team \| Leidos/,
    h1: 'Our Leadership Team',
    h2: null,
    hasBreadcrumb: true,
  },
  {
    path: '/company/responsibility-and-sustainability',
    title: /Culture & Community \| Leidos/,
    h1: 'Culture & Community',
    h2: 'Impact beyond mission',
    hasBreadcrumb: true,
  },
  {
    path: '/company/ethics-and-business-integrity',
    title: /Ethics & Integrity \| Leidos/,
    h1: 'Ethics & Integrity',
    h2: 'History of Ethics at Leidos',
    hasBreadcrumb: true,
  },
  {
    path: '/company/contract-vehicles',
    title: /Contract Vehicles \| Leidos/,
    h1: 'Contract Vehicles',
    h2: 'Streamlined access',
    hasBreadcrumb: true,
  },
  {
    path: '/company/partners',
    title: /Partnerships \| Leidos/,
    h1: 'Partnerships',
    h2: 'Collaborative innovation',
    hasBreadcrumb: true,
  },
];

for (const companyPage of COMPANY_PAGES) {
  test.describe(`Company: ${companyPage.h1}`, () => {
    test(`should load ${companyPage.path} with correct title and heading`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.goto(companyPage.path);
      await bp.assertPageLoaded(companyPage.title, companyPage.h1);
    });

    if (companyPage.h2) {
      test(`${companyPage.path} should have a key section heading`, async ({ page }) => {
        const bp = new BasePage(page);
        await bp.goto(companyPage.path);
        await bp.assertH2Contains(companyPage.h2!);
      });
    }

    test(`${companyPage.path} should have a footer`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.goto(companyPage.path);
      await bp.assertFooterPresent();
    });
  });
}

// Leadership page — specific checks
test.describe('Leadership page', () => {
  test('should display at least one leader profile', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/company/leadership');
    // Each leader is typically in a card/article with a name
    const profiles = page.locator('article, [class*="card"], [class*="leader"], [class*="person"]');
    await expect(profiles.first()).toBeAttached();
  });
});

// Who We Are — specific checks
test.describe('Who We Are page', () => {
  test('should mention Leidos mission or values', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/company/who-we-are');
    await expect(page.locator('text=/value|mission|employ/i').first()).toBeAttached();
  });
});

// Partners page — specific checks
test.describe('Partners page', () => {
  test('should list partner mission areas', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/company/partners');
    await expect(page.locator('text=/partner/i').first()).toBeAttached();
  });
});

// Company overview — navigation links
test.describe('Company overview page', () => {
  test('should have navigation links to all sub-sections', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/company');

    const subPages = ['Who We Are', 'Leadership', 'Partners', 'Contract Vehicles'];
    for (const label of subPages) {
      await expect(page.locator(`text="${label}"`).first()).toBeAttached();
    }
  });
});
