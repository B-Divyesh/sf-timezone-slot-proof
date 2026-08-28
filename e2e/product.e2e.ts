import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

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

test('routes, titles, focus, mobile layout, metadata, and accessibility work', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page).toHaveTitle('Timezone Slot Proof — Check booking hours');
  expect(await page.locator('html').evaluate((node) => node.scrollWidth)).toBe(390);
  await page.getByRole('link', { name: /Try it with sample data/i }).click();
  await expect(page).toHaveURL(/\?demo=1$/);
  await expect(page).toHaveTitle('Demo — Timezone Slot Proof');
  await expect(page.locator('#hero-title')).toBeFocused();
  await page.goBack();
  await expect(page.locator('#hero-title')).toBeFocused();
  await page.goto('/privacy/');
  await expect(page).toHaveTitle('Privacy — Timezone Slot Proof');
  await expect(page.locator('h1')).toBeFocused();
  await page.goBack();
  await expect(page.locator('#hero-title')).toBeFocused();
  await page.goto('/no-such-proof');
  await expect(page).toHaveTitle('Page not found — Timezone Slot Proof');
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  expect(await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()).toEqual(expect.objectContaining({ violations: [] }));
  expect(errors).toEqual([]);
});
