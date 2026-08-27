import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const dist = (file) => resolve(process.cwd(), 'dist', file);

function headersFor(config, path) {
  const headers = { ...config.globalHeaders };
  const route = config.routes.find((candidate) => candidate.route === path || (candidate.route.endsWith('/*') && path.startsWith(candidate.route.slice(0, -1))));
  return { ...headers, ...route?.headers };
}

describe('emitted Static Web Apps cache contract', () => {
  it('ships content-hashed JS/CSS with immutable one-year caching', () => {
    const html = readFileSync(dist('index.html'), 'utf8');
    expect(html).toMatch(/\/assets\/index-[A-Za-z0-9_-]+\.js/);
    expect(html).toMatch(/\/assets\/index-[A-Za-z0-9_-]+\.css/);

    const config = JSON.parse(readFileSync(dist('staticwebapp.config.json'), 'utf8'));
    expect(headersFor(config, '/assets/index-example.js')['Cache-Control']).toBe('public, max-age=31536000, immutable');
    expect(headersFor(config, '/assets/index-example.css')['Cache-Control']).toBe('public, max-age=31536000, immutable');
  });

  it('keeps documents and the service worker revalidating', () => {
    const config = JSON.parse(readFileSync(dist('staticwebapp.config.json'), 'utf8'));
    const revalidate = 'public, max-age=0, must-revalidate';
    expect(headersFor(config, '/')['Cache-Control']).toBe(revalidate);
    expect(headersFor(config, '/privacy/index.html')['Cache-Control']).toBe(revalidate);
    expect(headersFor(config, '/sw.js')['Cache-Control']).toBe(revalidate);
  });
});
