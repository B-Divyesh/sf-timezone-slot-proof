import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { mkdir, readFile } from 'node:fs/promises';

const calendarFixture = `BEGIN:VCALENDAR\r
VERSION:2.0\r
BEGIN:VEVENT\r
DTSTART;TZID=America/New_York:20260802T090000\r
DTEND;TZID=America/New_York:20260802T100000\r
RRULE:FREQ=WEEKLY;BYDAY=SU\r
SUMMARY:Private availability\r
END:VEVENT\r
END:VCALENDAR`;

test('@claim:offline-demo demo reloads and remains usable offline after the first visit', async ({ page, context }) => {
  await page.goto('/demo');
  await page.waitForFunction(() => navigator.serviceWorker?.controller !== null);
  await page.reload();
  await expect(page.getByText('Starts tested', { exact: true })).toBeVisible();
  await page.waitForFunction(() => navigator.serviceWorker?.controller !== null);
  const cached = await page.evaluate(async () => Promise.all((await caches.keys()).map(async (name) => { const cache = await caches.open(name); return { name, keys: (await cache.keys()).map((key) => key.url) }; })));
  expect(cached.flatMap((cache) => cache.keys).some((url) => /\/assets\/index-.*\.js$/.test(url))).toBeTruthy();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByText('Starts tested', { exact: true })).toBeVisible();
});

test('@claim:demo-isolation demo starts with a five-zone sample and never reads or writes real configuration', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('timezone-slot-proof:config', JSON.stringify({ hostZone: 'UTC', zones: ['UTC'] })));
  await page.goto('/demo');
  await expect(page.getByText('Demo — sample data, nothing is saved.')).toBeVisible();
  await expect(page.getByText('Starts tested', { exact: true })).toBeVisible();
  await expect(page.locator('#zone-count')).toHaveText('5 / 5');
  expect(await page.evaluate(() => localStorage.getItem('timezone-slot-proof:config'))).toContain('UTC');
  expect(await page.evaluate(() => Object.keys(localStorage).filter((key) => key.startsWith('demo:')))).toEqual([]);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('#zone-count')).toHaveText('5 / 5');
});

test('@claim:dst-check sample check covers 18 months, five zones, and daylight-saving flags', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByText(/starts tested across 5 client time zones over 18 months/i)).toBeVisible();
  await expect(page.getByText('Shifted', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Skipped', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Repeated', { exact: true }).first()).toBeVisible();
});

test('@claim:csv-export sample check exports every result as CSV', async ({ page }) => {
  await page.goto('/demo');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export CSV' }).click();
  const file = await download;
  expect(file.suggestedFilename()).toMatch(/^timezone-slot-proof-.+\.csv$/);
  const csv = await readFile(await file.path()!, 'utf8');
  expect(csv.split('\n')[0]).toContain('host_date');
  expect(csv.trim().split('\n').length).toBeGreaterThan(120);
});

test('@claim:local-only demo calculation makes no third-party requests', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', (request) => origins.add(new URL(request.url()).origin));
  await page.goto('/demo');
  await expect(page.getByText('Starts tested', { exact: true })).toBeVisible();
  expect([...origins]).toEqual(['http://127.0.0.1:4173']);
});

test('@claim:no-login demo has no account or calendar-login flow', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByText('No calendar login')).toBeVisible();
  expect(await page.locator('input[type="password"], [data-auth], a[href*="oauth" i], a[href*="login" i]').count()).toBe(0);
});

test('@claim:normal-config-local weekly booking hours stay in browser storage without third-party requests', async ({ page }) => {
  const origins = new Set<string>();
  const methods: string[] = [];
  page.on('request', (request) => { origins.add(new URL(request.url()).origin); methods.push(request.method()); });
  await page.goto('/?demo=1');
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL('http://127.0.0.1:4173/');
  await page.locator('#host-zone').fill('America/New_York');
  await page.locator('#start-date').fill('2026-08-01');
  await page.getByRole('button', { name: /Check booking hours/i }).last().click();
  await expect(page.getByText('Starts tested', { exact: true })).toBeVisible();
  const saved = await page.evaluate(() => localStorage.getItem('timezone-slot-proof:config'));
  expect(saved).toContain('America/New_York');
  expect([...origins]).toEqual(['http://127.0.0.1:4173']);
  expect(methods.every((method) => method === 'GET')).toBeTruthy();
});

test('@claim:calendar-file-local calendar-file contents stay in the open page and never enter review links', async ({ page }) => {
  const origins = new Set<string>();
  const methods: string[] = [];
  page.on('request', (request) => { origins.add(new URL(request.url()).origin); methods.push(request.method()); });
  await page.goto('/?demo=1');
  await page.locator('.source-switch label', { hasText: 'Import calendar file' }).click();
  await expect(page.locator('#ics-source')).toBeVisible();
  await page.locator('#ics-file').setInputFiles({ name: 'private-availability.ics', mimeType: 'text/calendar', buffer: Buffer.from(calendarFixture) });
  await expect(page.locator('#ics-summary')).toContainText('private-availability.ics');
  await page.getByRole('button', { name: /Check booking hours/i }).last().click();
  await expect(page.getByText('Starts tested', { exact: true })).toBeVisible();
  const review = page.getByRole('button', { name: 'Copy review link' });
  await expect(review).toBeDisabled();
  const stored = await page.evaluate(() => Object.values(localStorage).join('|'));
  expect(stored).not.toContain('Private availability');
  expect(stored).not.toContain('DTSTART');
  expect(await page.evaluate(() => location.href)).not.toContain('DTSTART');
  expect([...origins]).toEqual(['http://127.0.0.1:4173']);
  expect(methods.every((method) => method === 'GET')).toBeTruthy();
});

test('@claim:normal-range-and-timezone-rules normal checks cover 18 months and project a known client time', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL('http://127.0.0.1:4173/');
  await page.locator('#host-zone').fill('America/New_York');
  await page.locator('#start-date').fill('2026-08-03');
  await page.locator('#zone-0').fill('America/New_York');
  await page.locator('#zone-1').fill('Europe/London');
  await page.locator('#zone-2').fill('Asia/Kolkata');
  await page.getByRole('button', { name: /Add client time zone/i }).click();
  await page.getByRole('button', { name: /Add client time zone/i }).click();
  await page.getByRole('button', { name: /Check booking hours/i }).last().click();
  const summary = page.locator('.proof-header');
  await expect(summary).toHaveAttribute('data-zone-count', '5');
  await expect(summary).toHaveAttribute('data-range-start', '2026-08-03');
  await expect(summary).toHaveAttribute('data-range-end', '2028-02-03');
  await page.getByRole('button', { name: 'Show all starts' }).click();
  const firstRow = page.locator('tbody tr').first();
  await expect(firstRow).toContainText('Aug 3, 2026');
  await expect(firstRow).toContainText('9:00 AM');
  await expect(firstRow).toContainText('2:00 PM');
});

test('@claim:no-scheduler-access normal and calendar-file checks never offer or contact a scheduler', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', (request) => origins.add(new URL(request.url()).origin));
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Start for real' }).click();
  await page.locator('#host-zone').fill('America/New_York');
  await page.locator('#start-date').fill('2026-08-01');
  await page.getByRole('button', { name: /Check booking hours/i }).last().click();
  await expect(page.getByText('Starts tested', { exact: true })).toBeVisible();
  await page.locator('.source-switch label', { hasText: 'Import calendar file' }).click();
  await page.locator('#ics-file').setInputFiles({ name: 'private-availability.ics', mimeType: 'text/calendar', buffer: Buffer.from(calendarFixture) });
  await page.getByRole('button', { name: /Check booking hours/i }).last().click();
  await expect(page.getByText('Starts tested', { exact: true })).toBeVisible();
  expect(await page.locator('input[type="password"], [data-auth], [data-provider], a[href*="oauth" i], a[href*="login" i]').count()).toBe(0);
  expect([...origins]).toEqual(['http://127.0.0.1:4173']);
});

test('@claim:print-export populated checks call the browser print action', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'print', { configurable: true, value: () => { document.documentElement.dataset.printCalled = 'true'; } });
  });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Print or save as PDF' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-print-called', 'true');
});

test('result and error copy stays in booking-hours language', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByText('Check complete', { exact: false })).toBeVisible();
  await expect(page.getByText('Clock changes', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Bookable time problems' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Booking-time table' })).toBeVisible();
  await expect(page.locator('#results')).not.toContainText(/DST seams|Attention ledger|Test matrix|configuration proof|IANA/i);
  await page.getByRole('button', { name: 'Start for real' }).click();
  await page.locator('#host-zone').fill('not-a-time-zone');
  await page.getByRole('button', { name: /Check booking hours/i }).last().click();
  await expect(page.locator('#form-errors')).toContainText('Enter a time-zone name such as America/New_York.');
});

test('routes, titles, focus, mobile layout, metadata, and accessibility work', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await mkdir('.factory/evidence-polish-3', { recursive: true });
  await page.goto('/');
  await expect(page).toHaveTitle('Timezone Slot Proof — Check booking hours');
  expect(await page.locator('html').evaluate((node) => node.scrollWidth)).toBe(390);
  await page.getByRole('link', { name: /Try it with sample data/i }).click();
  await expect(page).toHaveURL(/\?demo=1$/);
  await expect(page).toHaveTitle('Demo — Timezone Slot Proof');
  expect(await page.locator('html').evaluate((node) => node.scrollWidth)).toBe(390);
  await expect(page.locator('#check-complete-heading')).toBeFocused();
  const demoMetric = await page.getByText('Starts tested', { exact: true }).boundingBox();
  expect(demoMetric?.y).toBeGreaterThanOrEqual(0);
  expect((demoMetric?.y ?? 900) + (demoMetric?.height ?? 0)).toBeLessThanOrEqual(844);
  await page.screenshot({ path: '.factory/evidence-polish-3/demo-mobile.png', fullPage: false });
  await page.goto('/privacy/');
  await expect(page.locator('h1')).toBeFocused();
  await page.goBack();
  await expect(page.locator('#check-complete-heading')).toBeFocused();
  await page.goBack();
  await expect(page.locator('#hero-title')).toBeFocused();
  await page.goto('/privacy/');
  await expect(page).toHaveTitle('Privacy — Timezone Slot Proof');
  await expect(page.locator('h1')).toBeFocused();
  await page.screenshot({ path: '.factory/evidence-polish-3/privacy-mobile.png', fullPage: false });
  await page.goBack();
  await expect(page.locator('#hero-title')).toBeFocused();
  await page.goto('/no-such-proof');
  await expect(page).toHaveTitle('Page not found — Timezone Slot Proof');
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  await page.screenshot({ path: '.factory/evidence-polish-3/not-found-mobile.png', fullPage: false });
  expect(await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()).toEqual(expect.objectContaining({ violations: [] }));
  expect(errors).toEqual([]);
});

test('every mobile link and button has a 44px target and every route uses the shared shell', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/demo', '/privacy/', '/terms/', '/404.html']) {
    await page.goto(route);
    await expect(page.locator('.site-header .wordmark')).toBeVisible();
    await expect(page.locator('.site-header .wordmark-mark')).toBeVisible();
    await expect(page.locator('.site-header nav a')).toHaveCount(4);
    await expect(page.locator('footer .footer-mark')).toBeVisible();
    const targets = await page.locator('a:visible, button:visible').evaluateAll((elements) => elements.map((element) => {
      const box = element.getBoundingClientRect();
      return { label: (element.textContent || '').trim(), width: box.width, height: box.height };
    }));
    for (const target of targets) {
      expect(target.height, `${route}: ${target.label}`).toBeGreaterThanOrEqual(44);
      expect(target.width, `${route}: ${target.label}`).toBeGreaterThanOrEqual(44);
    }
  }
});
