# Design — Prumo

Sistema de design travado para este app. Toda página, componente ou story lê
este arquivo antes de gerar/editar código visual. Não regenerar por página —
estender ou emendar este arquivo quando o sistema precisar crescer.

**Origem:** `hallmark study` (modo imagem) sobre uma referência de estúdio
criativo brutalista/suíço, confirmada pelo usuário como a nova identidade
do Prumo em 2026-07-29. Ver `## Provenance` abaixo.

## Genre

Mais próximo de **modern-minimal** para efeitos de roteamento de nav/slop-test
(é uma ferramenta/design system, não um site editorial de prosa) — mas a
linguagem visual em si é **studied-DNA**, não um tema do catálogo. O
catálogo de temas do Hallmark fica suspenso neste projeto; este arquivo é o
sistema.

## Macrostructure family

- **Landing (`app/page.tsx`):** Portfolio Grid (hero H2 Split Diptych, lista
  numerada de destaques, footer Statement). Único ponto de entrada de
  marketing do pacote — não há família "app" ou "content" separada.
- **Storybook (chrome + docs MDX):** não é uma macroestrutura de página —
  segue a paleta/tipografia/raio abaixo, mas a estrutura é a do próprio
  Storybook (manager theme + preview decorators).
- **Componentes (`components/ui/*`):** escopo de componente, não de página —
  herdam os tokens abaixo; nenhum ganha macroestrutura própria.

## Tema — tema único, sem dark mode

Compromisso deliberado (igual à referência): **não há modo escuro**. O
`next-themes`, o `ThemeProvider`, e o `ModeToggle` são removidos do pacote.
Toda variante Tailwind `dark:` em qualquer arquivo do pacote é código morto
e deve ser removida quando encontrada.

## Tokens

Valores computados e verificados (WCAG AA, ver
`scripts/check-tokens.mjs` — rodar `node scripts/check-tokens.mjs` após
qualquer mudança de cor; todos os pares abaixo já passam):

| Token semântico | Hex | OKLCH |
| --- | --- | --- |
| `--background` / `--card` / `--popover` | `#FFFFFF` | `oklch(1.000 0.000 89.9)` |
| `--foreground` / `--card-foreground` / `--popover-foreground` | `#121110` | `oklch(0.178 0.003 67.7)` |
| `--secondary` / `--muted` / `--accent` (surface) | `#F1EFE9` | `oklch(0.952 0.008 91.5)` |
| `--secondary-foreground` / `--accent-foreground` | `#121110` | `oklch(0.178 0.003 67.7)` |
| `--muted-foreground` | `#4A4744` | `oklch(0.400 0.006 67.6)` |
| `--primary` (acento amarelo) | `#F2C318` | `oklch(0.835 0.167 90.6)` |
| `--primary-foreground` | `#121110` | `oklch(0.178 0.003 67.7)` |
| `--destructive` (acento vermelho) | `#C8371D` | `oklch(0.554 0.186 32.4)` |
| `--destructive-foreground` | `#FFF8EE` | `oklch(0.982 0.015 77.1)` |
| `--success` | `#2F5233` | `oklch(0.403 0.066 146.9)` |
| `--success-foreground` | `#FFF8EE` | `oklch(0.982 0.015 77.1)` |
| `--warning` | `#8A4A16` | `oklch(0.478 0.107 54.6)` |
| `--warning-foreground` | `#FFF8EE` | `oklch(0.982 0.015 77.1)` |
| `--info` | `#2E4C6D` | `oklch(0.409 0.066 251.9)` |
| `--info-foreground` | `#FFF8EE` | `oklch(0.982 0.015 77.1)` |
| `--border` / `--input` | `#121110` | `oklch(0.178 0.003 67.7)` |
| `--ring` (foco — sempre vermelho, nunca amarelo) | `#C8371D` | `oklch(0.554 0.186 32.4)` |

`--chart-1..5`: ink, amarelo, vermelho, success, info (nessa ordem) — cobre a
paleta inteira sem inventar cor nova. `--sidebar*`: mesmos valores de
background/foreground/border/ring do sistema (paper/ink) — a sidebar não tem
superfície própria diferenciada nesta identidade.

## Radius

`--radius: 0`. Toda a escala derivada (`--radius-xs` … `--radius-3xl`) já é
`calc(var(--radius) * N)`, então zerar a base zera a escala inteira sem
tocar em cada arquivo de componente. **Exceção:** `rounded-full` (avatares,
switches, spinners, dots) continua círculo — formas circulares não são
"cantos arredondados", são a forma do elemento.

## Shadows

Trocar sombra suave/desfocada por **deslocamento sólido** ("registro de
impressão"), sem blur:

```
--shadow-xs:      2px 2px 0 var(--foreground);
--shadow-sm:      3px 3px 0 var(--foreground);
--shadow-md:      4px 4px 0 var(--foreground);
--shadow-lg:      6px 6px 0 var(--foreground);
--shadow-xl:      8px 8px 0 var(--foreground);
--shadow-2xl:     10px 10px 0 var(--foreground);
--shadow-primary: 4px 4px 0 var(--foreground);
```

Todo `hover:shadow-[...]` com valor arbitrário embutido (glow tingido de
`--primary`/`--destructive` via `oklch(from var(...) l c h / N%)`) é
removido — o efeito de profundidade agora vem do deslocamento sólido acima,
não de um brilho. Arquivos com esse padrão hoje: `lib/button-variants.ts`,
`components/ui/checkbox.tsx`, `components/ui/input.tsx`,
`components/ui/sidebar.tsx`, `components/ui/switch.tsx`,
`components/ui/textarea.tsx`.

## Typography

- **Display:** Archivo, weight 900 (Black), tracking `-0.02em` a `-0.03em`
  em display grande. Carrega o peso da marca — headline da landing, `h1`/`h2`
  de MDX de fundação, `CardTitle`/`DialogTitle` continuam no peso semântico
  padrão do componente (não todo heading vira Black — só display de página).
- **Body:** Archivo, weight 400/500. Mesma família do display — a leitura
  correta é "uma família, range de peso extremo", não "Inter-em-tudo"
  preguiçoso (ver `anti-patterns.md` § Inter-everywhere): o range 400→900 e a
  troca de tracking é o que sustenta a distinção.
  Ambos via `next/font/google` (`Archivo`) — substitui `Inter` e
  `Zen Kaku Gothic New`.
- **Mono:** mantém `JetBrains Mono` — utilitário (código, `Kbd`, dados
  tabulares), não faz parte da identidade de marca, não muda.
- **Rótulos/eyebrows:** versalete tracked (uppercase, `letter-spacing: 0.06–
  0.1em`, weight 700–800), mesma família Archivo — não monoespaçado.

## Spacing

Inalterada — escala de 4px já existente (`--spacing-micro` … `--spacing-page`)
continua exatamente como está.

## Motion

- Easings existentes (`--transition-fast/medium/slow`, cubic-bezier padrão)
  seguem valendo — a identidade nova é sobre cor/forma/tipografia, não sobre
  timing de transição.
- Hover em botão/link usa o "print-register": `translate(-2px,-2px)` +
  `box-shadow: var(--shadow-md)` aparecendo (nunca crescendo — aparece
  inteiro). `:active` volta a `translate(0,0)` e remove a sombra.
- Foco nunca anima (`outline` aparece instantâneo, nunca `transition:
  outline`) — regra já documentada em `interaction-and-states.md`, sem
  mudança.

## Microinteractions stance

- Foco = sempre vermelho (`--ring`), nunca amarelo — amarelo sobre botão
  amarelo falha contraste; vermelho passa 3:1+ contra papel e contra amarelo
  (ver tabela de contraste do script).
- Sucesso silencioso, confirmação só para ação destrutiva irreversível — sem
  mudança em relação à disciplina padrão do Hallmark.

## CTA voice

- Primário: preenchimento amarelo, texto ink, versalete tracked, sem raio,
  hover = print-register.
- Secundário/outline: borda ink 3px, fundo papel, mesmo hover.
- Destrutivo: preenchimento vermelho, texto `--destructive-foreground`.
- Nunca usar os dois acentos (amarelo + vermelho) no mesmo componente

  interativo — vermelho é reservado para destrutivo/foco; amarelo para ação
  primária/positiva. Um card ou tile decorativo pode combinar os dois (como
  na landing), mas um único botão nunca.

## Per-page allowances

- A landing (`app/page.tsx`) pode usar o grid encaixotado com bordas grossas
  (nav em células, hero H2 split, lista numerada de destaques) — as únicas
  páginas com "enriquecimento" estrutural.
- Storybook (chrome do manager + preview) usa os mesmos tokens de cor e
  tipografia, raio zerado, mas não replica o grid-boxed da landing — é uma
  ferramenta interna, não uma peça de marketing.
- Componentes individuais (`components/ui/*`) nunca inventam um token novo —
  se falta um valor, ele entra na tabela acima primeiro.

## What pages MUST share

- Tokens de cor, tipografia (Archivo), raio zero, sombra print-register.
- Foco sempre vermelho.
- Nenhuma variante `dark:` em lugar nenhum do pacote.

## What pages MAY differ on

- Densidade estrutural: a landing pode usar o grid-boxed pesado; Storybook
  e MDX de fundação continuam com layout de documentação simples (prosa +
  exemplos), só herdando cor/tipo/raio.

## Provenance

- Fonte: imagem colada pelo usuário em 2026-07-29 — referência pública de
  inspiração ("não é meu trabalho nem site real que eu conheço" — resposta
  do usuário ao check de proveniência do `hallmark study`).
- Confiança: paper/acentos/raio/sombra são leitura direta da imagem
  (banda de cor, macroestrutura, tratamento distintivo). Tipografia é
  **estimada por papel** — a imagem não permite identificar a fonte exata;
  Archivo foi escolhido como candidato real com o range de peso 400→900
  necessário para a lógica de pareamento "uma família, pesos extremos"
  vista na referência.
- Ritmo (densidade/assimetria) veio de leitura visual direta (modo imagem
  tem esse eixo disponível, ao contrário do modo URL).

## Notes — anti-patterns a não carregar

A referência não trouxe nenhum tell de IA (sem gradiente roxo, sem card-
ícone-em-quadrado genérico, sem bounce/overshoot, sem glassmorphism). O
único ponto de atenção ao implementar: não deixar o par único de família
tipográfica (Archivo em todo peso) escorregar para o anti-pattern "Inter-
everywhere" — o range de peso e tracking tem que ser real e visível em cada
uso (ver `## Typography` acima), não um weight 400 aplicado em tudo.

## Exports

### tokens.css (resumo — ver `app/globals.css` para o arquivo completo)

```css
:root {
  --background: oklch(1.000 0.000 89.9);
  --foreground: oklch(0.178 0.003 67.7);
  --primary: oklch(0.835 0.167 90.6);
  --primary-foreground: oklch(0.178 0.003 67.7);
  --destructive: oklch(0.554 0.186 32.4);
  --destructive-foreground: oklch(0.982 0.015 77.1);
  --ring: oklch(0.554 0.186 32.4);
  --radius: 0px;
  --shadow-md: 4px 4px 0 var(--foreground);
}
```
