import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

const siteUrl = 'https://timezone-slot-proof.sociobot.in';

function demoDocument(): Plugin {
  return {
    name: 'timezone-slot-proof-demo-document',
    apply: 'build',
    async closeBundle() {
      const indexPath = resolve(process.cwd(), 'dist/index.html');
      const demoPath = resolve(process.cwd(), 'dist/demo/index.html');
      const home = await readFile(indexPath, 'utf8');
      const demo = home
        .replaceAll('Timezone Slot Proof — Check booking hours', 'Demo — Timezone Slot Proof')
        .replaceAll('Check booking hours in five time zones before daylight saving changes surprise a client.', 'Try a five-zone daylight-saving booking-hours check with sample data.')
        .replaceAll(`href="${siteUrl}/"`, `href="${siteUrl}/demo"`)
        .replaceAll('content="Timezone Slot Proof — Check booking hours"', 'content="Demo — Timezone Slot Proof"');
      await mkdir(resolve(process.cwd(), 'dist/demo'), { recursive: true });
      await writeFile(demoPath, demo);
    },
  };
}

export default defineConfig({
  plugins: [demoDocument()],
  build: {
    target: 'es2022',
    outDir: 'dist',
    sourcemap: true,
  },
});
