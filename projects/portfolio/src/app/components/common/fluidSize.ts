/** Fluid font-size clamp string that scales between a mobile floor and a desktop ceiling. */
export function fluidSize(minPx: number, maxPx: number, vw: number = 4): string {
  return `clamp(${minPx}px, ${vw}vw, ${maxPx}px)`;
}
