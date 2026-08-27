import type { ProofConfig, ProofResult } from '../types';
import { dateKey } from './timezone';

function csvCell(value: unknown): string {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function resultToCsv(result: ProofResult, config: ProofConfig): string {
  const headers = ['status', 'host_date', 'host_time', 'host_zone', ...config.zones.flatMap((zone) => [`${zone}_date`, `${zone}_time`, `${zone}_offset`, `${zone}_status`]), 'note'];
  const lines = [headers.map(csvCell).join(',')];
  result.rows.forEach((row) => {
    const cells = config.zones.flatMap((zone) => {
      const cell = row.cells.find((item) => item.zone === zone);
      return cell ? [cell.dateLabel, cell.label, cell.abbreviation, cell.flag ?? 'steady'] : ['', '', '', 'missing'];
    });
    lines.push([
      row.flags.length ? row.flags.join('+') : 'steady', dateKey(row.hostWall), row.hostLabel, config.hostZone,
      ...cells, row.note ?? row.cells.find((cell) => cell.note)?.note ?? '',
    ].map(csvCell).join(','));
  });
  return `\uFEFF${lines.join('\r\n')}`;
}

export function downloadText(filename: string, content: string, type: string): void {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function encodeConfig(config: ProofConfig): string {
  const copy = { ...config, windows: config.windows.map(({ id: _id, ...window }) => window) };
  const bytes = new TextEncoder().encode(JSON.stringify(copy));
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function decodeConfig(value: string): ProofConfig {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const parsed = JSON.parse(new TextDecoder().decode(bytes)) as ProofConfig;
  parsed.windows = parsed.windows.map((window, index) => ({ ...window, id: `shared-${index}` }));
  return parsed;
}
