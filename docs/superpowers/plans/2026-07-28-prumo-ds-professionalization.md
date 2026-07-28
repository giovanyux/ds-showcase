# Prumo — Reforma de Identidade e Profundidade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reformar a identidade visual do Prumo (`packages/prumo`) com a paleta extraída do portfólio pessoal do usuário (oxblood/pêssego/sky), corrigir a dívida de contraste conhecida, adicionar uma narrativa de case study na landing, e aprofundar a documentação de um subconjunto "vitrine" de componentes no Storybook.

**Architecture:** Reforma sequenciada em 4 fases que tocam camadas diferentes do pacote `packages/prumo` (Next.js 16 + Tailwind v4 + shadcn/ui + Base UI + Storybook 10): (1) tokens de design em `globals.css` + tipografia, (2) landing (`app/page.tsx`) + novo componente de narrativa, (3) documentação MDX no Storybook, (4) verificação. Cada fase termina em um estado buildable e revisável — nenhuma fase deixa o Storybook quebrado para a próxima.

**Tech Stack:** Next.js 16, Tailwind CSS v4 (tokens via CSS custom properties em OKLCH), shadcn/ui, Base UI (`@base-ui/react`), Storybook 10 (`@storybook/nextjs-vite`, addon-a11y, addon-vitest), Vitest 4 + Playwright (testes de browser dos stories), Node.js (script de tokens, sem dependências externas).

## Global Constraints

- Nenhuma dependência nova é instalada exceto as fontes do Google via `next/font/google` (já é o mecanismo usado para Inter/JetBrains Mono — sem pacote npm adicional).
- Todo par texto/fundo definido como token precisa fechar WCAG AA (≥4.5:1 texto normal, ≥3:1 texto grande/UI) — validado pelo script da Task 1, não por inspeção visual.
- A arquitetura de tokens existente (CSS custom properties em OKLCH, blocos `:root`/`.dark`, `@theme inline`) é mantida — só os valores mudam, não o padrão.
- Conteúdo novo (narrativa, MDX) é escrito em português, seguindo o tom já usado no resto do Storybook (`Button.mdx`, `Card.mdx`).
- Nenhuma pesquisa de usuário, teste de usabilidade ou processo que não ocorreu é mencionado em qualquer texto novo — a narrativa é ancorada em raciocínio de design real (ver spec).
- `packages/prumo` é o único pacote tocado — `packages/eixo` (se existir) e `site/` (showcase) ficam fora de escopo.

---

## File Structure

**Fase 1 — Fundação:**
- Create: `packages/prumo/scripts/check-tokens.mjs` — script de conversão hex→OKLCH e verificação de contraste WCAG, com a tabela de tokens novos embutida
- Modify: `packages/prumo/app/globals.css` — substitui paleta, radius base, shadows
- Modify: `packages/prumo/app/layout.tsx` — adiciona fonte Zen Kaku Gothic New
- Modify: `packages/prumo/stories/foundation/Colors.mdx`, `Typography.mdx`, `Radius.mdx`, `Shadows.mdx`, `Spacing.mdx` — sincroniza com os novos tokens
- Modify: `packages/prumo/README.md` — atualiza descrição da cor primária e stack
- Modify: `packages/prumo/.storybook/preview.tsx` — `a11y.test` de `'todo'` para `'error'`

**Fase 2 — Landing + narrativa:**
- Modify: `packages/prumo/app/page.tsx` — hero, princípios, amostra de tokens, rodapé
- Create: `packages/prumo/components/case-study.tsx` — seção narrativa

**Fase 3 — Documentação:**
- Create: `packages/prumo/stories/Overlays.mdx` — Dialog vs Sheet vs Drawer
- Create: `packages/prumo/stories/Select.mdx` — Select vs Combobox vs NativeSelect
- Create: `packages/prumo/stories/Table.mdx` — Table vs DataTable
- Create: `packages/prumo/stories/Field.mdx` — Form/Field
- Create: `packages/prumo/stories/Sidebar.mdx` — Sidebar

**Fase 4 — Verificação:** nenhum arquivo novo; roda os comandos de build/lint/teste do pacote.

---

## Fase 1 — Fundação

### Task 1: Script de conversão de tokens + verificação de contraste

**Files:**
- Create: `packages/prumo/scripts/check-tokens.mjs`

**Interfaces:**
- Consumes: nada (script standalone, zero dependências)
- Produces: `hexToOklch(hex)`, `contrastRatio(hex1, hex2)` — usadas apenas dentro deste script; a Task 2 consome a *saída* (os valores OKLCH impressos), não o código

- [ ] **Step 1: Criar o script com a tabela de tokens e o relatório de contraste**

```js
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
```

- [ ] **Step 2: Rodar o script e confirmar que todos os pares passam**

Run: `cd packages/prumo && node scripts/check-tokens.mjs`
Expected: todas as linhas começam com `PASS`, e a última linha é `All pairs passed: true`. Os valores OKLCH impressos são exatamente os que a Task 2 usa em `globals.css` — não recalcule à mão.

- [ ] **Step 3: Commit**

```bash
git add packages/prumo/scripts/check-tokens.mjs
git commit -m "feat(prumo): add token contrast + OKLCH conversion script"
```

---

### Task 2: Reescrever `globals.css` com a paleta oxblood/pêssego

**Files:**
- Modify: `packages/prumo/app/globals.css`

**Interfaces:**
- Consumes: os valores OKLCH impressos pela Task 1
- Produces: todas as CSS custom properties (`--background`, `--primary`, `--radius`, `--shadow-*`, `--font-display`, etc.) que a Task 3 (fonte), Fase 2 (landing) e todos os 58 componentes existentes consomem via `var()`

- [ ] **Step 1: Substituir o cabeçalho e o bloco `@theme inline`**

Substitua da linha 1 até o fechamento do bloco `@theme inline` (linha `}` antes de `/* LIGHT MODE */`) por:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

/* ============================================================
   PRUMO — Token Map (Tailwind v4 / OKLCH)
   Primary:    Oxblood → oklch(0.339 0.094 31.4)   — extraído da identidade pessoal do autor
   Neutrals:   Stone   (warm-gray)
   Semantic:   Sage(success) / Amber(warning) / Brick(destructive) / Deep sky(info)
   Radius:     10px base — cantos generosos, herdados da identidade visual de referência
   ============================================================ */

@theme inline {
  /* ── Color aliases ───────────────────────────────────────── */
  --color-background:               var(--background);
  --color-foreground:               var(--foreground);
  --color-card:                     var(--card);
  --color-card-foreground:          var(--card-foreground);
  --color-popover:                  var(--popover);
  --color-popover-foreground:       var(--popover-foreground);
  --color-primary:                  var(--primary);
  --color-primary-foreground:       var(--primary-foreground);
  --color-secondary:                var(--secondary);
  --color-secondary-foreground:     var(--secondary-foreground);
  --color-muted:                    var(--muted);
  --color-muted-foreground:         var(--muted-foreground);
  --color-accent:                   var(--accent);
  --color-accent-foreground:        var(--accent-foreground);
  --color-destructive:              var(--destructive);
  --color-destructive-foreground:   var(--destructive-foreground);
  --color-border:                   var(--border);
  --color-input:                    var(--input);
  --color-ring:                     var(--ring);

  /* ── Semantic extras ─────────────────────────────────────── */
  --color-success:                  var(--success);
  --color-success-foreground:       var(--success-foreground);
  --color-warning:                  var(--warning);
  --color-warning-foreground:       var(--warning-foreground);
  --color-info:                     var(--info);
  --color-info-foreground:          var(--info-foreground);

  /* ── Charts ──────────────────────────────────────────────── */
  --color-chart-1:                  var(--chart-1);
  --color-chart-2:                  var(--chart-2);
  --color-chart-3:                  var(--chart-3);
  --color-chart-4:                  var(--chart-4);
  --color-chart-5:                  var(--chart-5);

  /* ── Sidebar ─────────────────────────────────────────────── */
  --color-sidebar:                  var(--sidebar);
  --color-sidebar-foreground:       var(--sidebar-foreground);
  --color-sidebar-primary:          var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent:           var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border:           var(--sidebar-border);
  --color-sidebar-ring:             var(--sidebar-ring);

  /* ── Typography ──────────────────────────────────────────── */
  --font-sans:                      var(--font-sans);     /* Inter — corpo e UI densa */
  --font-display:                   var(--font-display);  /* Zen Kaku Gothic New — títulos e marketing */
  --font-mono:                      var(--font-mono);

  /* ── Radius scale ────────────────────────────────────────── */
  /* Base: 10px — cantos generosos, ecoando a identidade visual de referência (chip pill, cards) */
  --radius-none:                    0px;
  --radius-xs:                      calc(var(--radius) * 0.5);   /* 5px  */
  --radius-sm:                      calc(var(--radius) * 0.67);  /* 7px  */
  --radius-md:                      var(--radius);               /* 10px */
  --radius-lg:                      calc(var(--radius) * 1.33);  /* 13px */
  --radius-xl:                      calc(var(--radius) * 2);     /* 20px */
  --radius-2xl:                     calc(var(--radius) * 2.67);  /* 27px */
  --radius-3xl:                     calc(var(--radius) * 4);     /* 40px */
  --radius-full:                    9999px;

  /* ── Shadow scale ────────────────────────────────────────── */
  /* Multi-layer shadows tingidas de oxblood — mesma técnica anterior, tom novo */
  --shadow-xs:   0 1px 2px oklch(0.339 0.094 31.4 / 2%);
  --shadow-sm:   0 1px 3px oklch(0.339 0.094 31.4 / 4%), 0 1px 2px oklch(0 0 0 / 2%);
  --shadow-md:   0 12px 24px -4px oklch(0.339 0.094 31.4 / 8%), 0 4px 6px -2px oklch(0.339 0.094 31.4 / 3%);
  --shadow-lg:   0 20px 25px -5px oklch(0.339 0.094 31.4 / 10%), 0 10px 10px -5px oklch(0.339 0.094 31.4 / 4%);
  --shadow-xl:   0 25px 50px -12px oklch(0.339 0.094 31.4 / 15%);
  --shadow-2xl:  0 35px 60px -15px oklch(0.339 0.094 31.4 / 20%);
  --shadow-primary: 0 10px 15px -3px oklch(0.339 0.094 31.4 / 25%), 0 4px 6px -2px oklch(0.339 0.094 31.4 / 10%);

  /* ── Spacing scale ───────────────────────────────────────── */
  /* Inalterada — base 4px, todos os valores são múltiplos */
  --spacing-micro:     0.25rem;   /* 4px  — gap entre ícone e label              */
  --spacing-element:   0.5rem;    /* 8px  — gap entre elementos dentro de um comp */
  --spacing-component: 1rem;      /* 16px — gap entre componentes, padding padrão */
  --spacing-section:   1.5rem;    /* 24px — padding interno de cards e sections   */
  --spacing-layout:    2rem;      /* 32px — gap entre seções de uma página        */
  --spacing-page:      3rem;      /* 48px — padding do container principal        */

  /* ── Transitions ─────────────────────────────────────────── */
  --transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-medium: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow:   350ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

- [ ] **Step 2: Substituir o bloco `:root` (light mode)**

```css
/* ============================================================
   LIGHT MODE
   Primary Oxblood: oklch(0.339 0.094 31.4)
   Stone neutrals (warm-gray)
   ============================================================ */
:root {
  /* Surfaces */
  --background:             oklch(0.990 0.007 67.7);   /* #FFFBF7 — quase branco, tingido de quente */
  --foreground:              oklch(0.223 0.039 30.8);   /* #2B1410 */

  /* Card / Popover */
  --card:                   oklch(1 0 0);               /* #FFFFFF */
  --card-foreground:        oklch(0.223 0.039 30.8);
  --popover:                oklch(1 0 0);
  --popover-foreground:     oklch(0.223 0.039 30.8);

  /* ── PRIMARY: Oxblood — 11.96:1 sobre branco ✅ (resolve a dívida de contraste do teal anterior) ── */
  --primary:                oklch(0.339 0.094 31.4);    /* #5F2016 */
  --primary-foreground:     oklch(0.990 0.007 67.7);    /* #FFFBF7 */

  /* Secondary — stone claro */
  --secondary:              oklch(0.951 0.012 59.6);    /* #F5EDE7 */
  --secondary-foreground:   oklch(0.223 0.039 30.8);

  /* Muted — stone claro, texto em stone médio (5.22:1 sobre muted) */
  --muted:                  oklch(0.951 0.012 59.6);
  --muted-foreground:       oklch(0.502 0.044 42.8);    /* #7A5C50 */

  /* Accent — stone claro */
  --accent:                 oklch(0.951 0.012 59.6);
  --accent-foreground:      oklch(0.223 0.039 30.8);

  /* Destructive — brick red — 6.54:1 sobre branco ✅ */
  --destructive:            oklch(0.501 0.178 28.7);    /* #B3261E */
  --destructive-foreground: oklch(1 0 0);

  /* Success — sage escuro — 6.87:1 sobre branco ✅ */
  --success:                oklch(0.462 0.057 152.7);   /* #3F6249 */
  --success-foreground:     oklch(1 0 0);

  /* Warning — amber — 4.64:1 com texto escuro (branco não fecha AA nesse tom) */
  --warning:                oklch(0.621 0.121 64.3);    /* #B8752B */
  --warning-foreground:     oklch(0.223 0.039 30.8);

  /* Info — sky escurecido para fechar AA com texto branco — 5.90:1 ✅ */
  --info:                   oklch(0.501 0.105 240.1);   /* #186A99 */
  --info-foreground:        oklch(1 0 0);

  /* Borders & Inputs — stone */
  --border:                 oklch(0.904 0.017 61.9);    /* #E8DDD4 */
  --input:                  oklch(0.904 0.017 61.9);

  /* Ring — primary */
  --ring:                   oklch(0.339 0.094 31.4);

  /* Charts — paleta do gradiente de assinatura (aurora) */
  --chart-1:                oklch(0.339 0.094 31.4);    /* oxblood */
  --chart-2:                oklch(0.667 0.137 237.0);   /* sky #219FDD — só decorativo, não usar como texto */
  --chart-3:                oklch(0.462 0.057 152.7);   /* sage */
  --chart-4:                oklch(0.621 0.121 64.3);    /* amber */
  --chart-5:                oklch(0.746 0.147 33.3);    /* coral */

  /* Radius — 10px base */
  --radius:                 0.625rem;

  /* ── Sidebar ─────────────────────────────────────────────── */
  --sidebar:                oklch(0.980 0.008 56.3);    /* #FDF7F3 */
  --sidebar-foreground:     oklch(0.223 0.039 30.8);
  --sidebar-primary:        oklch(0.339 0.094 31.4);
  --sidebar-primary-foreground: oklch(0.990 0.007 67.7);
  --sidebar-accent:         oklch(0.917 0.018 59.5);    /* #EDE1D8 */
  --sidebar-accent-foreground: oklch(0.223 0.039 30.8);
  --sidebar-border:         oklch(0.917 0.018 59.5);
  --sidebar-ring:           oklch(0.339 0.094 31.4);
}
```

- [ ] **Step 3: Substituir o bloco `.dark`**

```css
/* ============================================================
   DARK MODE
   Background: quase-preto quente  #1C120F
   Primary vira Coral (do gradiente de assinatura) — oxblood puro
   ficaria escuro demais como cor de destaque sobre fundo escuro
   ============================================================ */
.dark {
  /* Surfaces */
  --background:             oklch(0.194 0.018 37.4);    /* #1C120F */
  --foreground:              oklch(0.942 0.016 52.6);    /* #F5E9E2 */

  /* Card / Popover */
  --card:                   oklch(0.247 0.024 40.5);    /* #2B1D18 */
  --card-foreground:        oklch(0.942 0.016 52.6);
  --popover:                oklch(0.247 0.024 40.5);
  --popover-foreground:     oklch(0.942 0.016 52.6);

  /* ── PRIMARY dark: Coral (do gradiente de assinatura) — 7.69:1 ✅ ── */
  --primary:                oklch(0.746 0.147 33.3);    /* #FB876E */
  --primary-foreground:     oklch(0.194 0.018 37.4);    /* #1C120F */

  /* Secondary — stone escuro */
  --secondary:              oklch(0.279 0.024 44.3);    /* #33251F */
  --secondary-foreground:   oklch(0.942 0.016 52.6);

  /* Muted */
  --muted:                  oklch(0.279 0.024 44.3);
  --muted-foreground:       oklch(0.715 0.039 45.5);    /* #B99C8F */

  /* Accent */
  --accent:                 oklch(0.279 0.024 44.3);
  --accent-foreground:      oklch(0.942 0.016 52.6);

  /* Destructive */
  --destructive:            oklch(0.692 0.138 26.6);    /* #E5776D */
  --destructive-foreground: oklch(0.194 0.018 37.4);

  /* Success */
  --success:                oklch(0.707 0.072 152.2);   /* #7FAE8B */
  --success-foreground:     oklch(0.194 0.018 37.4);

  /* Warning */
  --warning:                oklch(0.768 0.118 74.5);    /* #E0A857 */
  --warning-foreground:     oklch(0.194 0.018 37.4);

  /* Info */
  --info:                   oklch(0.779 0.104 231.7);   /* #6CC3EE */
  --info-foreground:        oklch(0.194 0.018 37.4);

  /* Borders & Inputs */
  --border:                 oklch(1 0 0 / 10%);
  --input:                  oklch(1 0 0 / 15%);

  /* Ring */
  --ring:                   oklch(0.746 0.147 33.3);

  /* Charts */
  --chart-1:                oklch(0.746 0.147 33.3);
  --chart-2:                oklch(0.779 0.104 231.7);
  --chart-3:                oklch(0.707 0.072 152.2);
  --chart-4:                oklch(0.768 0.118 74.5);
  --chart-5:                oklch(0.692 0.138 26.6);

  /* Sidebar */
  --sidebar:                oklch(0.212 0.017 37.4);    /* #201613 */
  --sidebar-foreground:     oklch(0.942 0.016 52.6);
  --sidebar-primary:        oklch(0.746 0.147 33.3);
  --sidebar-primary-foreground: oklch(0.194 0.018 37.4);
  --sidebar-accent:         oklch(0.279 0.024 44.3);
  --sidebar-accent-foreground: oklch(0.942 0.016 52.6);
  --sidebar-border:         oklch(1 0 0 / 10%);
  --sidebar-ring:           oklch(0.746 0.147 33.3);
}
```

O restante do arquivo (`@keyframes shimmer`, `.prumo-tour-popover`, `@layer base`) **não muda** — continua referenciando os tokens via `var()`, então herda a paleta nova automaticamente.

- [ ] **Step 4: Rodar o build pra confirmar que o CSS ainda é válido**

Run: `cd packages/prumo && npm run build`
Expected: build termina sem erro (avisos de lint não relacionados a CSS são aceitáveis nesta etapa)

- [ ] **Step 5: Commit**

```bash
git add packages/prumo/app/globals.css
git commit -m "feat(prumo): replace teal/slate tokens with oxblood/stone identity"
```

---

### Task 3: Adicionar Zen Kaku Gothic New como fonte de display

**Files:**
- Modify: `packages/prumo/app/layout.tsx`

**Interfaces:**
- Consumes: `--font-display` definido na Task 2
- Produces: classe utilitária `font-display` disponível em qualquer componente/MDX (Tailwind v4 gera `font-display` automaticamente a partir de `--font-display` no `@theme inline`)

- [ ] **Step 1: Importar a fonte e expor a CSS var**

Em `packages/prumo/app/layout.tsx`, troque:

```tsx
import { Inter, JetBrains_Mono } from "next/font/google";
```

por:

```tsx
import { Inter, JetBrains_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
```

Depois do bloco `jetBrainsMono`, adicione:

```tsx
const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});
```

E no `className` do `<html>`, troque:

```tsx
className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
```

por:

```tsx
className={`${inter.variable} ${jetBrainsMono.variable} ${zenKakuGothicNew.variable} h-full antialiased`}
```

- [ ] **Step 2: Verificar que o app compila e a fonte carrega**

Run: `cd packages/prumo && npm run dev` (roda em `localhost:3000`; interrompa com Ctrl+C depois de confirmar)
Expected: sem erro de build; inspecionando o DOM, `<html>` tem a classe `--font-display` no `style` (Next injeta a variável) e `document.fonts` lista "Zen Kaku Gothic New" depois de carregado

- [ ] **Step 3: Commit**

```bash
git add packages/prumo/app/layout.tsx
git commit -m "feat(prumo): add Zen Kaku Gothic New as the display typeface"
```

---

### Task 4: Sincronizar a documentação de fundação (Colors, Typography, Radius, Shadows, Spacing)

**Files:**
- Modify: `packages/prumo/stories/foundation/Colors.mdx`
- Modify: `packages/prumo/stories/foundation/Typography.mdx`
- Modify: `packages/prumo/stories/foundation/Radius.mdx`
- Modify: `packages/prumo/stories/foundation/Shadows.mdx`
- Modify: `packages/prumo/stories/foundation/Spacing.mdx`

Esses 5 arquivos hoje documentam uma paleta **violeta** (`oklch(0.491 0.270 277)` / `#7C3AED`) que já não bate nem com o teal antigo nem com o oxblood novo — é uma dívida de documentação pré-existente (drift). Esta task corrige as duas coisas de uma vez: sincroniza com os tokens da Task 2 e elimina a referência a uma cor que nunca existiu em `globals.css`.

**Interfaces:**
- Consumes: valores da Task 2 (`globals.css`) e da Task 1 (script de conversão)
- Produces: nada consumido por outras tasks — são páginas de documentação terminais

- [ ] **Step 1: `Colors.mdx` — trocar os 3 blocos de swatches e o texto do dark mode**

Bloco "Primária" (`## Primária`): troque o array de objetos por:

```js
{ name: 'primary', label: 'Primary', oklch: 'oklch(0.339 0.094 31.4)', hex: '#5F2016', wcag: '11.96:1 sobre branco ✅' },
{ name: 'primary-foreground', label: 'Primary Foreground', oklch: 'oklch(0.990 0.007 67.7)', hex: '#FFFBF7', wcag: '—' },
```

Bloco "Neutros" (renomeie o título de `## Neutros (Slate com tinte violeta)` para `## Neutros (Stone quente)`), troque o array por:

```js
{ label: 'background', oklch: 'oklch(0.990 0.007 67.7)', hex: '#FFFBF7' },
{ label: 'card', oklch: 'oklch(1 0 0)', hex: '#FFFFFF' },
{ label: 'muted', oklch: 'oklch(0.951 0.012 59.6)', hex: '#F5EDE7' },
{ label: 'border', oklch: 'oklch(0.904 0.017 61.9)', hex: '#E8DDD4' },
{ label: 'input', oklch: 'oklch(0.904 0.017 61.9)', hex: '#E8DDD4' },
{ label: 'muted-fg', oklch: 'oklch(0.502 0.044 42.8)', hex: '#7A5C50' },
{ label: 'foreground', oklch: 'oklch(0.223 0.039 30.8)', hex: '#2B1410' },
```

Bloco "Semânticas" (`## Semânticas`), troque o array por:

```js
{ label: 'success', oklch: 'oklch(0.462 0.057 152.7)', hex: '#3F6249', wcag: '6.87:1 ✅' },
{ label: 'warning', oklch: 'oklch(0.621 0.121 64.3)', hex: '#B8752B', wcag: '4.64:1 (texto escuro) ✅' },
{ label: 'destructive', oklch: 'oklch(0.501 0.178 28.7)', hex: '#B3261E', wcag: '6.54:1 ✅' },
{ label: 'info', oklch: 'oklch(0.501 0.105 240.1)', hex: '#186A99', wcag: '5.90:1 ✅' },
```

Bloco "Dark Mode": troque o parágrafo `No dark mode, a cor primária muda para Violet-400 para manter contraste sobre fundo escuro.` por `No dark mode, a cor primária vira Coral — o mesmo tom do gradiente de assinatura usado na landing — porque o oxblood puro ficaria escuro demais como cor de destaque sobre um fundo já escuro.` e o array por:

```js
{ label: 'background', oklch: 'oklch(0.194 0.018 37.4)' },
{ label: 'card', oklch: 'oklch(0.247 0.024 40.5)' },
{ label: 'primary (dark)', oklch: 'oklch(0.746 0.147 33.3)' },
{ label: 'foreground', oklch: 'oklch(0.942 0.016 52.6)' },
```

- [ ] **Step 2: `Typography.mdx` — trocar a introdução e a seção "Heading vs Sans"**

Troque a linha 8 (`O Prumo usa **Inter** como fonte principal (\`font-sans\`) e \`font-heading\` para títulos de destaque.`) por:

```
O Prumo usa duas famílias: **Inter** (`font-sans`) no corpo e em UI densa — formulários, tabelas, texto pequeno — e **Zen Kaku Gothic New** (`font-display`) em títulos de marketing e destaque. É a mesma gótica japonesa usada na identidade pessoal do autor, substituindo a Hiragino Sans original (fonte de sistema da Apple, não licenciada para web).
```

Renomeie a seção `## Heading vs Sans` para `## Display vs Sans` e troque o conteúdo por:

```jsx
<div style={{ display: 'flex', gap: 48, marginTop: 24 }}>
  <div>
    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8, fontFamily: 'monospace' }}>font-display (Zen Kaku Gothic New, 700)</div>
    <div className="font-display" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>Prumo</div>
  </div>
  <div>
    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8, fontFamily: 'monospace' }}>font-sans (Inter, regular)</div>
    <div style={{ fontSize: 28 }}>Prumo</div>
  </div>
</div>
```

E adicione uma linha na tabela "Uso recomendado" (depois de "Título de página"):

```
| Título hero / marketing | `font-display text-4xl md:text-5xl` | Prumo |
```

- [ ] **Step 3: `Radius.mdx` — atualizar base, swatches e escala**

Troque a linha 8 (`Base: **6px** — equilíbrio entre técnico (Linear: 4px) e amigável (Notion: 8px). Escala proporcional derivada de uma única variável \`--radius\`.`) por:

```
Base: **10px** — cantos generosos, herdados diretamente da identidade visual de referência do Prumo (o chip de link e os cards da peça original já usavam esse raio). Escala proporcional derivada de uma única variável `--radius` (era 6px antes da reforma de identidade).
```

Troque o array de swatches por:

```js
{ name: 'rounded-none', px: '0px', radius: '0px' },
{ name: 'rounded-xs', px: '5px', radius: '5px' },
{ name: 'rounded-sm', px: '7px', radius: '7px' },
{ name: 'rounded-md', px: '10px', radius: '10px' },
{ name: 'rounded-lg', px: '13px', radius: '13px' },
{ name: 'rounded-xl', px: '20px', radius: '20px' },
{ name: 'rounded-2xl', px: '27px', radius: '27px' },
{ name: 'rounded-3xl', px: '40px', radius: '40px' },
{ name: 'rounded-full', px: '9999px', radius: '9999px' },
```

E troque as duas ocorrências de `oklch(0.491 0.270 277 ...)` (background e border do swatch) por `oklch(0.339 0.094 31.4 ...)`.

- [ ] **Step 4: `Shadows.mdx` — atualizar o tingimento**

Troque a linha 8 (`Todas as sombras têm **tinte violeta** (\`oklch(0.491 0.270 277)\`) para manter coerência com a identidade da Prumo. O resultado é uma profundidade mais sofisticada que as sombras neutras genéricas.`) por:

```
Todas as sombras têm **tinte oxblood** (`oklch(0.339 0.094 31.4)`) para manter coerência com a identidade da Prumo. O resultado é uma profundidade mais sofisticada que as sombras neutras genéricas.
```

Troque as 6 ocorrências de `oklch(0.491 0.270 277 / X%)` no array de sombras (mantendo cada valor de opacidade `X%` exatamente como está, só trocando `0.491 0.270 277` por `0.339 0.094 31.4`).

Troque `## Por que tinte violeta?` por `## Por que tinte oxblood?` e a primeira frase do parágrafo (`Sombras neutras (preto/cinza) são genéricas e não reforçam a identidade da marca. Com o tinte violeta, ...`) trocando "tinte violeta" por "tinte oxblood".

- [ ] **Step 5: `Spacing.mdx` — atualizar a cor de acento dos swatches**

Troque as duas ocorrências de `oklch(0.491 0.270 277)` (uma no `background` do bloco de barra, outra no `color`/`background` do badge `tw`) e a cor `#7C3AED` por `oklch(0.339 0.094 31.4)` e `#5F2016`, respectivamente. Os valores de espaçamento (`px`, `rem`) **não mudam**.

- [ ] **Step 2 (verificação): rodar o Storybook e revisar as 5 páginas visualmente**

Run: `cd packages/prumo && npm run storybook` (abre em `localhost:6006`; navegue até `Fundação/Cores`, `Fundação/Tipografia`, `Fundação/Raio de Borda`, `Fundação/Sombras`, `Fundação/Espaçamento`)
Expected: todos os swatches renderizam na paleta oxblood/stone nova, sem nenhum resquício violeta/teal; interrompa o servidor com Ctrl+C depois de confirmar

- [ ] **Step 6: Commit**

```bash
git add packages/prumo/stories/foundation/
git commit -m "docs(prumo): sync foundation MDX docs with the oxblood token set"
```

---

### Task 5: Atualizar `README.md`

**Files:**
- Modify: `packages/prumo/README.md`

- [ ] **Step 1: Trocar a linha da cor primária**

Troque:

```
- **Teal `#0D9488`** — cor primária (revisar contraste)
```

por:

```
- **Oxblood `#5F2016`** — cor primária, extraída da identidade pessoal do autor (11.96:1 de contraste sobre branco ✅)
```

- [ ] **Step 2: Adicionar a fonte de display à linha de tipografia**

Troque:

```
- **Inter** — tipografia principal
```

por:

```
- **Inter** (corpo/UI) + **Zen Kaku Gothic New** (títulos/display) — tipografia dupla
```

- [ ] **Step 3: Commit**

```bash
git add packages/prumo/README.md
git commit -m "docs(prumo): update README for the new identity"
```

---

### Task 6: Verificação da Fase 1 — a11y como gate real + testes de browser

Hoje `a11y.test` está como `'todo'` em `.storybook/preview.tsx` — violações de acessibilidade são reportadas mas não derrubam o teste. Como esta fase mexe em contraste (o ponto mais sensível a regressão de a11y), o gate vira `'error'` antes de rodar a suíte.

> Nota: `Button.mdx`, `Card.mdx` e `Dialog.mdx` já documentam bem os componentes e não têm nenhum valor de cor hardcoded (`grep` confirmado) — herdam a paleta nova automaticamente e não precisam de edição nesta fase.

**Files:**
- Modify: `packages/prumo/.storybook/preview.tsx`

- [ ] **Step 1: Mudar o gate de a11y**

Em `packages/prumo/.storybook/preview.tsx`, troque:

```tsx
    a11y: {
      test: 'todo',
    },
```

por:

```tsx
    a11y: {
      test: 'error',
    },
```

- [ ] **Step 2: Rodar a suíte de testes de browser (todos os 58 componentes + a11y)**

Run: `cd packages/prumo && npx vitest run`
Expected: todos os stories passam, incluindo as checagens de a11y do axe-core embutidas no addon. Se algum componente falhar por contraste, o problema é no próprio componente (uso de uma cor fora dos tokens) — corrija ali, não relaxe o gate de volta pra `'todo'`.

- [ ] **Step 3: Build completo**

Run: `cd packages/prumo && npm run build && npm run build-storybook`
Expected: ambos terminam sem erro — esse é o mesmo par de comandos que o deploy da Vercel roda

- [ ] **Step 4: Commit**

```bash
git add packages/prumo/.storybook/preview.tsx
git commit -m "test(prumo): promote a11y checks from todo to error gate"
```

---

## Fase 2 — Landing + narrativa

### Task 7: Reformar o hero, princípios e amostra de tokens de `app/page.tsx`

**Files:**
- Modify: `packages/prumo/app/page.tsx`

**Interfaces:**
- Consumes: `--font-display` (Task 3), tokens de cor (Task 2), `buttonVariants` exportado de `@/components/ui/button`
- Produces: nada consumido por outra task — a Task 8 importa `CaseStudy` dentro deste mesmo arquivo

> Nota (bug pré-existente, não introduzido por este plano): o `app/page.tsx` atual tem
> `<Button asChild size="lg">` na linha 46, e `Button` (baseado em `@base-ui/react`, não em
> Radix) nunca implementou a prop `asChild` — `npm run build` falha o type-check nisso hoje,
> antes de qualquer mudança. O código abaixo já corrige isso usando `buttonVariants({ size: "lg" })`
> direto na tag `<a>`, em vez de `asChild`.

- [ ] **Step 1: Substituir o arquivo inteiro**

```tsx
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { CaseStudy } from "@/components/case-study";
import { ArrowRight, ArrowDownRight } from "lucide-react";

const PRINCIPLES = [
  {
    title: "Consistente",
    description: "Um único conjunto de tokens (cor, espaçamento, tipografia) governa todos os componentes.",
  },
  {
    title: "Acessível",
    description: "Componentes construídos sobre Base UI e shadcn/ui, com foco em contraste e navegação por teclado.",
  },
  {
    title: "Composável",
    description: "Primitivos pequenos e previsíveis que se combinam em telas densas sem gambiarra.",
  },
];

const TOKEN_SAMPLE = [
  { label: "Primary", token: "var(--primary)", fg: "var(--primary-foreground)" },
  { label: "Secondary", token: "var(--secondary)", fg: "var(--secondary-foreground)" },
  { label: "Destructive", token: "var(--destructive)", fg: "white" },
  { label: "Success", token: "var(--success)", fg: "white" },
  { label: "Warning", token: "var(--warning)", fg: "var(--warning-foreground)" },
  { label: "Info", token: "var(--info)", fg: "white" },
];

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-display text-lg font-bold tracking-tight">Prumo</span>
        <ModeToggle />
      </header>

      <main className="flex-1 w-full">
        <section
          className="px-6 py-16 md:px-12 md:py-24 space-y-6"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, oklch(0.951 0.012 59.6) 0%, var(--background) 55%)",
          }}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-info">
              <ArrowDownRight className="size-4" />
              Design System
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Prumo</h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Sistema de design com Next.js, shadcn/ui, Base UI e Tailwind v4.
              Tokens, primitivos e padrões de composição para construir interfaces densas e consistentes.
            </p>
            <a
              href="/storybook"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg", className: "rounded-xl" })}
            >
              Ver no Storybook <ArrowRight className="ml-2 size-4" />
            </a>
          </div>
        </section>

        <div className="max-w-4xl mx-auto w-full px-6 md:px-12 space-y-20 py-20">
          <section className="space-y-6">
            <h2 className="font-display text-xl font-semibold">Princípios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="space-y-2 p-5 rounded-2xl border border-border">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-xl font-semibold">Amostra de tokens</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {TOKEN_SAMPLE.map((t) => (
                <div key={t.label} className="rounded-2xl border border-border p-3 space-y-3">
                  <div
                    className="h-20 rounded-xl flex items-center justify-center text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: t.token, color: t.fg }}
                  >
                    {t.label}
                  </div>
                  <p className="text-sm font-medium">{t.label}</p>
                </div>
              ))}
            </div>
          </section>

          <CaseStudy />
        </div>

        <footer className="border-t border-border px-6 md:px-12 py-8">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="/storybook" target="_blank" rel="noreferrer" className="hover:text-foreground underline underline-offset-4">
              Storybook
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground underline underline-offset-4">
              Repositório
            </a>
            <a href="https://giovanyux.github.io/portfolio" target="_blank" rel="noreferrer" className="hover:text-foreground underline underline-offset-4">
              Portfólio
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
```

> Nota: o link "Repositório" usa `https://github.com` como placeholder de host — troque pela URL real do repo antes do deploy final (é uma URL, não um valor de design, por isso fica fora do escopo de tokens desta task).

- [ ] **Step 2: Rodar o dev server e conferir visualmente em light e dark**

Run: `cd packages/prumo && npm run dev`
Expected: hero com wash sutil de stone claro atrás do texto, título em Zen Kaku Gothic New, badges/tokens na paleta oxblood; alternar o `ModeToggle` mostra o dark mode coerente. Ctrl+C para encerrar.

- [ ] **Step 3: Commit**

```bash
git add packages/prumo/app/page.tsx
git commit -m "feat(prumo): restyle landing hero, principles and token sample"
```

---

### Task 8: Criar a seção de narrativa (case study)

**Files:**
- Create: `packages/prumo/components/case-study.tsx`

**Interfaces:**
- Consumes: nada (componente autocontido)
- Produces: `CaseStudy` (named export, sem props) — consumido por `app/page.tsx` (Task 7, já importado)

- [ ] **Step 1: Criar o componente**

```tsx
// packages/prumo/components/case-study.tsx
export function CaseStudy() {
  return (
    <section className="space-y-8 max-w-2xl">
      <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
        Por trás dos tokens
      </h2>

      <div className="space-y-6 text-base leading-relaxed text-foreground/90">
        <p>
          Um design system não é só uma coleção de componentes bonitos — é o ponto onde as
          decisões de produto viram interface, sem depender de mais uma reunião pra alinhar. O
          Prumo nasceu com isso resolvido no nível técnico: 58 componentes, tokens, dark mode.
          Faltava a identidade — a base visual era teal com neutros frios, o &ldquo;padrão&rdquo;
          que qualquer gerador de tema entrega.
        </p>

        <p>
          A mudança começou pela cor. Trocar o teal genérico por um oxblood extraído de uma
          peça de identidade real — não escolhido num color picker — resolveu dois problemas ao
          mesmo tempo: deu personalidade ao sistema e, de quebra, fechou uma dívida de contraste
          que já estava documentada no próprio código (o teal original vinha marcado
          &ldquo;revisar contraste&rdquo; havia tempo). O oxblood passa de 11:1 contra branco,
          sem esforço.
        </p>

        <blockquote className="border-l-2 border-primary pl-4 text-lg font-display text-foreground">
          Consistência de raciocínio importa mais que consistência de número.
        </blockquote>

        <p>
          O raio de borda seguiu a mesma lógica. Não é mais &ldquo;6px porque é o meio-termo
          entre Linear e Notion&rdquo; — é 10px porque a peça de identidade que guiou o resto do
          sistema já tinha essa generosidade nos cantos, do chip de link ao card. A tipografia
          dupla — Zen Kaku Gothic New nos títulos, Inter no corpo — existe porque um sistema real
          quase nunca usa uma fonte só: título de marketing pede personalidade, formulário e
          tabela densa pedem legibilidade sem distração.
        </p>

        <p className="text-muted-foreground">
          Nada disso veio de uma pesquisa com usuário — o Prumo é, antes de tudo, uma peça pra
          mostrar como penso decisões de design de ponta a ponta. Mas o raciocínio por trás de
          cada token é real, e é isso que fica documentado aqui: não só o resultado, o porquê.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Confirmar que a landing renderiza a seção sem erro de tipo**

Run: `cd packages/prumo && npx tsc --noEmit`
Expected: sem erros de TypeScript relacionados a `case-study.tsx` ou ao import em `app/page.tsx`

- [ ] **Step 3: Commit**

```bash
git add packages/prumo/components/case-study.tsx
git commit -m "feat(prumo): add narrative case study section to the landing"
```

---

### Task 9: Verificação da Fase 2

- [ ] **Step 1: Build completo**

Run: `cd packages/prumo && npm run build`
Expected: build de produção sem erro

- [ ] **Step 2: Revisão visual manual**

Run: `npm run dev`, abra `localhost:3000`, role a página inteira em light e dark mode.
Expected: hero → princípios → amostra de tokens → case study → rodapé, tudo com a identidade oxblood/pêssego, sem quebra de layout em mobile (redimensione a janela ou use as devtools). Ctrl+C para encerrar.

- [ ] **Step 3: Commit (se houver ajustes da revisão)**

```bash
git add packages/prumo/app/page.tsx packages/prumo/components/case-study.tsx
git commit -m "fix(prumo): landing polish after visual review"
```

(Pule este commit se a Step 2 não exigiu nenhum ajuste.)

---

## Fase 3 — Profundidade de documentação

Cada task desta fase cria um MDX **standalone** (usa `<Meta title="..." />` em vez de `<Meta of={XStories} />`) porque compara/documenta mais de um componente ao mesmo tempo — o padrão que `Button.mdx`/`Card.mdx` usam (`Meta of=`) só funciona para 1:1 com um arquivo de stories.

### Task 10: `Overlays.mdx` — Dialog vs Sheet vs Drawer

**Files:**
- Create: `packages/prumo/stories/Overlays.mdx`

**Interfaces:**
- Consumes: `Dialog.stories.tsx` (`Default`, `Confirmacao`), `Sheet.stories.tsx` (`PelaDireita`, `PelaEsquerda`, `PelaBaixo`), `Drawer.stories.tsx` (`Default`, `PelaEsquerda`) — todos já existentes, nenhuma story nova é criada

- [ ] **Step 1: Criar o arquivo**

```mdx
{/* Overlays.mdx */}
import { Meta, Canvas } from '@storybook/addon-docs/blocks'
import * as DialogStories from './Dialog.stories'
import * as SheetStories from './Sheet.stories'
import * as DrawerStories from './Drawer.stories'

<Meta title="Fundação/Guia de Overlays" />

# Dialog vs Sheet vs Drawer

Os três bloqueiam a interação com o resto da tela, mas resolvem problemas diferentes. Escolher
errado é o erro de composição mais comum com esse trio.

---

## Dialog

Construído sobre `@base-ui/react/dialog`. Modal centralizado — sempre no meio da tela, sempre
com scrim atrás.

<Canvas of={DialogStories.Confirmacao} />

**Use quando:** a decisão é única e focada (confirmar, salvar, um formulário curto) e o usuário
precisa decidir antes de continuar.

**Não use quando:** o conteúdo é longo o suficiente para exigir rolagem própria, ou quando o
usuário se beneficia de ainda ver contexto da tela de trás — nesses casos, `Sheet`.

## Sheet

Também `@base-ui/react/dialog` por baixo, mas desliza de uma borda (`side="right" | "left" | "bottom"`)
em vez de centralizar. Mantém mais sensação de contexto da página original.

<Canvas of={SheetStories.PelaDireita} />

**Use quando:** é um painel suplementar — filtros, edição rápida de um item de uma lista,
detalhe de um carrinho — algo que "pertence" à tela de trás, não a substitui.

**Não use quando:** a ação é destrutiva e crítica (prefira `Dialog`, que centraliza a atenção
com mais força).

## Drawer

Construído sobre `vaul`, não sobre Base UI — é a única peça deste trio com gesto de arraste
nativo (swipe-to-dismiss), pensada primeiro para toque.

<Canvas of={DrawerStories.Default} />

**Use quando:** o contexto é mobile/touch — um menu de ações, um seletor rápido — onde arrastar
pra fechar é o gesto esperado.

**Não use quando:** a tela é desktop-first e densa (dashboards, telas de admin) — ali `Sheet`
comunica "painel" com mais precisão do que o gesto de arraste do `Drawer`, que é uma linguagem
mobile.

---

## Tabela de decisão

| Situação | Componente |
|---|---|
| Confirmar exclusão de um registro | `Dialog` |
| Formulário curto de criação (1-3 campos) | `Dialog` |
| Filtros avançados de uma listagem | `Sheet` |
| Editar um item sem sair da lista | `Sheet` |
| Menu de ações num app mobile | `Drawer` |
| Seletor de opções em touch | `Drawer` |

---

## Acessibilidade

- Os três exigem um título (`DialogTitle`/`SheetTitle`/`DrawerTitle`) associado via
  `aria-labelledby` — se o design não pede um título visível, use `<span className="sr-only">`
  em vez de omitir o elemento; omitir quebra o anúncio pro leitor de tela
- Foco é preso dentro do overlay (`focus trap`) e retorna ao elemento que abriu o overlay ao
  fechar — nenhum dos três precisa de código adicional pra isso, é comportamento do Base UI/vaul
- Tecla `Esc` fecha os três por padrão — não capture esse evento em um componente filho sem
  propagar, ou o fechamento para de funcionar
- Nunca abra um `Dialog` de dentro de outro `Dialog` — o `focus trap` do segundo quebra o do
  primeiro. Se a situação parecer pedir isso, o fluxo provavelmente devia ser uma etapa (`step`)
  dentro do mesmo Dialog, não um segundo overlay
```

- [ ] **Step 2: Confirmar que a página renderiza no Storybook**

Run: `cd packages/prumo && npm run storybook`
Expected: entrada "Fundação/Guia de Overlays" aparece na sidebar, os 3 Canvas renderizam os componentes reais (não erro de import). Ctrl+C para encerrar.

- [ ] **Step 3: Commit**

```bash
git add packages/prumo/stories/Overlays.mdx
git commit -m "docs(prumo): add Dialog vs Sheet vs Drawer decision guide"
```

---

### Task 11: `Select.mdx` — Select vs Combobox vs NativeSelect

**Files:**
- Create: `packages/prumo/stories/Select.mdx`

**Interfaces:**
- Consumes: `Select.stories.tsx` (`Default`, `ComGrupos`), `Combobox.stories.tsx` (`Default`, `MultiploComChips`), `NativeSelect.stories.tsx` (`Default`) — todos já existentes

- [ ] **Step 1: Criar o arquivo**

```mdx
{/* Select.mdx */}
import { Meta, Canvas } from '@storybook/addon-docs/blocks'
import * as SelectStories from './Select.stories'
import * as ComboboxStories from './Combobox.stories'
import * as NativeSelectStories from './NativeSelect.stories'

<Meta title="Fundação/Guia de Seleção" />

# Select vs Combobox vs NativeSelect

Três formas de escolher um valor de uma lista — a diferença é o tamanho da lista e o tipo de
dispositivo, não a preferência visual.

---

## Select

`@base-ui/react/select`. Dropdown com estilo próprio, controle total sobre o item (ícone,
badge, descrição).

<Canvas of={SelectStories.ComGrupos} />

**Use quando:** a lista tem poucas opções (até ~15) e não precisa de busca. É a opção default
para formulários desktop.

## Combobox

`@base-ui/react` (Combobox). Campo de texto com filtro embutido — a lista reage ao que o
usuário digita — e suporta seleção múltipla com chips.

<Canvas of={ComboboxStories.MultiploComChips} />

**Use quando:** a lista tem muitas opções (dezenas ou centenas) e digitar pra filtrar é mais
rápido que rolar. É a única opção deste trio com seleção múltipla nativa.

## NativeSelect

`<select>` do próprio navegador, só estilizado por fora. Sem JS de posicionamento, sem
Base UI por baixo.

<Canvas of={NativeSelectStories.Default} />

**Use quando:** o contexto é mobile-heavy (o picker nativo do iOS/Android é mais rápido de usar
que um dropdown customizado no teclado touch) ou quando o formulário é simples o bastante pra
não valer o peso de um componente customizado. Acessibilidade vem de graça — é um `<select>` de
verdade, sem ARIA manual.

---

## Tabela de decisão

| Situação | Componente |
|---|---|
| Formulário desktop, < 15 opções | `Select` |
| Lista longa (país, categoria de catálogo) | `Combobox` |
| Seleção múltipla com chips | `Combobox` |
| Formulário simples, público mobile | `NativeSelect` |

---

## Acessibilidade

- `Select` e `Combobox` gerenciam navegação por teclado (setas, `Home`/`End`, digitação
  rápida pra pular pro item) automaticamente via Base UI — não reimplemente esse comportamento
- `NativeSelect` já é acessível pela plataforma — não adicione `role` ou `aria-*` nele, isso só
  atrapalha leitores de tela que já sabem lidar com `<select>`
- Em `Combobox` multi-select, cada chip removível precisa de um botão de remoção com label
  (`aria-label="Remover {valor}"`), não só um ícone de X clicável
```

- [ ] **Step 2: Confirmar que a página renderiza no Storybook**

Run: `cd packages/prumo && npm run storybook`
Expected: entrada "Fundação/Guia de Seleção" na sidebar, 3 Canvas renderizando. Ctrl+C para encerrar.

- [ ] **Step 3: Commit**

```bash
git add packages/prumo/stories/Select.mdx
git commit -m "docs(prumo): add Select vs Combobox vs NativeSelect decision guide"
```

---

### Task 12: `Table.mdx` — Table vs DataTable

**Files:**
- Create: `packages/prumo/stories/Table.mdx`

**Interfaces:**
- Consumes: `Table.stories.tsx` (`Default`, `ComAcoes`), `DataTable.stories.tsx` (`Default`, `ComBusca`, `Vazia`) — todos já existentes

- [ ] **Step 1: Criar o arquivo**

```mdx
{/* Table.mdx */}
import { Meta, Canvas } from '@storybook/addon-docs/blocks'
import * as TableStories from './Table.stories'
import * as DataTableStories from './DataTable.stories'

<Meta title="Fundação/Guia de Tabelas" />

# Table vs DataTable

`Table` é marcação semântica pura. `DataTable` é `Table` por baixo, mas orquestrado pelo
TanStack React Table — ordenação, filtro, paginação e seleção de linha vêm prontos.

---

## Table

HTML de tabela estilizado, sem estado, sem dependência.

<Canvas of={TableStories.ComAcoes} />

**Use quando:** os dados são pequenos e estáticos (uma lista de 5-10 itens, um resumo) e nenhuma
interação além de rolar é necessária.

## DataTable

`@tanstack/react-table` por baixo — `getCoreRowModel`, `getFilteredRowModel`,
`getPaginationRowModel`, `getSortedRowModel` já configurados no componente.

<Canvas of={DataTableStories.ComBusca} />

Estado vazio já vem coberto:

<Canvas of={DataTableStories.Vazia} />

**Use quando:** os dados vêm de uma API, crescem com o tempo, ou o usuário precisa buscar,
ordenar ou paginar. Qualquer tela de "listagem" de um painel admin é candidata a `DataTable`,
não a `Table`.

---

## Tabela de decisão

| Situação | Componente |
|---|---|
| Resumo de pedido, 5 linhas fixas | `Table` |
| Log de atividade recente (poucas linhas) | `Table` |
| Listagem de clientes/produtos de um painel | `DataTable` |
| Qualquer tabela que vai crescer além de ~20 linhas | `DataTable` |

---

## Acessibilidade

- `Table` usa `<thead>`/`<tbody>`/`<th scope="col">` — não troque por `<div>`s estilizados como
  tabela, leitores de tela perdem a navegação por célula/linha
- Em `DataTable`, o cabeçalho de coluna ordenável precisa comunicar o estado atual
  (`aria-sort="ascending" | "descending" | "none"`) — o componente já expõe isso via o ícone de
  chevron, não remova o atributo ao customizar
- O estado vazio (`Vazia`) sempre precisa de uma mensagem textual, não só um ícone — é o que
  diferencia "carregando" de "não há resultados" pra quem usa leitor de tela
```

- [ ] **Step 2: Confirmar que a página renderiza no Storybook**

Run: `cd packages/prumo && npm run storybook`
Expected: entrada "Fundação/Guia de Tabelas" na sidebar, Canvas renderizando `Table` e `DataTable`. Ctrl+C para encerrar.

- [ ] **Step 3: Commit**

```bash
git add packages/prumo/stories/Table.mdx
git commit -m "docs(prumo): add Table vs DataTable decision guide"
```

---

### Task 13: `Field.mdx` — Form/Field

**Files:**
- Create: `packages/prumo/stories/Field.mdx`

**Interfaces:**
- Consumes: `ShowcaseForms.stories.tsx` (`NovoItem`, `Configuracoes` — as duas stories que usam `FieldSet`/`FieldLegend`), componentes de `components/ui/field.tsx` (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldContent`, `FieldTitle`)

- [ ] **Step 1: Criar o arquivo**

```mdx
{/* Field.mdx */}
import { Meta, Canvas } from '@storybook/addon-docs/blocks'
import * as ShowcaseFormsStories from './ShowcaseForms.stories'

<Meta title="Fundação/Guia de Formulários (Field)" />

# Field

`Field` não é um input — é a camada de composição em volta de um input (label, descrição, erro,
agrupamento). O Prumo não tem um componente `Form` monolítico; formulários são montados
combinando `Field*` com `Input`, `Select`, `Checkbox`, etc.

---

## Em contexto

<Canvas of={ShowcaseFormsStories.NovoItem} />

---

## Anatomia

| Peça | Papel |
|---|---|
| `FieldSet` + `FieldLegend` | Agrupa campos relacionados (ex: "Tipo de venda") com um rótulo de grupo semântico (`<fieldset>`/`<legend>`) |
| `Field` | Container de um campo — controla orientação (`vertical` \| `horizontal` \| `responsive`) |
| `FieldLabel` | Label associado ao input via `htmlFor` (herda de `Label`) |
| `FieldContent` | Agrupa label + descrição quando o input fica ao lado (orientação `horizontal`) |
| `FieldDescription` | Texto de ajuda abaixo do campo — usa `text-muted-foreground` |
| `FieldError` | Mensagem de erro — só renderiza se houver `children` ou `errors` |
| `FieldSeparator` | Divisor entre grupos de campos, com label opcional no meio (ex: "ou") |

---

## Quando usar `FieldSet` vs `Field` solto

- Use `FieldSet` quando 2+ campos formam uma decisão conjunta (ex: um grupo de checkbox de
  "Disponível para", um conjunto de rádio de frequência) — o `<legend>` dá contexto que um
  `<label>` solto em cada item não dá
- Use `Field` sozinho para um campo independente (um `Input` de nome, um `Select` de categoria)

## Quando NÃO usar

- Não decore `FieldLabel` fora de um `Field`/`FieldContent` — as classes de `FieldLabel`
  dependem dos seletores `group-data-*` do pai pra estado de disabled/checked funcionar
- Não omita `FieldDescription` em campos com formato específico (CPF, telefone, senha) — o
  hint é o que evita o usuário errar antes de submeter, não depois

---

## Acessibilidade

- `FieldError` usa `role="alert"` — o leitor de tela anuncia o erro assim que ele aparece no
  DOM, sem precisar de foco manual
- `FieldSet`/`FieldLegend` usam elementos HTML nativos (`<fieldset>`/`<legend>`), não `<div>`
  estilizado — isso é o que faz o leitor de tela anunciar "grupo: Tipo de venda" ao entrar no
  primeiro campo do grupo
- Sempre associe `FieldDescription`/`FieldError` ao input via `aria-describedby` quando o input
  não é um dos componentes prontos do Prumo (os componentes prontos já fazem essa amarração)
```

- [ ] **Step 2: Confirmar que a página renderiza no Storybook**

Run: `cd packages/prumo && npm run storybook`
Expected: entrada "Fundação/Guia de Formulários (Field)" na sidebar, Canvas de `NovoItem` renderizando com os `FieldSet` visíveis. Ctrl+C para encerrar.

- [ ] **Step 3: Commit**

```bash
git add packages/prumo/stories/Field.mdx
git commit -m "docs(prumo): add Field composition guide"
```

---

### Task 14: `Sidebar.mdx`

**Files:**
- Create: `packages/prumo/stories/Sidebar.mdx`

**Interfaces:**
- Consumes: `ShowcaseApp.stories.tsx` (`DashboardPrincipal`), componentes de `components/ui/sidebar.tsx`

- [ ] **Step 1: Criar o arquivo**

```mdx
{/* Sidebar.mdx */}
import { Meta, Canvas } from '@storybook/addon-docs/blocks'
import * as ShowcaseAppStories from './ShowcaseApp.stories'

<Meta title="Fundação/Guia de Sidebar" />

# Sidebar

O componente mais composto do Prumo — 22 sub-componentes (`Sidebar`, `SidebarProvider`,
`SidebarMenu*`, `SidebarGroup*`, `SidebarRail`, `useSidebar`) orquestrados via Context, não um
componente único com props.

---

## Em contexto

<Canvas of={ShowcaseAppStories.DashboardPrincipal} />

---

## Anatomia mínima

```tsx
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>{/* logo, seletor de workspace */}</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navegação</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>{/* usuário, logout */}</SidebarFooter>
    <SidebarRail />
  </Sidebar>
  <SidebarInset>{/* conteúdo principal da página */}</SidebarInset>
</SidebarProvider>
```

`SidebarProvider` precisa envolver tanto o `Sidebar` quanto o conteúdo (`SidebarInset`) — é ele
quem guarda o estado de aberto/fechado via `useSidebar()`.

## Quando usar

- Navegação primária de um produto com mais de ~5 seções — é o padrão de app admin/dashboard
- Quando o produto precisa de sidebar colapsável (`SidebarRail` dá o gesto de recolher pra
  ícones) — não recrie esse comportamento com um `Sheet` lateral fixo

## Quando NÃO usar

- Não use `Sidebar` para menus de contexto ou ações pontuais — isso é `DropdownMenu` ou
  `Popover`
- Não aninhe um `Sidebar` dentro de um `Sheet`/`Dialog` — o componente assume que é ele quem
  controla o layout da página inteira via `SidebarProvider`

---

## Acessibilidade

- `SidebarMenuButton` já inclui `data-active` para o item de navegação atual — estilize esse
  atributo em vez de aplicar uma classe condicional manual, mantém o estado visual e semântico
  (via `aria-current`, herdado do botão) sincronizados
- `SidebarTrigger` (o botão de abrir/fechar) precisa manter um `aria-label` descritivo
  ("Abrir menu" / "Fechar menu") — não deixe só o ícone sem texto acessível
- Em telas pequenas, `Sidebar` vira um overlay (comportamento padrão do componente) — teste
  sempre com teclado que o foco não fica "preso" atrás do overlay quando ele está fechado
```

- [ ] **Step 2: Confirmar que a página renderiza no Storybook**

Run: `cd packages/prumo && npm run storybook`
Expected: entrada "Fundação/Guia de Sidebar" na sidebar, Canvas de `DashboardPrincipal` renderizando a sidebar completa. Ctrl+C para encerrar.

- [ ] **Step 3: Commit**

```bash
git add packages/prumo/stories/Sidebar.mdx
git commit -m "docs(prumo): add Sidebar composition guide"
```

---

## Fase 4 — Verificação final

### Task 15: Build completo + suíte de testes + fechamento

- [ ] **Step 1: Lint**

Run: `cd packages/prumo && npm run lint`
Expected: sem erros (avisos pré-existentes não relacionados a esta reforma são aceitáveis)

- [ ] **Step 2: Type-check**

Run: `cd packages/prumo && npx tsc --noEmit`
Expected: sem erros

- [ ] **Step 3: Suíte de testes de browser completa (todos os stories + a11y em `error`)**

Run: `cd packages/prumo && npx vitest run`
Expected: todos os stories passam, incluindo os 5 MDX novos da Fase 3 e os 5 foundation docs atualizados da Fase 1

- [ ] **Step 4: Build de produção + build do Storybook**

Run: `cd packages/prumo && npm run build && npm run build-storybook`
Expected: ambos terminam sem erro — replica exatamente o que a Vercel roda no deploy

- [ ] **Step 5: Script de contraste, uma última vez**

Run: `cd packages/prumo && node scripts/check-tokens.mjs`
Expected: `All pairs passed: true`

- [ ] **Step 6: Commit final (se algum dos steps acima exigiu correção)**

```bash
git add -A packages/prumo
git commit -m "chore(prumo): final verification pass for identity reform"
```

(Pule este commit se nenhum step exigiu ajuste — nesse caso a Fase 4 não gera commit próprio,
só confirma que as fases anteriores já deixaram o pacote em estado limpo.)
