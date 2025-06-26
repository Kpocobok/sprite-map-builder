/**
 * Перевод цвета из hex в 16-ричное число для pixi
 * @param hex цвета в формате HEX
 * @returns число для pixi
 */
export const hexToPixiColor = (hex: string): number => {
  const cleaned = hex.replace(/^#/, '');
  // Парсим строку как 16-ричное число
  return parseInt(cleaned, 16);
};

/**
 * Обратная трансформация из pixi цвета в HEX
 * @param color 16-ричное число цвета pixi
 * @returns строка HEX цвета
 */
export const pixiColorToHEX = (color: number): string => {
  return '#' + color.toString(16).padStart(6, '0');
};

/**
 * Перевод из HEX в RGBA (с альфа каналом)
 * @param hex текст цвета HEX
 * @returns текст в формате rgba(R, G, B, alpha)
 */
export const hexToRgba = (hex: string): string => {
  let cleaned = hex.replace(/^#/, '');

  if (cleaned.length === 3 || cleaned.length === 4) {
    // расширяем короткий формат #rgb / #rgba → #rrggbb / #rrggbbaa
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }

  if (cleaned.length === 6) cleaned += 'ff'; // без альфы → добавим прозрачность по умолчанию

  if (cleaned.length !== 8) {
    throw new Error('Invalid hex color format');
  }

  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  const a = parseInt(cleaned.slice(6, 8), 16) / 255;

  return `rgba(${r},${g},${b},${a})`;
};

/**
 * Перевод из RGBA в текст HEX
 * @param r number - R канал
 * @param g number - G канал
 * @param b number - B канал
 * @param a number - альфа канал
 * @returns строка в HEX
 */
export const rgbaToHex = (
  r: number,
  g: number,
  b: number,
  a: number = 1,
): string => {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');

  return '#' + toHex(r) + toHex(g) + toHex(b) + toHex(a * 255);
};
