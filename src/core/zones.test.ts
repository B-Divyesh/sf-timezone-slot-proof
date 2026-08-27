import { describe, expect, it } from 'vitest';
import { nextAvailableZone } from './zones';

describe('invitee zone suggestions', () => {
  it('chooses an unused default for each added invitee', () => {
    const current = ['America/New_York', 'Europe/London', 'Asia/Kolkata'];
    const candidates = ['Australia/Sydney', 'Asia/Tokyo'];
    expect(nextAvailableZone(current, candidates)).toBe('Australia/Sydney');
    expect(nextAvailableZone([...current, 'Australia/Sydney'], candidates)).toBe('Asia/Tokyo');
  });

  it('does not offer a duplicate when defaults have already been selected', () => {
    expect(nextAvailableZone(['Australia/Sydney', 'Asia/Tokyo'], ['Australia/Sydney', 'Asia/Tokyo'])).toBeUndefined();
  });
});
