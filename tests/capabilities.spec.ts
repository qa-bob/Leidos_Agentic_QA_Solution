import { test, expect } from '@playwright/test';
import { BasePage } from './pages/BasePage';

const CAPABILITIES = [
  {
    path: '/capabilities',
    title: /Capabilities \| Leidos/,
    h1: 'Capabilities',
    h2: 'Capabilities that drive mission performance',
    hasBreadcrumb: false,
  },
  {
    path: '/capabilities/ai',
    title: /Artificial Intelligence \| Leidos/,
    h1: 'Artificial Intelligence',
    h2: 'Proven AI',
    hasBreadcrumb: true,
  },
  {
    path: '/capabilities/cyber',
    title: /Cybersecurity \| Leidos/,
    h1: 'Cybersecurity',
    h2: 'Cyber authority',
    hasBreadcrumb: true,
  },
  {
    path: '/capabilities/digital-modernization',
    title: /Digital Modernization \| Leidos/,
    h1: 'Digital Modernization',
    h2: 'Orchestrating digital transformation',
    hasBreadcrumb: true,
  },
  {
    path: '/capabilities/mission-software-systems',
    title: /Mission Software \| Leidos/,
    h1: 'Mission Software',
    h2: 'Software that moves missions forward',
    hasBreadcrumb: true,
  },
  {
    path: '/capabilities/rapid-prototyping-manufacturing',
    title: /Prototyping & Manufacturing \| Leidos/,
    h1: 'Prototyping & Manufacturing',
    h2: 'Where Prototypes Become Production Systems',
    hasBreadcrumb: true,
  },
  {
    path: '/capabilities/cyber/quantum-technology',
    title: /Quantum \| Leidos/,
    h1: 'Quantum',
    h2: 'Quantum Edge Starts Here',
    hasBreadcrumb: true,
  },
];

for (const capability of CAPABILITIES) {
  test.describe(`Capabilities: ${capability.h1}`, () => {
    test(`should load ${capability.path} with correct title and heading`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.goto(capability.path);
      await bp.assertPageLoaded(capability.title, capability.h1);
    });

    test(`${capability.path} should have a key section heading`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.goto(capability.path);
      await bp.assertH2Contains(capability.h2);
    });

    test(`${capability.path} should have a CTA section`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.goto(capability.path);
      await bp.assertCTA();
    });

    test(`${capability.path} should have a footer`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.goto(capability.path);
      await bp.assertFooterPresent();
    });
  });
}

// Capabilities overview — additional checks
test.describe('Capabilities overview page', () => {
  test('should list all capability areas', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/capabilities');

    const areas = ['AI', 'Cyber', 'Digital Modernization', 'Mission Software', 'Prototyping'];
    for (const area of areas) {
      await expect(page.locator(`text=${area}`).first()).toBeAttached();
    }
  });
});

// AI page — deeper content checks
test.describe('AI capability page', () => {
  test('should mention AI outcomes or stories', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/capabilities/ai');
    await expect(page.locator('text=/outcome|story|partner/i').first()).toBeAttached();
  });
});

// Cyber page — deeper content checks
test.describe('Cybersecurity capability page', () => {
  test('should reference quantum or cyber mission', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.goto('/capabilities/cyber');
    await expect(page.locator('text=/mission|quantum|threat/i').first()).toBeAttached();
  });
});
