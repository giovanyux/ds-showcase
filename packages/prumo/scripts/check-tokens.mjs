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
  ['light: foreground on background', '#2B1410', '#FFFBF7', AA_NORMAL],
  ['light: card-foreground on card', '#2B1410', '#FFFFFF', AA_NORMAL],
  ['light: primary-foreground on primary', '#FFFBF7', '#5F2016', AA_NORMAL],
  ['light: secondary-foreground on secondary', '#2B1410', '#F5EDE7', AA_NORMAL],
  ['light: muted-foreground on background', '#7A5C50', '#FFFBF7', AA_NORMAL],
  ['light: muted-foreground on muted', '#7A5C50', '#F5EDE7', AA_NORMAL],
  ['light: destructive-foreground on destructive', '#FFFFFF', '#B3261E', AA_NORMAL],
  ['light: success-foreground on success', '#FFFFFF', '#3F6249', AA_NORMAL],
  ['light: warning-foreground on warning', '#2B1410', '#B8752B', AA_NORMAL],
  ['light: info-foreground on info', '#FFFFFF', '#186A99', AA_NORMAL],
  ['light: primary on background (ring/link)', '#5F2016', '#FFFBF7', AA_LARGE],
  ['dark: foreground on background', '#F5E9E2', '#1C120F', AA_NORMAL],
  ['dark: card-foreground on card', '#F5E9E2', '#2B1D18', AA_NORMAL],
  ['dark: primary-foreground on primary', '#1C120F', '#FB876E', AA_NORMAL],
  ['dark: secondary-foreground on secondary', '#F5E9E2', '#33251F', AA_NORMAL],
  ['dark: muted-foreground on background', '#B99C8F', '#1C120F', AA_NORMAL],
  ['dark: muted-foreground on muted', '#B99C8F', '#33251F', AA_NORMAL],
  ['dark: destructive-foreground on destructive', '#1C120F', '#E5776D', AA_NORMAL],
  ['dark: success-foreground on success', '#1C120F', '#7FAE8B', AA_NORMAL],
  ['dark: warning-foreground on warning', '#1C120F', '#E0A857', AA_NORMAL],
  ['dark: info-foreground on info', '#1C120F', '#6CC3EE', AA_NORMAL],
  ['dark: primary on background (ring/link)', '#FB876E', '#1C120F', AA_LARGE],
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
  'light bg': '#FFFBF7',
  'light fg': '#2B1410',
  'light card': '#FFFFFF',
  'light primary': '#5F2016',
  'light secondary/muted/accent': '#F5EDE7',
  'light muted-fg': '#7A5C50',
  'light destructive': '#B3261E',
  'light success': '#3F6249',
  'light warning': '#B8752B',
  'light info': '#186A99',
  'light border/input': '#E8DDD4',
  'light sky (decorative)': '#219FDD',
  'light coral (decorative)': '#FB876E',
  'dark bg': '#1C120F',
  'dark fg': '#F5E9E2',
  'dark card/popover': '#2B1D18',
  'dark primary': '#FB876E',
  'dark secondary/accent': '#33251F',
  'dark muted-fg': '#B99C8F',
  'dark destructive': '#E5776D',
  'dark success': '#7FAE8B',
  'dark warning': '#E0A857',
  'dark info': '#6CC3EE',
};
for (const [label, hex] of Object.entries(swatches)) {
  console.log(`${label.padEnd(32)} ${hex}  ${hexToOklch(hex)}`);
}

console.log(`\nAll pairs passed: ${allPass}`);
if (!allPass) process.exit(1);
