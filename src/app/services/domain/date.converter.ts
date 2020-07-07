

export interface FimsDate {
  year: number;
  month: number;
  day: number;
}

export function dateAsISOString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function todayAsISOString(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Converts '2017-01-20' to full ISO string e.g. '2017-01-20T00:00:00.000Z'
 * @param dateString
 */
export function toLongISOString(dateString: string): string {
  const date: Date = parseDate(dateString);
  return date.toISOString();
}

export function toShortISOString(dateString: string): string {
  return `${toLongISOString(dateString).slice(0, 10)}Z`;
}

export function toEndOfDay(dateString: string): string {
  const date: Date = parseDate(dateString);

  date.setDate(date.getDate() + 1);
  date.setTime(date.getTime() - 1);

  return date.toISOString();
}

export function addCurrentTime(date: Date): Date {
  const now: Date = new Date();

  date.setUTCHours(now.getUTCHours());
  date.setUTCMinutes(now.getUTCMinutes());
  date.setUTCSeconds(now.getUTCSeconds());
  date.setUTCMilliseconds(now.getUTCMilliseconds());

  return date;
}

export function parseDate(dateString: string): Date {
  const millis = Date.parse(dateString);
  const date: Date = new Date(millis);

  return date;
}

/**
 * Converts '2017-01-20' to FimsDate
 * @param dateString
 */
export function toFimsDate(dateString: string): FimsDate {
  const chunks: string[] = dateString ? dateString.split('-') : [];

  return {
    year: chunks.length ? Number(chunks[0]) : undefined,
    month: chunks.length ? Number(chunks[1]) : undefined,
    day: chunks.length ? Number(chunks[2]) : undefined,
  };
}

export function toISOString(fimsDate: FimsDate): string {
  return formatDate(fimsDate.year, fimsDate.month, fimsDate.day);
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${addZero(month)}-${addZero(day)}`;
}

function addZero(value: number): string {
  return ('0' + value).slice(-2);
}


