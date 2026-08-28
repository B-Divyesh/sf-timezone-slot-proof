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

  it('ships a route-specific demo document and a real 404 override', () => {
    const demo = readFileSync(dist('demo/index.html'), 'utf8');
    const missing = readFileSync(dist('404.html'), 'utf8');
    const config = JSON.parse(readFileSync(dist('staticwebapp.config.json'), 'utf8'));
    for (const [html, title, canonical] of [
      [demo, 'Demo — Timezone Slot Proof', 'https://timezone-slot-proof.sociobot.in/demo'],
      [missing, 'Page not found — Timezone Slot Proof', 'https://timezone-slot-proof.sociobot.in/404'],
    ]) {
      expect(html).toContain(`<title>${title}</title>`);
      expect(html).toContain(`rel="canonical" href="${canonical}"`);
      expect(html).toContain(`property="og:title" content="${title}"`);
      expect(html).toContain(`name="twitter:title" content="${title}"`);
    }
    expect(config.navigationFallback).toBeUndefined();
    expect(config.routes.find((route) => route.route === '/demo')).toEqual({ route: '/demo', rewrite: '/demo/index.html' });
    expect(config.responseOverrides?.['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
  });

  it('ships the same proof-board shell on every static route', () => {
    const documents = ['index.html', 'demo/index.html', 'privacy/index.html', 'terms/index.html', '404.html']
      .map((file) => readFileSync(dist(file), 'utf8'));
    for (const html of documents) {
      expect(html).toContain('<header class="site-header">');
      expect(html).toContain('class="wordmark-mark"');
      expect(html).toContain('<a href="/?demo=1">Demo</a>');
      expect(html).toContain('>Check hours</a>');
      expect(html).toContain('>Method</a>');
      expect(html).toContain('>Privacy</a>');
      expect(html).toContain('<div class="footer-mark"');
      expect(html).toContain('>Terms</a>');
      expect(html).toContain('Built by Param Factory');
    }
  });
});
