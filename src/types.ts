export interface WallTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second?: number;
}

export interface WeeklyWindow {
  id: string;
  days: number[];
  start: string;
  end: string;
}

export interface ProofConfig {
  hostZone: string;
  zones: string[];
  startDate: string;
  months: number;
  duration: number;
  interval: number;
  windows: WeeklyWindow[];
}

export interface IcsEvent {
  summary: string;
  zone: string;
  start: WallTime;
  end: WallTime;
  utcStart?: number;
  utcEnd?: number;
  rrule?: {
    freq: 'WEEKLY';
    interval: number;
    byDay: number[];
    until?: number;
    count?: number;
  };
}

export type FlagKind = 'shifted' | 'missing' | 'ambiguous' | 'dst';

export interface ZoneCell {
  zone: string;
  label: string;
  dateLabel: string;
  minuteOfDay: number;
  offset: number;
  abbreviation: string;
  flag?: FlagKind;
  note?: string;
}

export interface SlotRow {
  id: string;
  start: number | null;
  end: number | null;
  hostWall: WallTime;
  hostLabel: string;
  hostDateLabel: string;
  sourceKey: string;
  flags: FlagKind[];
  cells: ZoneCell[];
  note?: string;
}

export interface ProofResult {
  rows: SlotRow[];
  shifted: number;
  missing: number;
  ambiguous: number;
  dstChanges: number;
  generatedAt: string;
  truncated: boolean;
}
