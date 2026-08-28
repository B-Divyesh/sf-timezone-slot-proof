import type { IcsEvent, ProofConfig, ProofResult, SlotRow, WallTime, ZoneCell } from '../types';
import { addDays, addMonths, addWallMinutes, compareWall, dateKey, dayOfWeek, formatWallDate, formatWallTime, offsetMinutes, parseDateKey, resolveWallTime, wallKey, zoneName, zonedParts } from './timezone';

const MAX_SLOTS = 30_000;

function timeMinutes(value: string): number {
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) throw new Error('Working-hour times must use HH:MM.');
  return Number(match[1]) * 60 + Number(match[2]);
}

function makeCell(epoch: number, zone: string): ZoneCell {
  const wall = zonedParts(epoch, zone);
  return {
    zone,
    label: formatWallTime(wall),
    dateLabel: formatWallDate(wall),
    minuteOfDay: wall.hour * 60 + wall.minute,
    offset: offsetMinutes(epoch, zone),
    abbreviation: zoneName(epoch, zone),
  };
}

function makeRow(hostWall: WallTime, hostZone: string, zones: string[], duration: number, sourceKey: string): SlotRow {
  const starts = resolveWallTime(hostWall, hostZone);
  if (!starts.length) {
    return {
      id: `${sourceKey}:${wallKey(hostWall)}`, start: null, end: null, hostWall,
      hostLabel: formatWallTime(hostWall), hostDateLabel: formatWallDate(hostWall), sourceKey,
      flags: ['missing'], cells: [], note: `${wallKey(hostWall)} does not exist in ${hostZone} because the clock moves forward.`,
    };
  }
  const start = starts[0]!;
  const endWall = addWallMinutes(hostWall, duration);
  const ends = resolveWallTime(endWall, hostZone);
  const flags: SlotRow['flags'] = [];
  if (starts.length > 1 || ends.length > 1) flags.push('ambiguous');
  if (!ends.length) flags.push('missing');
  const end = ends[0] ?? null;
  const cells = zones.map((zone) => makeCell(start, zone));
  return {
    id: `${sourceKey}:${start}`, start, end, hostWall,
    hostLabel: formatWallTime(hostWall), hostDateLabel: formatWallDate(hostWall), sourceKey,
    flags, cells,
    note: flags.includes('ambiguous') ? 'This local time occurs twice when clocks move back.' :
      flags.includes('missing') ? 'The meeting ends during a time skipped when clocks move forward.' : undefined,
  };
}

function annotateChanges(rows: SlotRow[]): void {
  const previous = new Map<string, ZoneCell>();
  for (const row of rows) {
    if (row.start === null) continue;
    row.cells.forEach((cell) => {
      const key = `${row.sourceKey}|${cell.zone}`;
      const prior = previous.get(key);
      if (prior && prior.minuteOfDay !== cell.minuteOfDay) {
        cell.flag = 'shifted';
        const delta = cell.minuteOfDay - prior.minuteOfDay;
        cell.note = `The local time moved ${delta > 0 ? '+' : ''}${delta} minutes after clocks changed.`;
        if (!row.flags.includes('shifted')) row.flags.push('shifted');
      } else if (prior && prior.offset !== cell.offset) {
        cell.flag = 'dst';
        cell.note = 'Clocks changed, but this bookable time kept the same local time.';
        if (!row.flags.includes('dst')) row.flags.push('dst');
      }
      previous.set(key, cell);
    });
  }
}

export function formatOffset(minutes: number): string {
  const sign = minutes >= 0 ? '+' : '-';
  const absolute = Math.abs(minutes);
  return `UTC${sign}${String(Math.floor(absolute / 60)).padStart(2, '0')}:${String(absolute % 60).padStart(2, '0')}`;
}

function summarize(rows: SlotRow[], truncated: boolean): ProofResult {
  annotateChanges(rows);
  return {
    rows,
    shifted: rows.filter((row) => row.flags.includes('shifted')).length,
    missing: rows.filter((row) => row.flags.includes('missing')).length,
    ambiguous: rows.filter((row) => row.flags.includes('ambiguous')).length,
    dstChanges: rows.filter((row) => row.flags.includes('dst') || row.flags.includes('shifted')).length,
    generatedAt: new Date().toISOString(),
    truncated,
  };
}

export function generateWeekly(config: ProofConfig): ProofResult {
  const start = parseDateKey(config.startDate);
  const end = addMonths(start, config.months);
  const rows: SlotRow[] = [];
  let cursor = start;
  let truncated = false;
  while (compareWall(cursor, end) < 0) {
    for (const window of config.windows) {
      if (!window.days.includes(dayOfWeek(cursor))) continue;
      const from = timeMinutes(window.start);
      const to = timeMinutes(window.end);
      if (to <= from) throw new Error('Each booking-hours range must end later than it begins. Split overnight hours into two ranges.');
      for (let minute = from; minute + config.duration <= to; minute += config.interval) {
        if (rows.length >= MAX_SLOTS) { truncated = true; break; }
        const hostWall = addWallMinutes({ ...cursor, hour: 0, minute: 0 }, minute);
        rows.push(makeRow(hostWall, config.hostZone, config.zones, config.duration, `${window.id}:${dayOfWeek(cursor)}:${minute}`));
      }
    }
    if (truncated) break;
    cursor = addDays(cursor, 1);
  }
  rows.sort((a, b) => compareWall(a.hostWall, b.hostWall));
  return summarize(rows, truncated);
}

function eventOccurrences(event: IcsEvent, rangeStart: WallTime, rangeEnd: WallTime): WallTime[] {
  if (!event.rrule) return compareWall(event.start, rangeEnd) < 0 && compareWall(event.end, rangeStart) >= 0 ? [event.start] : [];
  const occurrences: WallTime[] = [];
  const rule = event.rrule;
  const byDays = rule.byDay.length ? rule.byDay : [dayOfWeek(event.start)];
  let cursor = { ...event.start };
  let count = 0;
  while (compareWall(cursor, rangeEnd) < 0 && count < 1000) {
    const weeks = Math.floor((Date.UTC(cursor.year, cursor.month - 1, cursor.day) - Date.UTC(event.start.year, event.start.month - 1, event.start.day)) / (7 * 86_400_000));
    if (weeks % rule.interval === 0 && byDays.includes(dayOfWeek(cursor)) && compareWall(cursor, event.start) >= 0) {
      const epochGuess = Date.UTC(cursor.year, cursor.month - 1, cursor.day, cursor.hour, cursor.minute);
      if (rule.until && epochGuess > rule.until) break;
      if (compareWall(cursor, rangeStart) >= 0) occurrences.push({ ...cursor });
      count++;
      if (rule.count && count >= rule.count) break;
    }
    cursor = addDays(cursor, 1);
  }
  return occurrences;
}

export function generateIcs(config: ProofConfig, events: IcsEvent[]): ProofResult {
  const rangeStart = parseDateKey(config.startDate);
  const rangeEnd = addMonths(rangeStart, config.months);
  const rows: SlotRow[] = [];
  let truncated = false;
  events.forEach((event, eventIndex) => {
    const durationMinutes = Math.round((Date.UTC(event.end.year, event.end.month - 1, event.end.day, event.end.hour, event.end.minute) - Date.UTC(event.start.year, event.start.month - 1, event.start.day, event.start.hour, event.start.minute)) / 60_000);
    for (const occurrence of eventOccurrences(event, rangeStart, rangeEnd)) {
      for (let minute = 0; minute + config.duration <= durationMinutes; minute += config.interval) {
        if (rows.length >= MAX_SLOTS) { truncated = true; break; }
        const wall = addWallMinutes(occurrence, minute);
        rows.push(makeRow(wall, event.zone, config.zones, config.duration, `ics${eventIndex}:${dayOfWeek(wall)}:${wall.hour * 60 + wall.minute}`));
      }
    }
  });
  rows.sort((a, b) => (a.start ?? Date.UTC(a.hostWall.year, a.hostWall.month - 1, a.hostWall.day)) - (b.start ?? Date.UTC(b.hostWall.year, b.hostWall.month - 1, b.hostWall.day)));
  return summarize(rows, truncated);
}

export function safeFilenameTimestamp(date = new Date()): string {
  return date.toISOString().slice(0, 16).replace(/[:T]/g, '-');
}
