import { describe, expect, it } from 'vitest';
import type { ProofConfig } from '../types';
import { generateWeekly } from './schedule';

function config(overrides: Partial<ProofConfig> = {}): ProofConfig {
  return {
    hostZone: 'Europe/London',
    zones: ['America/New_York'],
    startDate: '2026-02-22',
    months: 3,
    duration: 30,
    interval: 30,
    windows: [{ id: 'sun', days: [0], start: '15:00', end: '15:30' }],
    ...overrides,
  };
}

describe('18-month proof generation', () => {
  it('flags invitee wall-time shifts while US and UK DST dates differ', () => {
    const proof = generateWeekly(config());
    const shifted = proof.rows.filter((row) => row.flags.includes('shifted'));
    expect(shifted).toHaveLength(2);
    expect(shifted.map((row) => row.hostDateLabel)).toEqual(expect.arrayContaining([
      expect.stringContaining('Mar 8'), expect.stringContaining('Mar 29'),
    ]));
  });

  it('flags an intentionally missing host slot in the spring gap', () => {
    const proof = generateWeekly(config({
      hostZone: 'America/New_York',
      zones: ['UTC'],
      windows: [{ id: 'gap', days: [0], start: '02:30', end: '03:00' }],
    }));
    expect(proof.missing).toBe(1);
    expect(proof.rows.find((row) => row.flags.includes('missing'))?.hostDateLabel).toContain('Mar 8');
  });

  it('flags an intentionally repeated host slot in the fall fold', () => {
    const proof = generateWeekly(config({
      hostZone: 'America/New_York',
      zones: ['UTC'],
      startDate: '2026-10-25',
      windows: [{ id: 'fold', days: [0], start: '01:30', end: '02:00' }],
    }));
    expect(proof.ambiguous).toBe(1);
    expect(proof.rows.find((row) => row.flags.includes('ambiguous'))?.hostDateLabel).toContain('Nov 1');
  });

  it('uses 18 months and emits only starts that fit meeting length', () => {
    const proof = generateWeekly(config({
      months: 18,
      hostZone: 'UTC',
      zones: ['Asia/Kolkata'],
      startDate: '2026-01-01',
      duration: 60,
      interval: 30,
      windows: [{ id: 'monday', days: [1], start: '09:00', end: '10:30' }],
    }));
    expect(proof.rows.length).toBeGreaterThanOrEqual(154);
    expect(proof.rows.length).toBeLessThanOrEqual(160);
  });
});
