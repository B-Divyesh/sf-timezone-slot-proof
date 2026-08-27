import type { WallTime } from '../types';

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function formatter(zone: string, withName = false): Intl.DateTimeFormat {
  const key = `${zone}:${withName}`;
  let cached = formatterCache.get(key);
  if (!cached) {
    cached = new Intl.DateTimeFormat('en-CA-u-ca-iso8601', {
      timeZone: zone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      ...(withName ? { timeZoneName: 'short' } : {}),
    });
    formatterCache.set(key, cached);
  }
  return cached;
}

export function isValidZone(zone: string): boolean {
  try {
    formatter(zone).format(0);
    return true;
  } catch {
    return false;
  }
}

export function zonedParts(epochMs: number, zone: string): WallTime {
  const parts = formatter(zone).formatToParts(epochMs);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  return {
    year: value('year'),
    month: value('month'),
    day: value('day'),
    hour: value('hour'),
    minute: value('minute'),
    second: value('second'),
  };
}

export function offsetMinutes(epochMs: number, zone: string): number {
  const p = zonedParts(epochMs, zone);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second ?? 0);
  return Math.round((asUtc - Math.floor(epochMs / 1000) * 1000) / 60_000);
}

function sameWall(a: WallTime, b: WallTime): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day &&
    a.hour === b.hour && a.minute === b.minute;
}

/** Returns zero instants for a skipped wall time, two for a repeated wall time. */
export function resolveWallTime(wall: WallTime, zone: string): number[] {
  const naive = Date.UTC(wall.year, wall.month - 1, wall.day, wall.hour, wall.minute, wall.second ?? 0);
  const offsets = new Set<number>();
  for (const delta of [-36, -12, 0, 12, 36]) {
    offsets.add(offsetMinutes(naive + delta * 3_600_000, zone));
  }
  const matches = [...offsets]
    .map((offset) => naive - offset * 60_000)
    .filter((candidate) => sameWall(zonedParts(candidate, zone), wall));
  return [...new Set(matches)].sort((a, b) => a - b);
}

export function zoneName(epochMs: number, zone: string): string {
  return formatter(zone, true).formatToParts(epochMs)
    .find((part) => part.type === 'timeZoneName')?.value ?? 'UTC';
}

export function dateKey(wall: WallTime): string {
  return `${wall.year}-${String(wall.month).padStart(2, '0')}-${String(wall.day).padStart(2, '0')}`;
}

export function wallKey(wall: WallTime): string {
  return `${dateKey(wall)}T${String(wall.hour).padStart(2, '0')}:${String(wall.minute).padStart(2, '0')}`;
}

export function parseDateKey(value: string): WallTime {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) throw new Error('Choose a valid start date.');
  return { year, month, day, hour: 0, minute: 0 };
}

export function addDays(wall: WallTime, count: number): WallTime {
  const date = new Date(Date.UTC(wall.year, wall.month - 1, wall.day + count));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate(), hour: wall.hour, minute: wall.minute };
}

export function addMonths(wall: WallTime, count: number): WallTime {
  const date = new Date(Date.UTC(wall.year, wall.month - 1 + count, wall.day));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate(), hour: wall.hour, minute: wall.minute };
}

export function dayOfWeek(wall: WallTime): number {
  return new Date(Date.UTC(wall.year, wall.month - 1, wall.day)).getUTCDay();
}

export function compareWall(a: WallTime, b: WallTime): number {
  return Date.UTC(a.year, a.month - 1, a.day, a.hour, a.minute) - Date.UTC(b.year, b.month - 1, b.day, b.hour, b.minute);
}

export function addWallMinutes(wall: WallTime, minutes: number): WallTime {
  const date = new Date(Date.UTC(wall.year, wall.month - 1, wall.day, wall.hour, wall.minute + minutes));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate(), hour: date.getUTCHours(), minute: date.getUTCMinutes() };
}

export function formatWallDate(wall: WallTime): string {
  return new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    .format(Date.UTC(wall.year, wall.month - 1, wall.day));
}

export function formatWallTime(wall: WallTime): string {
  return new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit', hourCycle: 'h12', timeZone: 'UTC' })
    .format(Date.UTC(2020, 0, 1, wall.hour, wall.minute));
}
