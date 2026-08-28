import './styles.css';
import type { IcsEvent, ProofConfig, ProofResult, WeeklyWindow } from './types';
import { decodeConfig, downloadText, encodeConfig, resultToCsv } from './core/export';
import { parseIcs } from './core/ics';
import { generateIcs, generateWeekly, safeFilenameTimestamp } from './core/schedule';
import { isValidZone } from './core/timezone';
import { nextAvailableZone } from './core/zones';

type Filter = 'all' | 'changes' | 'problems';

const fallbackZones = ['UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Toronto', 'America/Sao_Paulo', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Africa/Johannesburg', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney', 'Pacific/Auckland'];
const allZones: string[] = typeof Intl.supportedValuesOf === 'function' ? Intl.supportedValuesOf('timeZone') : fallbackZones;
const suggestedInviteeZones = ['Australia/Sydney', 'Asia/Tokyo', 'Europe/Paris', 'America/Los_Angeles', 'Africa/Johannesburg', 'Pacific/Auckland', 'America/Sao_Paulo'];
const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let windows: WeeklyWindow[] = [{ id: crypto.randomUUID(), days: [1, 2, 3, 4, 5], start: '09:00', end: '17:00' }];
let inviteeZones = ['America/New_York', 'Europe/London', 'Asia/Kolkata'];
let icsEvents: IcsEvent[] = [];
let icsName = '';
let result: ProofResult | null = null;
let lastConfig: ProofConfig | null = null;
let currentFilter: Filter = 'changes';
let page = 0;
const pageSize = 100;
const demoConfig: ProofConfig = {
  hostZone: 'America/New_York', zones: ['Europe/London', 'Asia/Kolkata', 'Australia/Sydney', 'Asia/Tokyo', 'America/Sao_Paulo'],
  startDate: '2026-08-01', months: 18, duration: 30, interval: 30,
  windows: [{ id: 'demo-sunday', days: [0], start: '01:30', end: '02:30' }],
};
let demoMode = false;

const $ = <T extends Element>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
};

const form = $<HTMLFormElement>('#proof-form');
const hostZone = $<HTMLInputElement>('#host-zone');
const startDate = $<HTMLInputElement>('#start-date');
const duration = $<HTMLSelectElement>('#duration');
const interval = $<HTMLSelectElement>('#interval');
const windowList = $<HTMLDivElement>('#windows');
const zoneList = $<HTMLDivElement>('#zones');
const resultsElement = $<HTMLDivElement>('#results');
const emptyResults = $<HTMLDivElement>('#empty-results');

function escapeHtml(value: unknown): string {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]!);
}

function todayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function browserZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}

function renderTimezones(): void {
  const list = $('#timezone-list');
  list.innerHTML = [...new Set(['UTC', ...allZones])].map((zone) => `<option value="${escapeHtml(zone)}"></option>`).join('');
}

function renderWindows(): void {
  windowList.innerHTML = windows.map((window, index) => `
    <div class="window-row" data-window="${escapeHtml(window.id)}">
      <div class="window-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</div>
      <fieldset class="day-picker">
        <legend>Days for window ${index + 1}</legend>
        ${dayLabels.map((day, dayIndex) => `<label><input type="checkbox" data-day="${dayIndex}" ${window.days.includes(dayIndex) ? 'checked' : ''} /><span>${day}</span></label>`).join('')}
      </fieldset>
      <div class="time-pair">
        <label><span>From</span><input type="time" data-time="start" value="${window.start}" required /></label>
        <span aria-hidden="true">→</span>
        <label><span>Until</span><input type="time" data-time="end" value="${window.end}" required /></label>
      </div>
      <button class="icon-button remove-window" type="button" aria-label="Remove window ${index + 1}" ${windows.length === 1 ? 'disabled' : ''}>×</button>
    </div>`).join('');
}

function renderZones(): void {
  zoneList.innerHTML = inviteeZones.map((zone, index) => `
    <div class="zone-row">
      <span class="zone-number">${index + 1}</span>
      <label class="sr-only" for="zone-${index}">Invitee zone ${index + 1}</label>
      <input id="zone-${index}" class="zone-input" data-zone-index="${index}" list="timezone-list" value="${escapeHtml(zone)}" autocomplete="off" spellcheck="false" required />
      <button class="icon-button remove-zone" type="button" data-zone-index="${index}" aria-label="Remove ${escapeHtml(zone)}" ${inviteeZones.length === 1 ? 'disabled' : ''}>×</button>
    </div>`).join('');
  $('#zone-count').textContent = `${inviteeZones.length} / 5`;
  ($<HTMLButtonElement>('#add-zone')).disabled = inviteeZones.length >= 5;
}

function syncWindowState(): void {
  windowList.querySelectorAll<HTMLElement>('[data-window]').forEach((row) => {
    const item = windows.find((window) => window.id === row.dataset.window);
    if (!item) return;
    item.days = [...row.querySelectorAll<HTMLInputElement>('[data-day]:checked')].map((input) => Number(input.dataset.day));
    item.start = row.querySelector<HTMLInputElement>('[data-time="start"]')?.value ?? item.start;
    item.end = row.querySelector<HTMLInputElement>('[data-time="end"]')?.value ?? item.end;
  });
}

function syncZoneState(): void {
  inviteeZones = [...zoneList.querySelectorAll<HTMLInputElement>('.zone-input')].map((input) => input.value.trim());
}

function activeSource(): 'weekly' | 'ics' {
  return (form.elements.namedItem('source') as RadioNodeList).value as 'weekly' | 'ics';
}

function collectConfig(): ProofConfig {
  syncWindowState();
  syncZoneState();
  return {
    hostZone: hostZone.value.trim(), zones: inviteeZones, startDate: startDate.value,
    months: 18, duration: Number(duration.value), interval: Number(interval.value), windows,
  };
}

function validate(config: ProofConfig): string[] {
  const errors: string[] = [];
  if (!config.startDate) errors.push('Choose the first date to test.');
  if (activeSource() === 'weekly') {
    if (!isValidZone(config.hostZone)) errors.push(`“${config.hostZone || 'blank'}” is not a supported IANA working timezone.`);
    config.windows.forEach((window, index) => {
      if (!window.days.length) errors.push(`Choose at least one day in working window ${index + 1}.`);
      if (!window.start || !window.end || window.end <= window.start) errors.push(`Working window ${index + 1} must end later than it starts.`);
    });
  } else if (!icsEvents.length) errors.push('Choose an ICS file with at least one availability window.');
  if (!config.zones.length) errors.push('Add at least one invitee timezone.');
  config.zones.forEach((zone) => { if (!isValidZone(zone)) errors.push(`“${zone || 'blank'}” is not a supported IANA invitee timezone.`); });
  if (new Set(config.zones).size !== config.zones.length) errors.push('Each invitee timezone must be unique.');
  if (![15, 30, 45, 60, 90].includes(config.duration) || ![15, 30, 60].includes(config.interval)) errors.push('Choose a supported meeting length and start interval.');
  return errors;
}

function showErrors(errors: string[]): void {
  const element = $<HTMLDivElement>('#form-errors');
  if (!errors.length) { element.hidden = true; element.innerHTML = ''; return; }
  element.innerHTML = `<strong>Fix ${errors.length === 1 ? 'this item' : 'these items'}:</strong><ul>${errors.map((error) => `<li>${escapeHtml(error)}</li>`).join('')}</ul>`;
  element.hidden = false;
  element.focus();
}

function persist(config: ProofConfig): void {
  if (demoMode) return;
  try { localStorage.setItem('timezone-slot-proof:config', JSON.stringify(config)); } catch { /* Storage may be disabled; the tool still works. */ }
}

function cloneConfig(config: ProofConfig): ProofConfig {
  return { ...config, zones: [...config.zones], windows: config.windows.map((window) => ({ ...window, days: [...window.days] })) };
}

function filteredRows() {
  if (!result) return [];
  if (currentFilter === 'all') return result.rows;
  if (currentFilter === 'problems') return result.rows.filter((row) => row.flags.some((flag) => ['shifted', 'missing', 'ambiguous'].includes(flag)));
  return result.rows.filter((row) => row.flags.length);
}

function statusLabel(flags: string[]): string {
  if (flags.includes('missing')) return 'Missing';
  if (flags.includes('ambiguous')) return 'Repeated';
  if (flags.includes('shifted')) return 'Shifted';
  if (flags.includes('dst')) return 'Offset change';
  return 'Steady';
}

function statusClass(flags: string[]): string {
  if (flags.some((flag) => ['missing', 'ambiguous'].includes(flag))) return 'danger';
  if (flags.includes('shifted')) return 'warning';
  if (flags.includes('dst')) return 'info';
  return 'success';
}

function summaryMarkup(): string {
  if (!result || !lastConfig) return '';
  const attention = result.shifted + result.missing + result.ambiguous;
  const noRows = result.rows.length === 0;
  const state = attention || noRows ? 'review' : 'clear';
  const heading = noRows ? 'No slots were generated' : attention ? `${attention} slot${attention === 1 ? '' : 's'} need a closer look` : 'No shifted or invalid slots found';
  const selected = filteredRows();
  const pages = Math.max(1, Math.ceil(selected.length / pageSize));
  page = Math.min(page, pages - 1);
  const visible = selected.slice(page * pageSize, (page + 1) * pageSize);
  const anomalies = result.rows.filter((row) => row.flags.some((flag) => ['shifted', 'missing', 'ambiguous'].includes(flag))).slice(0, 8);
  const sourceIsIcs = activeSource() === 'ics';
  return `
    <div class="proof-header ${state}">
      <div>
        <p class="eyebrow"><span>03</span> Proof generated · ${escapeHtml(new Date(result.generatedAt).toLocaleString())}</p>
        <h2>${escapeHtml(heading)}</h2>
        <p>${result.rows.length.toLocaleString()} starts tested across ${lastConfig.zones.length} invitee zone${lastConfig.zones.length === 1 ? '' : 's'} over 18 months.</p>
      </div>
      <div class="proof-stamp"><span>${noRows ? 'Empty' : attention ? 'Review' : 'Clear'}</span><small>configuration proof</small></div>
    </div>
    ${noRows ? '<p class="limit-warning"><strong>Nothing fell inside the test range.</strong> For ICS, choose an earlier test date or export future availability. For weekly hours, check the selected days and window.</p>' : ''}
    ${result.truncated ? '<p class="limit-warning"><strong>Result capped at 30,000 starts.</strong> Narrow the working windows or increase the interval for a complete export.</p>' : ''}
    <dl class="metrics">
      <div><dt>Starts tested</dt><dd>${result.rows.length.toLocaleString()}</dd></div>
      <div><dt>Shifted</dt><dd>${result.shifted.toLocaleString()}</dd></div>
      <div><dt>Skipped</dt><dd>${result.missing.toLocaleString()}</dd></div>
      <div><dt>Repeated</dt><dd>${result.ambiguous.toLocaleString()}</dd></div>
      <div><dt>DST seams</dt><dd>${result.dstChanges.toLocaleString()}</dd></div>
    </dl>
    <div class="export-bar">
      <div><strong>Export this check</strong><span>Download every row, not just the rows below.</span></div>
      <button class="button secondary" type="button" data-action="csv">Export CSV</button>
      <button class="button secondary" type="button" data-action="copy" ${sourceIsIcs ? 'disabled title="Imported calendar contents are never put in links"' : ''}>Copy review link</button>
      <button class="button secondary" type="button" data-action="print">Print / PDF</button>
    </div>
    ${sourceIsIcs ? '<p class="share-note">Calendar-file contents stay local and are not added to review links. Export CSV to share this result.</p>' : ''}
    <section class="anomaly-ledger" aria-labelledby="ledger-title">
      <div class="subheading"><h3 id="ledger-title">Attention ledger</h3><p>${anomalies.length ? 'First flagged starts, in chronological order.' : 'No shifted, skipped, or repeated starts in this configuration.'}</p></div>
      ${anomalies.length ? `<ol>${anomalies.map((row) => {
        const changed = row.cells.filter((cell) => cell.flag === 'shifted');
        const detail = row.note || changed.map((cell) => `${cell.zone}: ${cell.note}`).join(' ');
        return `<li><span class="status ${statusClass(row.flags)}">${statusLabel(row.flags)}</span><strong>${escapeHtml(row.hostDateLabel)} · ${escapeHtml(row.hostLabel)}</strong><p>${escapeHtml(detail || 'Timezone offset boundary detected.')}</p></li>`;
      }).join('')}</ol>` : noRows ? '<div class="ledger-clear"><span aria-hidden="true">→</span> Adjust the test range or availability source, then run the proof again.</div>' : '<div class="ledger-clear"><span aria-hidden="true">✓</span> Stable wall-time projection across the selected zones.</div>'}
    </section>
    <section class="matrix" aria-labelledby="matrix-title">
      <div class="matrix-toolbar">
        <div><h3 id="matrix-title">Test matrix</h3><p>${selected.length.toLocaleString()} row${selected.length === 1 ? '' : 's'} in this view</p></div>
        <div class="filter-group" role="group" aria-label="Filter test rows">
          ${(['all', 'changes', 'problems'] as Filter[]).map((filter) => `<button type="button" data-filter="${filter}" aria-pressed="${currentFilter === filter}">${filter === 'all' ? 'All starts' : filter === 'changes' ? 'DST changes' : 'Problems'}</button>`).join('')}
        </div>
      </div>
      <div class="table-wrap" tabindex="0" aria-label="Scrollable timezone test matrix">
        <table>
          <caption>Projected booking starts. Timezone abbreviations are shown under each wall time.</caption>
          <thead><tr><th scope="col">Status</th><th scope="col">Your hours<br /><small>${escapeHtml(lastConfig.hostZone)}</small></th>${lastConfig.zones.map((zone) => `<th scope="col">${escapeHtml(zone.replace(/_/g, ' '))}</th>`).join('')}</tr></thead>
          <tbody>${visible.length ? visible.map((row) => `<tr class="row-${statusClass(row.flags)}">
            <td><span class="status ${statusClass(row.flags)}">${statusLabel(row.flags)}</span></td>
            <th scope="row"><time>${escapeHtml(row.hostDateLabel)}<strong>${escapeHtml(row.hostLabel)}</strong></time></th>
            ${lastConfig!.zones.map((zone) => {
              const cell = row.cells.find((item) => item.zone === zone);
              return cell ? `<td class="${cell.flag ? `cell-${cell.flag}` : ''}"><time>${escapeHtml(cell.dateLabel)}<strong>${escapeHtml(cell.label)}</strong><small>${escapeHtml(cell.abbreviation)}</small></time>${cell.flag ? `<span class="cell-flag">${cell.flag === 'shifted' ? '↕ shifted' : '◇ offset'}</span>` : ''}</td>` : '<td><strong>—</strong><small>invalid wall time</small></td>';
            }).join('')}
          </tr>`).join('') : `<tr><td colspan="${lastConfig.zones.length + 2}" class="no-rows">No rows match this filter.</td></tr>`}</tbody>
        </table>
      </div>
      <div class="pagination">
        <button class="button text-button" type="button" data-page="prev" ${page === 0 ? 'disabled' : ''}>← Previous</button>
        <span>Page ${page + 1} of ${pages}</span>
        <button class="button text-button" type="button" data-page="next" ${page >= pages - 1 ? 'disabled' : ''}>Next →</button>
      </div>
    </section>
    <p class="proof-caveat"><strong>What this check shows:</strong> how these booking hours appear using your browser’s current time-zone rules. Compare the CSV against your scheduler’s preview before publishing.</p>`;
}

function renderResults(focus = false): void {
  resultsElement.innerHTML = summaryMarkup();
  resultsElement.hidden = false;
  emptyResults.hidden = true;
  if (focus) {
    resultsElement.setAttribute('tabindex', '-1');
    resultsElement.focus({ preventScroll: true });
    resultsElement.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
}

function showToast(message: string): void {
  const toast = $<HTMLDivElement>('#toast');
  toast.textContent = message;
  toast.hidden = false;
  window.setTimeout(() => { toast.hidden = true; }, 3200);
}

function setButtonText(button: HTMLButtonElement, busy: boolean): void {
  button.disabled = busy;
  button.innerHTML = busy ? 'Building the check…' : 'Check booking hours <span aria-hidden="true">→</span>';
}

function runProof(focus = true): void {
  const config = collectConfig();
  const errors = validate(config);
  showErrors(errors);
  if (errors.length) return;
  try {
    result = activeSource() === 'ics' ? generateIcs(config, icsEvents) : generateWeekly(config);
    lastConfig = cloneConfig(config);
    persist(lastConfig);
    currentFilter = result.dstChanges || result.missing || result.ambiguous ? 'changes' : 'all';
    page = 0;
    renderResults(focus);
  } catch (error) {
    showErrors([error instanceof Error ? error.message : 'The booking-hours check could not be generated.']);
  }
}

async function copyLink(): Promise<void> {
  if (!lastConfig) return;
  const url = new URL(location.href);
  url.hash = `proof=${encodeConfig(lastConfig)}`;
  try {
    await navigator.clipboard.writeText(url.toString());
    showToast('Review link copied. It contains configuration only.');
  } catch {
    const input = document.createElement('textarea');
    input.value = url.toString(); document.body.append(input); input.select(); document.execCommand('copy'); input.remove();
    showToast('Review link copied.');
  }
}

async function readIcs(file: File): Promise<void> {
  const summary = $('#ics-summary');
  if (file.size > 2_000_000) { summary.textContent = 'That file is over 2 MB. Export only your availability windows and try again.'; icsEvents = []; return; }
  try {
    const text = await file.text();
    icsEvents = parseIcs(text);
    icsName = file.name;
    const zones = [...new Set(icsEvents.map((event) => event.zone))];
    if (zones.some((zone) => !isValidZone(zone))) throw new Error('The file contains an unsupported TZID. Export it again using an IANA timezone name such as America/New_York.');
    if (zones.length > 1) throw new Error('This v1 accepts one common timezone per ICS file. Export the availability windows in a single timezone and try again.');
    if (zones.length === 1) hostZone.value = zones[0]!;
    summary.innerHTML = `<strong>${escapeHtml(file.name)}</strong> · ${icsEvents.length} window${icsEvents.length === 1 ? '' : 's'} · ${zones.map(escapeHtml).join(', ')}`;
    showErrors([]);
  } catch (error) {
    icsEvents = [];
    summary.textContent = error instanceof Error ? error.message : 'This ICS file could not be read.';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  setButtonText(submit, true);
  window.setTimeout(() => {
    runProof(true);
    setButtonText(submit, false);
  }, 24);
});

windowList.addEventListener('change', syncWindowState);
windowList.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.remove-window');
  if (!button) return;
  const row = button.closest<HTMLElement>('[data-window]');
  windows = windows.filter((window) => window.id !== row?.dataset.window);
  renderWindows();
});

$('#add-window').addEventListener('click', () => {
  syncWindowState(); windows.push({ id: crypto.randomUUID(), days: [1], start: '09:00', end: '12:00' }); renderWindows();
  windowList.querySelector<HTMLElement>('[data-window]:last-child input')?.focus();
});

zoneList.addEventListener('input', syncZoneState);
zoneList.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.remove-zone');
  if (!button) return;
  syncZoneState(); inviteeZones.splice(Number(button.dataset.zoneIndex), 1); renderZones();
});

$('#add-zone').addEventListener('click', () => {
  syncZoneState();
  const nextZone = nextAvailableZone(inviteeZones, [...suggestedInviteeZones, ...allZones]);
  if (inviteeZones.length < 5 && nextZone) inviteeZones.push(nextZone);
  renderZones();
  zoneList.querySelector<HTMLInputElement>('.zone-row:last-child input')?.select();
});

form.addEventListener('change', (event) => {
  const input = event.target as HTMLInputElement;
  if (input.name === 'source') {
    const weekly = activeSource() === 'weekly';
    $<HTMLElement>('#weekly-source').hidden = !weekly;
    $<HTMLElement>('#ics-source').hidden = weekly;
  }
});

const fileInput = $<HTMLInputElement>('#ics-file');
fileInput.addEventListener('change', () => { if (fileInput.files?.[0]) void readIcs(fileInput.files[0]); });
const dropZone = $<HTMLElement>('#drop-zone');
dropZone.addEventListener('dragover', (event) => { event.preventDefault(); dropZone.classList.add('dragging'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragging'));
dropZone.addEventListener('drop', (event) => { event.preventDefault(); dropZone.classList.remove('dragging'); const file = event.dataTransfer?.files[0]; if (file) void readIcs(file); });

resultsElement.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
  if (!target || !result || !lastConfig) return;
  const filter = target.dataset.filter as Filter | undefined;
  if (filter) { currentFilter = filter; page = 0; renderResults(); return; }
  if (target.dataset.page === 'prev') { page--; renderResults(); }
  if (target.dataset.page === 'next') { page++; renderResults(); }
  if (target.dataset.action === 'csv') downloadText(`timezone-slot-proof-${safeFilenameTimestamp()}.csv`, resultToCsv(result, lastConfig), 'text/csv;charset=utf-8');
  if (target.dataset.action === 'copy') void copyLink();
  if (target.dataset.action === 'print') window.print();
});

function restore(): void {
  let config: ProofConfig | null = null;
  const shared = location.hash.match(/^#proof=(.+)$/)?.[1];
  if (shared) {
    try { config = decodeConfig(shared); showToast('Shared weekly-hours configuration loaded. Run the proof to verify it.'); }
    catch { showToast('That review link is damaged. Starting with a clean configuration.'); }
  }
  if (!config && !demoMode) {
    try { config = JSON.parse(localStorage.getItem('timezone-slot-proof:config') || 'null') as ProofConfig | null; } catch { config = null; }
  }
  hostZone.value = config?.hostZone && isValidZone(config.hostZone) ? config.hostZone : browserZone();
  startDate.value = config?.startDate || todayKey();
  if (config) {
    windows = config.windows?.length ? config.windows.map((window) => ({ ...window, id: window.id || crypto.randomUUID() })) : windows;
    inviteeZones = config.zones?.slice(0, 5) || inviteeZones;
    duration.value = String(config.duration || 30);
    interval.value = String(config.interval || 30);
  }
}

function setupDemo(focus = false): void {
  demoMode = true;
  const config = cloneConfig(demoConfig);
  hostZone.value = config.hostZone;
  startDate.value = config.startDate;
  windows = config.windows;
  inviteeZones = config.zones;
  duration.value = String(config.duration);
  interval.value = String(config.interval);
  (form.elements.namedItem('source') as RadioNodeList).value = 'weekly';
  $<HTMLElement>('#weekly-source').hidden = false;
  $<HTMLElement>('#ics-source').hidden = true;
  icsEvents = []; icsName = '';
  renderWindows(); renderZones();
  runProof(focus);
}

function routeName(): 'home' | 'demo' | 'not-found' {
  if (location.pathname === '/' || location.pathname === '/index.html') return new URLSearchParams(location.search).get('demo') === '1' ? 'demo' : 'home';
  if (location.pathname === '/demo' || location.pathname === '/demo/') return 'demo';
  return 'not-found';
}

function setRouteMetadata(route: ReturnType<typeof routeName>): void {
  const title = route === 'demo' ? 'Demo — Timezone Slot Proof' : route === 'not-found' ? 'Page not found — Timezone Slot Proof' : 'Timezone Slot Proof — Check booking hours';
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', route === 'demo' ? 'Try a five-zone daylight-saving booking-hours check with sample data.' : route === 'not-found' ? 'This Timezone Slot Proof page does not exist.' : 'Check booking hours in five time zones before daylight saving changes surprise a client.');
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://timezone-slot-proof.sociobot.in${route === 'demo' ? '/demo' : route === 'not-found' ? '/404' : '/'}`);
}

function renderNotFound(): void {
  const main = $<HTMLElement>('#main');
  main.innerHTML = `<section class="not-found"><p class="eyebrow"><span>00</span> Missing route</p><h1 id="not-found-title" tabindex="-1">Page not found</h1><p>This page is not part of the booking-hours check.</p><a class="button primary" href="/">Go to the home page</a></section>`;
  const title = $<HTMLElement>('#not-found-title');
  title.focus();
  $('#route-announcement').textContent = 'Page not found';
}

function initializeRoute(): void {
  const route = routeName();
  setRouteMetadata(route);
  if (route === 'not-found') { renderNotFound(); return; }
  if (route === 'demo') {
    $<HTMLElement>('#demo-banner').hidden = false;
    setupDemo(false);
    $<HTMLElement>('#hero-title').focus();
    $('#route-announcement').textContent = 'Demo loaded';
  }
}

function updateConnection(): void {
  $<HTMLElement>('#connection-status').hidden = navigator.onLine;
}

demoMode = routeName() === 'demo';
renderTimezones(); restore(); renderWindows(); renderZones(); initializeRoute(); updateConnection();
window.addEventListener('online', updateConnection);
window.addEventListener('offline', updateConnection);
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data?.type === 'offline-shell-cached') document.documentElement.dataset.offlineReady = 'true';
  });
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js').then(async (registration) => {
      await navigator.serviceWorker.ready;
      const urls = [location.pathname, import.meta.url, ...performance.getEntriesByType('resource').map((entry) => entry.name)]
        .filter((url) => new URL(url, location.href).origin === location.origin);
      registration.active?.postMessage({ type: 'cache-runtime', urls });
    });
  });
}

$('#reset-demo').addEventListener('click', () => { setupDemo(true); showToast('Sample check reset.'); });
$('#start-real').addEventListener('click', () => { location.assign('/'); });

window.addEventListener('popstate', () => {
  const route = routeName();
  if (route === 'demo') { $<HTMLElement>('#demo-banner').hidden = false; setupDemo(false); }
  else if (route === 'home') { location.reload(); }
  else renderNotFound();
});

void icsName;
