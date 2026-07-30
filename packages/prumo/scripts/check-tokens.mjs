// packages/prumo/scripts/check-tokens.mjs
// Converte a paleta do Prumo (hex) para OKLCH e verifica contraste WCAG AA.
// Uso: node scripts/check-tokens.mjs

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function srgbToLinear(c) {
  const cs = c / 255;
  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]) {
  const [rl, gl, bl] = [r, g, b].map(srgbToLinear);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (light + 0.05) / (dark + 0.05);
}

function hexToOklch(hex) {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear);

  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  const C = Math.sqrt(a * a + bb * bb);
  let H = (Math.atan2(bb, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`;
}

const AA_NORMAL = 4.5;
const AA_LARGE = 3.0;

// [label, foreground hex, background hex, limiar WCAG]
const pairs = [
  ['ink on paper (body text)', '#121110', '#FFFFFF', AA_NORMAL],
  ['ink on paper-dim (muted surface)', '#121110', '#F1EFE9', AA_NORMAL],
  ['ink-soft on paper (muted-foreground)', '#4A4744', '#FFFFFF', AA_NORMAL],
  ['ink-soft on paper-dim', '#4A4744', '#F1EFE9', AA_NORMAL],
  ['ink on yellow (primary fill text)', '#121110', '#F2C318', AA_NORMAL],
  ['paper on red (destructive fill text)', '#FFF8EE', '#C8371D', AA_NORMAL],
  ['paper on success fill text', '#FFF8EE', '#2F5233', AA_NORMAL],
  ['paper on warning fill text', '#FFF8EE', '#8A4A16', AA_NORMAL],
  ['paper on info fill text', '#FFF8EE', '#2E4C6D', AA_NORMAL],
  ['red focus ring on paper (UI, not text)', '#C8371D', '#FFFFFF', AA_LARGE],
  ['red focus ring on yellow (UI, not text)', '#C8371D', '#F2C318', AA_LARGE],
  ['ink border on paper (UI, not text)', '#121110', '#FFFFFF', AA_LARGE],
];

let allPass = true;
console.log('# Contrast report\n');
for (const [label, fg, bg, threshold] of pairs) {
  const ratio = contrastRatio(fg, bg);
  const pass = ratio >= threshold;
  if (!pass) allPass = false;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${ratio.toFixed(2)}:1  (need ${threshold}:1)  ${label}`);
}

console.log('\n# OKLCH values\n');
const swatches = {
  'paper (background/card/popover)': '#FFFFFF',
  'paper-dim (muted/secondary surface)': '#F1EFE9',
  'ink (foreground/border/ring-base)': '#121110',
  'ink-soft (muted-foreground)': '#4A4744',
  'accent yellow (primary)': '#F2C318',
  'accent yellow-ink (text on primary)': '#121110',
  'accent red (destructive + focus)': '#C8371D',
  'accent red-ink (text on destructive)': '#FFF8EE',
  'success': '#2F5233',
  'success-ink': '#FFF8EE',
  'warning': '#8A4A16',
  'warning-ink': '#FFF8EE',
  'info': '#2E4C6D',
  'info-ink': '#FFF8EE',
};
for (const [label, hex] of Object.entries(swatches)) {
  console.log(`${label.padEnd(32)} ${hex}  ${hexToOklch(hex)}`);
}

console.log(`\nAll pairs passed: ${allPass}`);
if (!allPass) process.exit(1);
