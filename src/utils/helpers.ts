/** Clamp a number between min and max */
export const clamp = (val: number, min: number, max: number): number =>
  Math.min(Math.max(val, min), max);

/** Convert brightness (0–255) to percentage (0–100) */
export const brightnessToPercent = (val: number): number => Math.round((val / 255) * 100);

/** Convert an RGB tuple to an rgba() glow string */
export const rgbToGlow = (rgb: [number, number, number], intensity = 0.15): string =>
  `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${intensity})`;

/** Debounce wrapper for slider service calls */
export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  ms: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};
