# Leidos Agentic QA Solution

An end-to-end test automation suite for [leidos.com](https://www.leidos.com) built with [Playwright](https://playwright.dev/) and TypeScript. The suite covers the full public website — homepage, markets, capabilities, company pages, content/newsroom, and the careers section — across five browser environments.

---

## 📋 What's Covered

| Test File | Pages Tested | Tests |
|---|---|---|
| `tests/homepage.spec.ts` | leidos.com homepage | 4 |
| `tests/markets.spec.ts` | 10 market pages (Defense, Health, Aviation, etc.) | ~50 |
| `tests/capabilities.spec.ts` | 7 capability pages (AI, Cyber, Digital Mod, etc.) | ~35 |
| `tests/company.spec.ts` | 7 company pages (Who We Are, Leadership, Ethics, etc.) | ~30 |
| `tests/content.spec.ts` | Insights, Newsroom, article & author pages | ~9 |
| `tests/careers-site.spec.ts` | leidos.com/careers/* pages | ~14 |

**Total: 620 tests** run across **5 browser projects**:
- Desktop: Chromium, Firefox, WebKit (Safari)
- Mobile: Chrome (Pixel 5), Safari (iPhone 12)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### 1. Clone the repo

```bash
git clone https://github.com/qa-bob/Leidos_Agentic_QA_Solution.git
cd Leidos_Agentic_QA_Solution
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

> **Note:** If you are on a corporate network with a custom TLS certificate chain, prefix commands with `NODE_TLS_REJECT_UNAUTHORIZED=0`:
> ```bash
> NODE_TLS_REJECT_UNAUTHORIZED=0 npx playwright install
> ```

---

## ▶️ Running Tests

### Run all tests (all browsers)

```bash
npx playwright test
```

> On a corporate network:
> ```bash
> NODE_TLS_REJECT_UNAUTHORIZED=0 npx playwright test
> ```

### Run a specific test file

```bash
npx playwright test tests/markets.spec.ts
```

### Run in a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project=mobile-chrome
npx playwright test --project=mobile-safari
```

### Run with the interactive UI

```bash
npx playwright test --ui
```

### View the HTML report

After a test run, open the report with:

```bash
npx playwright show-report
```

---

## 🗂️ Project Structure

```
.
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions CI workflow
├── tests/
│   ├── pages/
│   │   ├── BasePage.ts         # Shared Page Object Model base class
│   │   └── HomePage.ts         # Homepage Page Object
│   ├── homepage.spec.ts
│   ├── markets.spec.ts
│   ├── capabilities.spec.ts
│   ├── company.spec.ts
│   ├── content.spec.ts
│   └── careers-site.spec.ts
├── playwright.config.ts        # Playwright configuration (browsers, timeouts, etc.)
├── package.json
└── tsconfig.json
```

---

## ⚙️ Configuration

Key settings in `playwright.config.ts`:

| Setting | Value |
|---|---|
| Base URL | `https://www.leidos.com` |
| Timeout | 60 seconds |
| Retries (CI) | 2 |
| Parallel | Yes |
| HTTPS errors | Ignored (corporate cert support) |
| Screenshots | On failure only |
| Traces | On first retry |

---

## 🤖 CI/CD

A GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the full suite:
- On every push to `main`
- On every pull request
- On a nightly schedule

Test artifacts (HTML report) are uploaded after each run and available for download from the Actions tab.

---

## 📬 Contact

Questions or feedback? Reach out to:

**rlsmall@cox.net**
