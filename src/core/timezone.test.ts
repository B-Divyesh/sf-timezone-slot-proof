import { describe, expect, it } from 'vitest';
import { offsetMinutes, resolveWallTime, zonedParts } from './timezone';

describe('timezone wall-time resolution', () => {
  it('detects the New York spring-forward gap', () => {
    expect(resolveWallTime({ year: 2026, month: 3, day: 8, hour: 2, minute: 30 }, 'America/New_York')).toHaveLength(0);
  });

  it('detects both instants in the New York fall-back fold', () => {
    const instants = resolveWallTime({ year: 2026, month: 11, day: 1, hour: 1, minute: 30 }, 'America/New_York');
    expect(instants).toHaveLength(2);
    expect(instants[1]! - instants[0]!).toBe(3_600_000);
  });

  it('projects an instant to Kolkata without a fixed-offset table', () => {
    const epoch = Date.parse('2026-06-01T12:00:00Z');
    expect(zonedParts(epoch, 'Asia/Kolkata')).toMatchObject({ hour: 17, minute: 30 });
    expect(offsetMinutes(epoch, 'Asia/Kolkata')).toBe(330);
  });
});
