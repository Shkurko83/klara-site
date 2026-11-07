const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export function formatDate(date: Date) {
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/** plural(5, ['минута', 'минуты', 'минут']) → «минут». */
export function plural(count: number, forms: [string, string, string]) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

/** Время чтения взрослым: около 180 слов в минуту для текста с примерами. */
export function readingMinutes(markdown: string) {
  const words = markdown.replace(/[#>*_`\-\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 180));
}

export function readingTimeLabel(markdown: string) {
  const minutes = readingMinutes(markdown);
  return `${minutes} ${plural(minutes, ['минута', 'минуты', 'минут'])} чтения`;
}
