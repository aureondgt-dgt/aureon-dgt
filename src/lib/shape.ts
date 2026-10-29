// Shared geometry for the Aureon "A" mark (used by both the 3D scene and SVG logo)
export type Pt = [number, number];

// Outer silhouette: apex, bottom-right, bottom notch, bottom-left
export const OUTER: Pt[] = [
  [0, 1.3],
  [1.38, -1.08],
  [0, -0.76],
  [-1.38, -1.08],
];

// Inner triangular hole
export const HOLE: Pt[] = [
  [0, 0.4],
  [0.6, -0.62],
  [0, -0.5],
  [-0.6, -0.62],
];

export const OUTER_R = 0.26;
export const HOLE_R = 0.09;

type Seg = { start: Pt; ctrl: Pt; end: Pt };

/** Compute rounded-corner segments for a closed polygon */
export function roundedSegments(pts: Pt[], r: number): Seg[] {
  const n = pts.length;
  const segs: Seg[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const d1 = Math.hypot(p0[0] - p1[0], p0[1] - p1[1]);
    const d2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const rr = Math.min(r, d1 / 2.2, d2 / 2.2);
    const start: Pt = [p1[0] + ((p0[0] - p1[0]) / d1) * rr, p1[1] + ((p0[1] - p1[1]) / d1) * rr];
    const end: Pt = [p1[0] + ((p2[0] - p1[0]) / d2) * rr, p1[1] + ((p2[1] - p1[1]) / d2) * rr];
    segs.push({ start, ctrl: p1, end });
  }
  return segs;
}

/** SVG path data string for the logo, fitted into a 100x100 box */
export function logoSvgPath(): string {
  const map = ([x, y]: Pt): string => `${(50 + x * 33).toFixed(2)} ${(52 - y * 33).toFixed(2)}`;
  const toD = (pts: Pt[], r: number) => {
    const segs = roundedSegments(pts, r);
    let d = `M ${map(segs[0].start)} `;
    segs.forEach((s, i) => {
      if (i > 0) d += `L ${map(s.start)} `;
      d += `Q ${map(s.ctrl)} ${map(s.end)} `;
    });
    return d + "Z";
  };
  return `${toD(OUTER, OUTER_R)} ${toD(HOLE, HOLE_R)}`;
}
