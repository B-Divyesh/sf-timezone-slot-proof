/** Choose a suggested invitee zone that is not already in the current proof. */
export function nextAvailableZone(currentZones: readonly string[], candidates: readonly string[]): string | undefined {
  const used = new Set(currentZones);
  return candidates.find((zone) => !used.has(zone));
}
