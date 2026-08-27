import type { IcsEvent, WallTime } from '../types';

const dayMap: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };

function unfold(text: string): string[] {
  return text.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '').split('\n');
}

function parseCalendarDate(value: string): WallTime {
  const clean = value.replace(/Z$/, '');
  const match = clean.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?$/);
  if (!match) throw new Error('All-day or malformed dates are not availability windows. Use timed DTSTART and DTEND values.');
  return {
    year: Number(match[1]), month: Number(match[2]), day: Number(match[3]),
    hour: Number(match[4]), minute: Number(match[5]), second: Number(match[6] ?? 0),
  };
}

function readProperty(lines: string[], name: string): { value: string; zone?: string } | undefined {
  const line = lines.find((item) => item.toUpperCase().startsWith(`${name}:`) || item.toUpperCase().startsWith(`${name};`));
  if (!line) return undefined;
  const colon = line.indexOf(':');
  const head = line.slice(0, colon);
  const value = line.slice(colon + 1).trim();
  const zone = head.match(/TZID=([^;:]+)/i)?.[1]?.replace(/^"|"$/g, '');
  return { value, zone };
}

function unescapeText(value: string): string {
  return value.replace(/\\n/gi, ' ').replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\\\/g, '\\');
}

export function parseIcs(text: string): IcsEvent[] {
  if (!text.includes('BEGIN:VCALENDAR')) throw new Error('This file is not an iCalendar file (VCALENDAR is missing).');
  const lines = unfold(text);
  const groups: string[][] = [];
  let current: string[] | null = null;
  for (const line of lines) {
    if (/^BEGIN:(VEVENT|AVAILABLE)$/i.test(line)) current = [];
    else if (/^END:(VEVENT|AVAILABLE)$/i.test(line) && current) { groups.push(current); current = null; }
    else if (current) current.push(line);
  }
  if (!groups.length) throw new Error('No VEVENT or AVAILABLE windows were found in this file.');

  return groups.map((group, index) => {
    const dtStart = readProperty(group, 'DTSTART');
    const dtEnd = readProperty(group, 'DTEND');
    if (!dtStart || !dtEnd) throw new Error(`Availability window ${index + 1} needs both DTSTART and DTEND.`);
    const start = parseCalendarDate(dtStart.value);
    const end = parseCalendarDate(dtEnd.value);
    const wallDuration = Date.UTC(end.year, end.month - 1, end.day, end.hour, end.minute) - Date.UTC(start.year, start.month - 1, start.day, start.hour, start.minute);
    if (wallDuration <= 0) throw new Error(`Availability window ${index + 1} must end after it starts.`);
    if (dtStart.zone && dtEnd.zone && dtStart.zone !== dtEnd.zone) throw new Error(`Availability window ${index + 1} must use the same timezone for DTSTART and DTEND.`);
    const isUtc = dtStart.value.endsWith('Z');
    const zone = isUtc ? 'UTC' : (dtStart.zone ?? dtEnd.zone ?? 'UTC');
    const ruleText = readProperty(group, 'RRULE')?.value;
    let rrule: IcsEvent['rrule'];
    if (ruleText) {
      const values: Record<string, string> = Object.fromEntries(ruleText.split(';').map((part) => {
        const [key, value = ''] = part.split('=');
        return [key?.toUpperCase(), value];
      }));
      if (values.FREQ !== 'WEEKLY') throw new Error('Only weekly recurring availability is supported. Export one-off windows for other recurrence patterns.');
      const recurrenceInterval = Number(values.INTERVAL || 1);
      if (!Number.isInteger(recurrenceInterval) || recurrenceInterval < 1) throw new Error('The weekly recurrence interval must be a positive whole number.');
      rrule = {
        freq: 'WEEKLY',
        interval: recurrenceInterval,
        byDay: (values.BYDAY?.split(',') ?? []).map((day: string) => dayMap[day.slice(-2)]).filter((day: number | undefined): day is number => day !== undefined),
        count: values.COUNT ? Number(values.COUNT) : undefined,
        until: values.UNTIL ? Date.parse(`${values.UNTIL.slice(0, 4)}-${values.UNTIL.slice(4, 6)}-${values.UNTIL.slice(6, 8)}T${values.UNTIL.slice(9, 11) || '23'}:${values.UNTIL.slice(11, 13) || '59'}:00Z`) : undefined,
      };
    }
    return {
      summary: unescapeText(readProperty(group, 'SUMMARY')?.value || `Window ${index + 1}`),
      zone, start, end,
      utcStart: isUtc ? Date.UTC(start.year, start.month - 1, start.day, start.hour, start.minute, start.second) : undefined,
      utcEnd: isUtc ? Date.UTC(end.year, end.month - 1, end.day, end.hour, end.minute, end.second) : undefined,
      rrule,
    };
  });
}
