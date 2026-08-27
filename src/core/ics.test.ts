import { describe, expect, it } from 'vitest';
import { parseIcs } from './ics';
import { generateIcs } from './schedule';

const calendar = `BEGIN:VCALENDAR\r
VERSION:2.0\r
BEGIN:VEVENT\r
DTSTART;TZID=America/New_York:20260302T090000\r
DTEND;TZID=America/New_York:20260302T110000\r
RRULE:FREQ=WEEKLY;BYDAY=MO,WE;COUNT=4\r
SUMMARY:Client hours\r
END:VEVENT\r
END:VCALENDAR`;

describe('ICS availability import', () => {
  it('parses weekly TZID availability without uploading it', () => {
    const events = parseIcs(calendar);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ zone: 'America/New_York', summary: 'Client hours' });
    expect(events[0]?.rrule?.byDay).toEqual([1, 3]);
  });

  it('expands imported windows into meeting starts', () => {
    const events = parseIcs(calendar);
    const proof = generateIcs({
      hostZone: 'America/New_York', zones: ['Europe/London'], startDate: '2026-03-01', months: 2,
      duration: 30, interval: 30, windows: [],
    }, events);
    expect(proof.rows).toHaveLength(16);
  });

  it('rejects daily recurrence honestly', () => {
    expect(() => parseIcs(calendar.replace('FREQ=WEEKLY', 'FREQ=DAILY'))).toThrow(/Only weekly/);
  });
});
