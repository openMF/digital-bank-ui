export function escapeRegexPattern(value?: string): string {
  if (!value) {
    return '';
  }

  return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
