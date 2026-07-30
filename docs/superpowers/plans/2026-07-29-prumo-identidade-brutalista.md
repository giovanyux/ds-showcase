# Prumo — Reforma de Identidade Brutalista Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir a identidade visual inteira do Prumo (`packages/prumo`) — hoje laranja-queimado, cantos de 10px, sombra suave, light/dark mode — por um sistema brutalista/suíço travado em `design.md`: papel branco puro, tinta quase-preta, acento duplo amarelo/vermelho, raio zero, sombra por deslocamento sólido, tipografia Archivo em peso extremo, tema único (sem dark mode).

**Architecture:** `design.md` já foi escrito na raiz de `packages/prumo` e é a fonte da verdade para todo valor usado neste plano — nenhuma task deste plano inventa um token novo; toda task lê `design.md` antes de editar. A maior parte dos ~58 primitivos de `components/ui/` herda cor/raio/sombra automaticamente via tokens Tailwind (`bg-primary`, `rounded-xl`, `shadow-md` etc.) — não precisam de edição direta. O trabalho real se concentra em: (1) o arquivo de tokens + fontes + remoção da infra de dark mode, (2) os poucos componentes que hoje contornam o sistema de tokens (cor crua do Tailwind ou sombra arbitrária embutida), (3) a varredura mecânica de variantes `dark:` mortas, (4) a landing page, (5) o chrome do Storybook, (6) os docs de fundação MDX, (7) verificação final.

**Tech Stack:** Next.js 16, Tailwind CSS v4 (tokens via `@theme inline` em `app/globals.css`), shadcn/ui, Base UI (`@base-ui/react`), Storybook 10, Vitest 4 + Playwright (`@storybook/addon-vitest` roda cada story como teste de browser), `next/font/google` (troca de `Inter`/`Zen Kaku Gothic New` para `Archivo`).

## Global Constraints

- Rodar todos os comandos dentro de `packages/prumo` (workspace do monorepo `ds-showcase`), a partir deste worktree.
- **`design.md` (na raiz de `packages/prumo`) é a fonte da verdade.** Toda task lê a seção relevante antes de editar. Nenhuma task introduz um valor de cor/raio/sombra/fonte que não esteja lá — se faltar algo, a task para e pergunta antes de inventar.
- Depois de qualquer mudança de cor em `app/globals.css`, rodar `node scripts/check-tokens.mjs` (o script já está atualizado com a paleta nova) e confirmar `All pairs passed: true` antes de prosseguir.
- Nenhuma variante Tailwind `dark:` sobrevive em nenhum arquivo do pacote ao final deste plano — é tema único.
- `next-themes` é removido do `package.json` (dependência) e de todo import no código.
- `packages/prumo` é o único pacote tocado.
- Cada task termina com `npm run lint`, `npx vitest run`, e `npm run build-storybook` passando (rodar de dentro de `packages/prumo`).
- Todo `git commit` desta reforma usa o prefixo `feat(prumo-brutal): `.

---

## File Structure

- **Task 1 (Fundação)** — Modify: `app/globals.css`, `app/layout.tsx`, `components/ui/sonner.tsx`, `package.json`. Delete: `components/theme-provider.tsx`, `components/mode-toggle.tsx`.
- **Task 2 (Componentes que contornam o sistema)** — Modify: `lib/button-variants.ts`, `components/ui/checkbox.tsx`, `components/ui/input.tsx`, `components/ui/sidebar.tsx`, `components/ui/switch.tsx`, `components/ui/textarea.tsx`, `components/ui/badge.tsx`, `components/ui/tooltip.tsx`, `components/ui/select.tsx`.
- **Task 3 (Varredura mecânica de `dark:`)** — Modify: `components/ui/avatar.tsx`, `components/ui/calendar.tsx`, `components/ui/chart.tsx`, `components/ui/combobox.tsx`, `components/ui/context-menu.tsx`, `components/ui/dropdown-menu.tsx`, `components/ui/field.tsx`, `components/ui/input-group.tsx`, `components/ui/input-otp.tsx`, `components/ui/kbd.tsx`, `components/ui/menubar.tsx`, `components/ui/native-select.tsx`, `components/ui/radio-group.tsx`, `components/ui/toggle.tsx`.
- **Task 4 (Landing page)** — Modify: `app/page.tsx`.
- **Task 5 (Storybook chrome)** — Modify: `.storybook/manager.ts`, `.storybook/preview.tsx`, `components/examples/dashboard-example.tsx`, `stories/Alert.stories.tsx`, `stories/ShowcaseMeta.stories.tsx`.
- **Task 6 (Docs de fundação)** — Modify: `stories/foundation/Colors.mdx`, `stories/foundation/Radius.mdx`, `stories/foundation/Shadows.mdx`, `stories/foundation/Typography.mdx`.
- **Task 7 (Verificação final)** — sem arquivos próprios; audita o resultado das Tasks 1-6.

---

### Task 1: Fundação — tokens, fontes, remoção da infraestrutura de dark mode

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `components/ui/sonner.tsx`
- Modify: `package.json`
- Delete: `components/theme-provider.tsx`
- Delete: `components/mode-toggle.tsx`
- Test: `npx vitest run` (roda todas as 49 stories), `npm run build-storybook`

Esta é a task-base: tudo que vem depois depende dela. Ela não toca em nenhum componente individual — só no arquivo de tokens, nas fontes e na infraestrutura de tema.

- [ ] **Step 1: Reescrever o bloco de tokens `:root` em `app/globals.css`**

Ler `design.md` § Tokens, § Radius, § Shadows por inteiro antes de editar. Ler o `app/globals.css` atual (linhas ~1-186 cobrem `@theme inline` + `:root`) para saber exatamente quais nomes de token preservar (a lista de `--color-*` aliases dentro de `@theme inline` não muda de nome — só os valores dentro de `:root` mudam). Substituir dentro de `:root`:

- `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--success`, `--success-foreground`, `--warning`, `--warning-foreground`, `--info`, `--info-foreground`, `--border`, `--input`, `--ring` pelos valores OKLCH exatos da tabela em `design.md` § Tokens.
- `--chart-1` a `--chart-5`: ink, amarelo, vermelho, success, info (nessa ordem, usando os mesmos valores OKLCH dos tokens acima).
- `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`: mesmos valores de `--background`/`--foreground`/`--primary`/`--primary-foreground`/`--secondary`/`--secondary-foreground`/`--border`/`--ring` respectivamente — a sidebar não tem superfície própria nesta identidade.
- `--radius`: `0px`.
- `--shadow-xs` a `--shadow-2xl` e `--shadow-primary`: usar exatamente os valores da seção `design.md` § Shadows (deslocamento sólido, sem blur, cor `var(--foreground)`).

Remover o comentário de cabeçalho antigo ("PRUMO — Token Map... Laranja queimado") e escrever um novo cabeçalho de 3-4 linhas resumindo a paleta nova (papel branco, tinta quase-preta, acento duplo amarelo/vermelho, raio zero).

**Remover o bloco `.dark { ... }` inteiro** (linhas ~186 em diante no arquivo atual) — não há mais modo escuro.

- [ ] **Step 2: Rodar o script de verificação de contraste**

```bash
node scripts/check-tokens.mjs
```

Esperado: `All pairs passed: true`. Se algum par falhar, é porque os valores colados em `:root` não batem com a tabela de `design.md` — corrigir antes de continuar (não ajustar o script, ele já está correto).

- [ ] **Step 3: Trocar as fontes em `app/layout.tsx`**

Trocar o import `Inter, JetBrains_Mono, Zen_Kaku_Gothic_New` por `Archivo, JetBrains_Mono` do `next/font/google`. Configurar:

```ts
const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const archivoDisplay = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "900"],
});
```

(Duas instâncias da mesma família porque `next/font/google` exige uma instância por variável CSS — ambas carregam o arquivo Archivo, cada uma expõe pesos diferentes via `--font-sans`/`--font-display`.) Manter `jetBrainsMono` exatamente como está.

Atualizar a `className` da tag `<html>` para usar `archivo.variable`, `archivoDisplay.variable`, `jetBrainsMono.variable` (remover `zenKakuGothicNew.variable`).

- [ ] **Step 4: Remover a infraestrutura de dark mode em `app/layout.tsx`**

Remover o import `import { ThemeProvider } from "@/components/theme-provider"` e o import `Metadata`-adjacent nada mais muda ali. Remover o wrapper `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>` — o `<TooltipProvider>{children}</TooltipProvider>` passa a ser filho direto de `<body>`. Remover `suppressHydrationWarning` da tag `<html>` (era necessário só por causa do `next-themes`).

- [ ] **Step 5: Deletar os arquivos de tema**

```bash
rm components/theme-provider.tsx components/mode-toggle.tsx
```

- [ ] **Step 6: Corrigir `components/ui/sonner.tsx` — remover `useTheme` do `next-themes`**

Remover `import { useTheme } from "next-themes"` e a linha `const { theme = "system" } = useTheme()`. Remover a prop `theme={theme as ToasterProps["theme"]}` do componente `<Sonner>` (ou passar `theme="light"` explicitamente, já que o `Toaster` da lib `sonner` aceita esse prop e o projeto agora é tema único).

- [ ] **Step 7: Remover a dependência `next-themes`**

```bash
npm uninstall next-themes
```

Confirmar que `package.json` não lista mais `next-themes` em `dependencies`.

- [ ] **Step 8: Rodar a verificação final da task**

```bash
npm run lint && npx vitest run && npm run build-storybook
```

Esperado: os três comandos terminam sem erro novo introduzido por esta task (os warnings pré-existentes de lint documentados no baseline do worktree não são regressão).

- [ ] **Step 9: Commit**

```bash
git add app/globals.css app/layout.tsx components/ui/sonner.tsx package.json package-lock.json
git rm components/theme-provider.tsx components/mode-toggle.tsx
git commit -m "feat(prumo-brutal): tokens, fontes e remoção do dark mode"
```

---

### Task 2: Componentes que contornam o sistema de tokens

**Files:**
- Modify: `lib/button-variants.ts`
- Modify: `components/ui/checkbox.tsx`
- Modify: `components/ui/input.tsx`
- Modify: `components/ui/sidebar.tsx`
- Modify: `components/ui/switch.tsx`
- Modify: `components/ui/textarea.tsx`
- Modify: `components/ui/badge.tsx`
- Modify: `components/ui/tooltip.tsx`
- Modify: `components/ui/select.tsx`
- Test: `stories/Button.stories.tsx`, `stories/Checkbox.stories.tsx`, `stories/Input.stories.tsx`, `stories/Sidebar` (via `stories/ExampleDashboard.stories.tsx`), `stories/Switch.stories.tsx`, `stories/Textarea.stories.tsx`, `stories/Badge.stories.tsx`, `stories/Tooltip.stories.tsx`, `stories/Select.stories.tsx`

Esses 9 arquivos são os únicos em `components/ui/` que **não** herdam a identidade nova automaticamente — 6 deles embutem um `hover:shadow-[...]` com glow arbitrário tingido de `--primary`/`--destructive` (que viraria um brilho amarelo/vermelho borrado, contradizendo a linguagem "sem blur" do sistema novo), e 3 deles (badge/tooltip/select) usam cor crua do Tailwind (`slate-*`, `gray-*`, `red-*`, `emerald-*`, `amber-*`) que não referencia token nenhum, então não muda de cor sozinha.

Ler `design.md` § Shadows e § CTA voice antes de editar.

- [ ] **Step 1: Ler os 9 arquivos**

```bash
cat -n lib/button-variants.ts components/ui/checkbox.tsx components/ui/input.tsx components/ui/sidebar.tsx components/ui/switch.tsx components/ui/textarea.tsx components/ui/badge.tsx components/ui/tooltip.tsx components/ui/select.tsx
```

- [ ] **Step 2: Remover os `hover:shadow-[...]`/`focus-visible:shadow-[...]` arbitrários e substituir pelo hover print-register**

Em cada um dos 6 arquivos com esse padrão (`lib/button-variants.ts`, `checkbox.tsx`, `input.tsx`, `sidebar.tsx`, `switch.tsx`, `textarea.tsx`), localizar a classe `shadow-[...]` com `oklch(from var(--primary)...)` ou `oklch(from var(--destructive)...)` embutida e removê-la. Para os botões (`button-variants.ts`), o hover passa a ser: `hover:-translate-y-0.5 hover:shadow-md` (usa o token `--shadow-md`, que já é o deslocamento sólido definido na Task 1) em vez do glow. Para inputs/textarea/checkbox/switch, o foco continua usando `ring`/`outline` (não shadow) — se o glow estava decorando o estado de foco, ele simplesmente some (o anel de foco já é o sinal, não precisa de reforço com sombra).

- [ ] **Step 3: Corrigir `badge.tsx` — trocar paleta crua pelos tokens semânticos**

Nas variantes `secondary`, `destructive`, `success`, `warning` de `badgeVariants`, trocar as classes `slate-*`/`red-*`/`emerald-*`/`amber-*` por referências aos tokens (`bg-secondary`, `text-secondary-foreground`, `border-secondary`; `bg-destructive/10 text-destructive border-destructive/25`; `bg-success/10 text-success border-success/25`; `bg-warning/10 text-warning border-warning/25`) — seguindo o mesmo padrão que a variante `default` já usa.

- [ ] **Step 4: Corrigir `tooltip.tsx` — trocar cinza cru pelo token de superfície invertida**

Trocar `bg-gray-900 ... text-white` (Popup) e `bg-gray-900 fill-gray-900` (Arrow) por `bg-foreground text-background` e `bg-foreground fill-foreground` respectivamente — removendo também o `dark:bg-gray-800`/`dark:fill-gray-800` (tema único, não precisa de variante dark).

- [ ] **Step 5: Verificar `select.tsx` quanto a cor crua**

Confirmar se `select.tsx` tem alguma classe de cor crua Tailwind (`slate-*`, `gray-*` etc.) fora do padrão `dark:bg-slate-900/*` (esse último já é coberto pela Task 3 — aqui é só para pegar qualquer cor crua **não** ligada a `dark:`). Se não houver nenhuma, seguir sem alteração nesta task e anotar "sem achados" no commit.

- [ ] **Step 6: Rodar a detecção de cor crua remanescente**

```bash
grep -nE "(bg|text|border|ring|fill)-(red|blue|green|emerald|amber|yellow|slate|gray|zinc|neutral|orange|indigo|purple|pink|sky|cyan|teal|lime)-[0-9]{2,3}" components/ui/badge.tsx components/ui/tooltip.tsx components/ui/select.tsx
```

Esperado: nenhuma linha.

- [ ] **Step 6b: Remover variantes `dark:` destes mesmos 9 arquivos**

Sete dos nove arquivos desta task (`checkbox.tsx`, `input.tsx`, `select.tsx`, `switch.tsx`, `textarea.tsx`, `badge.tsx`, `tooltip.tsx`) também têm 1-5 ocorrências de `dark:` que ficam mortas com o tema único — **não estão na Task 3** porque já estão sendo editados aqui. Mesmo protocolo mecânico:

```bash
grep -n "dark:" lib/button-variants.ts components/ui/checkbox.tsx components/ui/input.tsx components/ui/sidebar.tsx components/ui/switch.tsx components/ui/textarea.tsx components/ui/badge.tsx components/ui/tooltip.tsx components/ui/select.tsx
```

Remover cada fragmento `dark:...` de cada className listado (mesma regra da Task 3 — só remove o token `dark:<classe>`, preserva o resto da string). Re-rodar o grep acima e confirmar zero ocorrências.

- [ ] **Step 7: Rodar lint, testes de Storybook e build**

```bash
npm run lint && npx vitest run && npm run build-storybook
```

- [ ] **Step 8: Commit**

```bash
git add lib/button-variants.ts components/ui/checkbox.tsx components/ui/input.tsx components/ui/sidebar.tsx components/ui/switch.tsx components/ui/textarea.tsx components/ui/badge.tsx components/ui/tooltip.tsx components/ui/select.tsx
git commit -m "feat(prumo-brutal): remove glow arbitrário e cor crua nos componentes que contornavam o sistema de tokens"
```

---

### Task 3: Varredura mecânica de variantes `dark:` mortas

**Files:**
- Modify: `components/ui/avatar.tsx`, `components/ui/calendar.tsx`, `components/ui/chart.tsx`, `components/ui/combobox.tsx`, `components/ui/context-menu.tsx`, `components/ui/dropdown-menu.tsx`, `components/ui/field.tsx`, `components/ui/input-group.tsx`, `components/ui/input-otp.tsx`, `components/ui/kbd.tsx`, `components/ui/menubar.tsx`, `components/ui/native-select.tsx`, `components/ui/radio-group.tsx`, `components/ui/toggle.tsx`
- Test: `npx vitest run` (cobre todas as stories correspondentes)

Esses 14 arquivos têm 1-3 ocorrências cada de uma variante Tailwind `dark:algumacoisa` que agora é código morto (tema único, sem `.dark` no HTML). Esta task é puramente mecânica: **remover o fragmento `dark:...` de cada className, mantendo o resto da classe intacto.** Não são achados de cor crua (esses já foram tratados nas Tasks 1-2) — são apenas classes condicionais que nunca mais disparam.

- [ ] **Step 1: Listar as ocorrências exatas antes de editar**

```bash
grep -n "dark:" components/ui/avatar.tsx components/ui/calendar.tsx components/ui/chart.tsx components/ui/combobox.tsx components/ui/context-menu.tsx components/ui/dropdown-menu.tsx components/ui/field.tsx components/ui/input-group.tsx components/ui/input-otp.tsx components/ui/kbd.tsx components/ui/menubar.tsx components/ui/native-select.tsx components/ui/radio-group.tsx components/ui/toggle.tsx
```

- [ ] **Step 2: Remover cada fragmento `dark:...`**

Para cada linha listada no Step 1, remover apenas o token `dark:<classe>` da string de classes (e o espaço extra que sobrar), preservando todas as outras classes na mesma posição. Exemplo de transformação (não é o conteúdo real, só o padrão): `"bg-white text-black dark:bg-slate-900 dark:text-white"` → `"bg-white text-black"`.

- [ ] **Step 3: Confirmar que não sobrou nenhuma ocorrência**

```bash
grep -n "dark:" components/ui/avatar.tsx components/ui/calendar.tsx components/ui/chart.tsx components/ui/combobox.tsx components/ui/context-menu.tsx components/ui/dropdown-menu.tsx components/ui/field.tsx components/ui/input-group.tsx components/ui/input-otp.tsx components/ui/kbd.tsx components/ui/menubar.tsx components/ui/native-select.tsx components/ui/radio-group.tsx components/ui/toggle.tsx
```

Esperado: nenhuma linha.

- [ ] **Step 4: Rodar lint, testes de Storybook e build**

```bash
npm run lint && npx vitest run && npm run build-storybook
```

- [ ] **Step 5: Commit**

```bash
git add components/ui/avatar.tsx components/ui/calendar.tsx components/ui/chart.tsx components/ui/combobox.tsx components/ui/context-menu.tsx components/ui/dropdown-menu.tsx components/ui/field.tsx components/ui/input-group.tsx components/ui/input-otp.tsx components/ui/kbd.tsx components/ui/menubar.tsx components/ui/native-select.tsx components/ui/radio-group.tsx components/ui/toggle.tsx
git commit -m "feat(prumo-brutal): remove variantes dark: mortas (tema único)"
```

---

### Task 4: Landing page

**Files:**
- Modify: `app/page.tsx`
- Test: `stories` não cobre `app/page.tsx` diretamente — verificar via `npm run dev` visual e `npm run build`

Ler `design.md` § Macrostructure family, § CTA voice, § Per-page allowances por inteiro antes de editar. Esta é a única página do pacote com "enriquecimento" estrutural — grid encaixotado com bordas grossas.

**O que preservar** (regra de redesign — conteúdo já existe, só a camada visual muda): o texto de `PRINCIPLES` (Consistente/Acessível/Composável), o texto de `TOKEN_SAMPLE`, o componente `<CaseStudy />`, os links de rodapé (Storybook + Portfólio). **O que substituir:** a estrutura visual inteira.

- [ ] **Step 1: Remover o import e uso de `ModeToggle`**

Remover `import { ModeToggle } from "@/components/mode-toggle"` (o arquivo já foi deletado na Task 1) e a tag `<ModeToggle />` no header.

- [ ] **Step 2: Reescrever o header como nav em grade encaixotada**

Substituir o `<header className="border-b ...">` atual por uma grade de células com borda grossa (`border-3` ou equivalente a 3px via classe arbitrária, usando `border-foreground`): uma célula com a wordmark "Prumo" (peso 900, tracking negativo), uma célula-espaçador vazia, células de link para `/prumo/storybook` ("Componentes") e para a âncora da seção de princípios, e uma célula final preenchida com `bg-primary text-primary-foreground` contendo "Storybook ↗" como CTA. Sem `rounded-*` em nenhuma célula (o token `--radius: 0` já cobre isso se as classes forem `rounded-*`, mas confirmar que nenhuma célula usa `rounded-full` incorretamente).

- [ ] **Step 3: Reescrever o hero como H2 Split Diptych**

Duas colunas (proporção ~7/5, `grid-cols-1 lg:grid-cols-12` com spans `lg:col-span-7`/`lg:col-span-5`, dividido por uma borda grossa no meio em telas largas): à esquerda, o headline em Archivo peso 900 — usar uma frase real sobre o Prumo, por exemplo "Tokens que não negociam." (mesma frase do preview aprovado) — mais o parágrafo "Sistema de design com Next.js, shadcn/ui, Base UI e Tailwind v4..." já existente, mais o CTA "Ver no Storybook →" (usa `buttonVariants({ size: "lg" })`, sem `rounded-xl` — remover essa classe já que o componente Button agora tem raio zero por token). À direita, duas células empilhadas (`+ Consistente` / `Acessível`, ecoando os badges do preview) sobre uma célula maior — usar um bloco com textura CSS simples (gradiente repetido, sem imagem real) rotulado honestamente como um placeholder, não uma foto fingida.

- [ ] **Step 4: Ajustar a seção "Princípios" e "Amostra de tokens"**

Manter o conteúdo (`PRINCIPLES.map`, `TOKEN_SAMPLE.map`) mas trocar `rounded-2xl`/`rounded-xl` nos cartões por bordas grossas sem raio (o `--radius:0` já zera isso automaticamente se as classes forem as mesmas `rounded-*` — só remover qualquer `rounded-full` decorativo que não seja um elemento circular de verdade).

- [ ] **Step 5: Reescrever o rodapé como Ft5 Statement**

Trocar o `<footer className="border-t ...">` atual por uma frase grande em Archivo 900 (ex.: "Consistência sem pedir desculpa.") sobre fundo `bg-foreground text-background`, com os links existentes (Storybook, Portfólio) em tipo pequeno abaixo, mudos.

- [ ] **Step 6: Verificar visualmente**

```bash
npm run dev
```

Abrir `http://localhost:3000` e conferir: sem raio em nenhum elemento não-circular, sem CTA com duas cores de acento ao mesmo tempo (regra de `design.md` § CTA voice), foco visível em vermelho ao tabular pelos links/botões.

- [ ] **Step 7: Rodar build de produção**

```bash
npm run build
```

Esperado: build sem erro.

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx
git commit -m "feat(prumo-brutal): redesenha a landing page (nav em grade, hero H2 split, rodapé statement)"
```

---

### Task 5: Storybook chrome

**Files:**
- Modify: `.storybook/manager.ts`
- Modify: `.storybook/preview.tsx`
- Modify: `components/examples/dashboard-example.tsx`
- Modify: `stories/Alert.stories.tsx`
- Modify: `stories/ShowcaseMeta.stories.tsx`
- Test: `npx vitest run`, `npm run build-storybook`

- [ ] **Step 1: Rebrandear `.storybook/manager.ts`**

Trocar os valores hardcoded: `fontBase` de `'"Inter", -apple-system, sans-serif'` para `'"Archivo", -apple-system, sans-serif'`; `colorPrimary`/`colorSecondary`/`barSelectedColor`/`barHoverColor` de `#AE4526` para `#F2C318` (amarelo); `appBg` de `#FFFBF7` para `#FFFFFF`; `appBorderColor` de `#E8DDD4` para `#121110`; `appBorderRadius` de `10` para `0`; `textColor` de `#2B1410` para `#121110`; `barTextColor` de `#7A5C50` para `#4A4744`; `inputBorder` de `#E8DDD4` para `#121110`; `inputBorderRadius` de `10` para `0`. Manter `fontCode` (`"JetBrains Mono", monospace`) sem mudança. No addon `prumo/portfolio-link`, trocar `borderRadius: 6` para `0` e `color: '#AE4526'` para `'#121110'` (o link vira texto/borda em ink, não em amarelo — amarelo fica reservado para CTA primário, não para chrome de navegação secundário).

- [ ] **Step 2: Remover o decorator de tema em `.storybook/preview.tsx`**

Remover a constante `withTheme` inteira e sua entrada em `decorators: [withTheme, withTooltipProvider]` (fica só `decorators: [withTooltipProvider]`). Remover o bloco `globalTypes: { theme: { ... } }` inteiro (o toggle de tema some da toolbar do Storybook).

- [ ] **Step 3: Remover `dark:` de `dashboard-example.tsx`, `Alert.stories.tsx`, `ShowcaseMeta.stories.tsx`**

Mesmo protocolo mecânico da Task 3: `grep -n "dark:" components/examples/dashboard-example.tsx stories/Alert.stories.tsx stories/ShowcaseMeta.stories.tsx`, remover cada fragmento `dark:...`, confirmar que o grep volta vazio.

- [ ] **Step 4: Rodar lint, testes de Storybook e build**

```bash
npm run lint && npx vitest run && npm run build-storybook
```

- [ ] **Step 5: Commit**

```bash
git add .storybook/manager.ts .storybook/preview.tsx components/examples/dashboard-example.tsx stories/Alert.stories.tsx stories/ShowcaseMeta.stories.tsx
git commit -m "feat(prumo-brutal): rebrand do chrome do Storybook, remove toggle de tema"
```

---

### Task 6: Docs de fundação

**Files:**
- Modify: `stories/foundation/Colors.mdx`
- Modify: `stories/foundation/Radius.mdx`
- Modify: `stories/foundation/Shadows.mdx`
- Modify: `stories/foundation/Typography.mdx`
- Test: `npx vitest run`, `npm run build-storybook`

`stories/foundation/Spacing.mdx` não muda (escala de espaçamento inalterada, per `design.md` § Spacing).

- [ ] **Step 1: Reescrever `Colors.mdx`**

Ler o arquivo atual (formato: array de objetos `{ name, label, oklch, hex, wcag }` renderizado em swatches). Substituir os valores de Primária, Neutros, Semânticas pelos da tabela em `design.md` § Tokens (os mesmos hex/oklch usados em `app/globals.css`). Remover qualquer referência a "modo escuro" no texto explicativo — o doc agora descreve um tema único.

- [ ] **Step 2: Reescrever `Radius.mdx`**

Atualizar para refletir `--radius: 0` — todo exemplo de swatch de raio mostra cantos retos. Adicionar uma nota explícita sobre a exceção de `rounded-full` (avatares, switches, spinners continuam círculo).

- [ ] **Step 3: Reescrever `Shadows.mdx`**

Trocar a explicação de sombra suave tingida de laranja pela receita de deslocamento sólido ("registro de impressão") — mostrar os 6 níveis (`--shadow-xs` a `--shadow-2xl`) como blocos com offset sólido, sem blur, cor `var(--foreground)`.

- [ ] **Step 4: Reescrever `Typography.mdx`**

Atualizar para Archivo (display peso 900, corpo peso 400/500) no lugar de Zen Kaku Gothic New / Inter. Manter a seção de `--font-mono` (JetBrains Mono) sem mudança. Incluir a nota de `design.md` § Notes sobre por que "uma família em pesos extremos" não é o anti-pattern "Inter-em-tudo".

- [ ] **Step 5: Rodar lint, testes de Storybook e build**

```bash
npm run lint && npx vitest run && npm run build-storybook
```

- [ ] **Step 6: Commit**

```bash
git add stories/foundation/Colors.mdx stories/foundation/Radius.mdx stories/foundation/Shadows.mdx stories/foundation/Typography.mdx
git commit -m "docs(prumo-brutal): sincroniza docs de fundação com a nova identidade"
```

---

### Task 7: Verificação final

Sem arquivos próprios — audita o resultado acumulado das Tasks 1-6.

- [ ] **Step 1: Confirmar que não sobrou nenhuma variante `dark:` no pacote**

```bash
grep -rn "dark:" --include="*.tsx" --include="*.ts" --include="*.css" --include="*.mdx" . | grep -v node_modules
```

Esperado: nenhuma linha.

- [ ] **Step 2: Confirmar que `next-themes` não aparece mais em nenhum lugar**

```bash
grep -rln "next-themes\|ModeToggle\|useTheme" --include="*.tsx" --include="*.ts" . | grep -v node_modules
grep -n "next-themes" package.json
```

Esperado: nenhuma ocorrência em nenhum dos dois comandos.

- [ ] **Step 3: Confirmar que nenhuma cor crua do Tailwind sobrou em `components/ui/`**

```bash
grep -rnE "(bg|text|border|ring|fill|stroke)-(red|blue|green|emerald|amber|yellow|slate|gray|zinc|neutral|orange|indigo|purple|pink|sky|cyan|teal|lime)-[0-9]{2,3}" components/ | grep -v node_modules
```

Esperado: nenhuma linha (ou apenas ocorrências explicitamente justificadas — nenhuma esperada neste plano).

- [ ] **Step 4: Rodar o script de contraste uma última vez**

```bash
node scripts/check-tokens.mjs
```

Esperado: `All pairs passed: true`.

- [ ] **Step 5: Rodar a suíte completa**

```bash
npm run lint && npx vitest run && npm run build-storybook && npm run build
```

Esperado: os quatro comandos terminam sem erro.

- [ ] **Step 6: Verificação visual manual**

```bash
npm run storybook
```

Navegar pelas 4 Showcases + `ExampleDashboard` + a landing (`npm run dev` em paralelo, ou usar o build de produção) conferindo: nenhum canto arredondado fora de elementos circulares, foco sempre vermelho, nenhum resquício de light/dark toggle em lugar nenhum, os dois acentos (amarelo/vermelho) nunca no mesmo botão.
