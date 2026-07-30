# Prumo — Auditoria e Correção Anti-Slop (Hallmark) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Auditar todo o design system Prumo (`packages/prumo/components/ui/`, composições e docs de fundação) contra o catálogo de anti-patterns do skill Hallmark, e corrigir — grupo por grupo — os pontos onde o código vaza para a paleta crua padrão do Tailwind ou repete tells de microinteração genéricos, em vez de usar o sistema de tokens OKLCH que o Prumo já define.

**Architecture:** Um audit já rodou nos 10 primitivos mais visíveis (button, card, badge, input, select, textarea, dialog, alert-dialog, sonner, tooltip) e encontrou 6 achados concretos — a Task 1 aplica esses fixes imediatamente, sem nova descoberta. As Tasks 2–6 repetem o mesmo protocolo de audit (grep de detecção → checklist de disciplina → fix → re-check → testes) nos ~48 primitivos restantes, agrupados por família funcional (feedback, formulário, overlay, dados, layout). A Task 7 audita as composições (Showcases, ExampleDashboard, docs de fundação MDX) por tells de nível de página/uso, não de componente isolado. Cada task termina em um estado buildable e testável — nenhuma task deixa o Storybook quebrado para a próxima.

**Tech Stack:** Next.js 16, Tailwind CSS v4 (tokens via CSS custom properties em OKLCH, `app/globals.css`), shadcn/ui, Base UI (`@base-ui/react`), Storybook 10 (`@storybook/nextjs-vite`, addon-a11y, addon-vitest), Vitest 4 + Playwright (roda cada `*.stories.tsx` como teste de browser via `@storybook/addon-vitest`).

## Global Constraints

- Rodar todos os comandos dentro de `packages/prumo` (workspace do monorepo `ds-showcase`).
- Nenhuma dependência nova é instalada. Nenhum novo sistema de tokens é criado — todo fix referencia tokens **já definidos** em `app/globals.css` (`:root` e `.dark`).
- A API pública de cada componente (nomes de props, `variant`, `size`) não muda — só `className`/estilo interno, exceto onde um achado exigir uma nova prop explícita (documentar no PR se acontecer).
- `app/page.tsx` e `components/case-study.tsx` ficam fora de escopo (são a landing, não os primitivos do DS).
- Referências normativas do Hallmark usadas em todas as tasks: `~/.agents/skills/hallmark/references/anti-patterns.md`, `~/.agents/skills/hallmark/references/interaction-and-states.md`, `~/.agents/skills/hallmark/references/color.md`, `~/.agents/skills/hallmark/references/microinteractions.md`.
- **Mapa de substituição de cor crua → token** (usado em toda task que rodar o grep de detecção de cor):

  | Família Tailwind crua | Token Prumo equivalente | Uso típico |
  | --- | --- | --- |
  | `red-*` | `destructive` / `destructive-foreground` | erro, ação destrutiva |
  | `emerald-*`, `green-*` | `success` / `success-foreground` | confirmação, positivo |
  | `amber-*`, `yellow-*` | `warning` / `warning-foreground` | alerta, atenção |
  | `sky-*`, `blue-*`, `cyan-*` | `info` / `info-foreground` | informativo |
  | `slate-*`, `gray-*`, `zinc-*`, `neutral-*` (fundo) | `popover`, `card`, `muted`, `input` (o mais próximo pela função do elemento) | superfícies neutras |
  | `slate-*`, `gray-*`, `zinc-*`, `neutral-*` (texto) | `foreground`, `muted-foreground` | texto neutro |
  | `slate-*`, `gray-*`, `zinc-*`, `neutral-*` (borda) | `border`, `ring` | contorno |

  Nunca inventar um valor OKLCH novo para esses casos — o token certo já existe em `app/globals.css`.
- Todo `git commit` desta auditoria usa o prefixo `fix(prumo-audit): ` seguido do nome do grupo.

---

## File Structure

- **Task 1** — Modify: `components/ui/badge.tsx`, `components/ui/tooltip.tsx`, `components/ui/input.tsx`, `components/ui/select.tsx`, `components/ui/textarea.tsx`, `components/ui/card.tsx`, `components/ui/button.tsx` (verificação, sem edição esperada)
- **Task 2 (Feedback & Status)** — Modify (conforme achados): `components/ui/alert.tsx`, `components/ui/progress.tsx`, `components/ui/skeleton.tsx`, `components/ui/spinner.tsx`, `components/ui/empty.tsx`, `components/ui/kbd.tsx`, `components/ui/sonner.tsx`
- **Task 3 (Form Controls)** — Modify: `components/ui/checkbox.tsx`, `components/ui/switch.tsx`, `components/ui/radio-group.tsx`, `components/ui/slider.tsx`, `components/ui/toggle.tsx`, `components/ui/toggle-group.tsx`, `components/ui/native-select.tsx`, `components/ui/input-otp.tsx`, `components/ui/input-group.tsx`, `components/ui/combobox.tsx`, `components/ui/date-picker.tsx`, `components/ui/calendar.tsx`, `components/ui/field.tsx`, `components/ui/label.tsx`
- **Task 4 (Overlays & Floating Surfaces)** — Modify: `components/ui/popover.tsx`, `components/ui/hover-card.tsx`, `components/ui/dropdown-menu.tsx`, `components/ui/context-menu.tsx`, `components/ui/command.tsx`, `components/ui/menubar.tsx`, `components/ui/sheet.tsx`, `components/ui/drawer.tsx`, `components/ui/navigation-menu.tsx`, `components/ui/dialog.tsx`, `components/ui/alert-dialog.tsx`
- **Task 5 (Data Display)** — Modify: `components/ui/table.tsx`, `components/ui/data-table.tsx`, `components/ui/chart.tsx`, `components/ui/avatar.tsx`, `components/ui/aspect-ratio.tsx`, `components/ui/item.tsx`, `components/ui/breadcrumb.tsx`, `components/ui/pagination.tsx`
- **Task 6 (Layout & Navegação)** — Modify: `components/ui/sidebar.tsx`, `components/ui/tabs.tsx`, `components/ui/accordion.tsx`, `components/ui/collapsible.tsx`, `components/ui/resizable.tsx`, `components/ui/scroll-area.tsx`, `components/ui/separator.tsx`, `components/ui/direction.tsx`, `components/ui/tour.tsx`, `components/ui/carousel.tsx`, `components/ui/button-group.tsx`
- **Task 7 (Composições e Fundação)** — Modify (conforme achados): `components/examples/dashboard-example.tsx`, `stories/foundation/Colors.mdx`, `stories/foundation/Radius.mdx`, `stories/foundation/Shadows.mdx`, `stories/foundation/Spacing.mdx`, `stories/foundation/Typography.mdx`, `stories/ShowcaseApp.stories.tsx`, `stories/ShowcaseForms.stories.tsx`, `stories/ShowcaseMeta.stories.tsx`, `stories/ShowcaseOnboarding.stories.tsx`, `stories/ExampleDashboard.stories.tsx`

---

### Task 1: Corrigir os achados já confirmados (badge, tooltip, input, select, textarea, card, button)

**Files:**
- Modify: `components/ui/badge.tsx:14-21`
- Modify: `components/ui/tooltip.tsx:53,62`, `components/ui/tooltip.tsx:8`
- Modify: `components/ui/input.tsx:14`
- Modify: `components/ui/select.tsx:44`
- Modify: `components/ui/textarea.tsx:10`
- Modify: `components/ui/card.tsx:21`
- Verify only (não deve precisar de mudança): `components/ui/button.tsx:60`
- Test: `stories/Badge.stories.tsx`, `stories/Tooltip.stories.tsx`, `stories/Input.stories.tsx`, `stories/Select.stories.tsx`, `stories/Textarea.stories.tsx`, `stories/Card.stories.tsx`, `stories/Button.stories.tsx`

Estes achados já foram confirmados no audit anterior (ver histórico da conversa) — não é preciso descobrir nada, só aplicar. `card.tsx` e `button.tsx` também fizeram parte do audit original (não tinham findings de cor crua, por isso não entraram nos Steps 1-3, mas têm os dois achados nuançados dos Steps 7-8 abaixo).

- [ ] **Step 1: Corrigir `badge.tsx` — trocar paleta crua pelos tokens semânticos**

Em `components/ui/badge.tsx`, dentro de `badgeVariants`, as variantes `secondary`, `destructive`, `success`, `warning` (linhas 14, 16, 18, 20) usam classes cruas do Tailwind em vez dos tokens que a variante `default` (linha 12-13) já usa corretamente. Trocar:

```ts
secondary:
  "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
destructive:
  "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
success:
  "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
warning:
  "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
```

por (seguindo o padrão exato de `default`):

```ts
secondary:
  "bg-secondary/40 text-secondary-foreground border-secondary/60 dark:bg-secondary/25",
destructive:
  "bg-destructive/10 text-destructive border-destructive/25 dark:bg-destructive/15",
success:
  "bg-success/10 text-success border-success/25 dark:bg-success/15",
warning:
  "bg-warning/10 text-warning border-warning/25 dark:bg-warning/15",
```

- [ ] **Step 2: Corrigir `tooltip.tsx` — trocar cinza cru pelo token de superfície invertida e separar delay de hover/foco**

Em `components/ui/tooltip.tsx:53`, trocar `bg-gray-900 ... text-white ... dark:bg-gray-800` por `bg-foreground text-background dark:bg-foreground`. Em `tooltip.tsx:62` (o `Arrow`), trocar `bg-gray-900 fill-gray-900 dark:bg-gray-800 dark:fill-gray-800` por `bg-foreground fill-foreground`.

Em `tooltip.tsx:7-18` (`TooltipProvider`), o Base UI (`@base-ui/react/tooltip`) já abre o tooltip instantaneamente em foco de teclado e só aplica o `delay` ao hover de ponteiro — confirmar isso lendo `node_modules/@base-ui/react/tooltip/root/TooltipRoot.tsx` (ou a documentação do pacote) antes de mudar qualquer coisa. Se o comportamento já for esse, **não mexer** — o achado do audit fica registrado como "falso positivo, confirmado" no commit. Se o delay se aplicar também ao foco, subir `delay` default de `300` para `800` e adicionar um segundo prop de controle de foco conforme a API do Base UI permitir.

- [ ] **Step 3: Corrigir `input.tsx`, `select.tsx`, `textarea.tsx` — dark mode com token em vez de slate cru**

Em cada um dos três arquivos, trocar o segmento `dark:bg-slate-900/40` ou `dark:bg-slate-900/50` (e, em `input.tsx`, também `dark:focus-visible:bg-slate-900`) por `dark:bg-input/30` (e `dark:focus-visible:bg-input/50` no caso do `input.tsx`) — usando o token `--input` que já é o tom quente correto no `.dark` block de `app/globals.css`.

- [ ] **Step 4: Corrigir `card.tsx` — variar o hover da variante `interactive`**

Em `components/ui/card.tsx:21`, a variante `interactive` aplica sempre a mesma receita (`hover:-translate-y-1 hover:shadow-lg hover:ring-primary/25`) em todo lugar onde é usada — o tell "hover-lift genérico" descrito em `microinteractions.md`/`anti-patterns.md` § "Universal `hover:scale-105`" (mesmo padrão, com `translate-y` no lugar de `scale`). Adicionar uma segunda variante `data-[variant=interactive-flat]` que sinaliza só via `ring-primary/25` (sem `-translate-y-1`/`shadow-lg`), para uso em grids densas onde o lift de todo card ao mesmo tempo é ruído visual. Manter `interactive` (com lift) para casos de card único/destacado. Atualizar `Card` para aceitar `variant?: "default" | "interactive" | "interactive-flat"`.

- [ ] **Step 5: Verificar `button.tsx` — easing de overshoot no efeito magnético**

Em `components/ui/button.tsx:60`, o retorno do efeito magnético usa `cubic-bezier(0.34, 1.56, 0.64, 1)` — o mesmo bezier citado em `anti-patterns.md` § "Bouncy overshoot easings on UI". A própria regra abre exceção para "interações físicas genuínas (o release de um drag-and-drop)", e o efeito magnético (o botão segue o cursor e depois "solta") se qualifica como isso. **Não alterar o código.** Só confirmar lendo o comentário em `button.tsx:12-15` que a intenção documentada é essa, e deixar uma linha no commit registrando que este achado foi revisado e mantido de propósito.

- [ ] **Step 6: Re-rodar a detecção para confirmar zero ocorrências**

```bash
cd packages/prumo && grep -rnE "(bg|text|border|ring|fill)-(red|blue|green|emerald|amber|yellow|slate|gray|zinc|neutral|orange|indigo|purple|pink|sky|cyan|teal|lime)-[0-9]{2,3}" components/ui/badge.tsx components/ui/tooltip.tsx components/ui/input.tsx components/ui/select.tsx components/ui/textarea.tsx
```

Esperado: nenhuma linha retornada.

- [ ] **Step 7: Rodar lint, testes de Storybook e build**

```bash
cd packages/prumo && npm run lint && npx vitest run && npm run build-storybook
```

Esperado: os três comandos terminam sem erro. Inspecionar visualmente `Badge.stories.tsx`, `Tooltip.stories.tsx` e `Card.stories.tsx` no Storybook buildado (ou `npm run storybook`) para confirmar que as cores semânticas continuam legíveis em light e dark mode, e que a nova variante `interactive-flat` do Card renderiza corretamente.

- [ ] **Step 8: Commit**

```bash
git add components/ui/badge.tsx components/ui/tooltip.tsx components/ui/input.tsx components/ui/select.tsx components/ui/textarea.tsx components/ui/card.tsx
git commit -m "fix(prumo-audit): substitui paleta Tailwind crua por tokens do sistema em badge/tooltip/input/select/textarea; adiciona variante interactive-flat ao Card; revisa easing do Button (mantido — interação física genuína)"
```

---

### Task 2: Auditar e corrigir — Feedback & Status

**Files:**
- Modify (conforme achados): `components/ui/alert.tsx`, `components/ui/progress.tsx`, `components/ui/skeleton.tsx`, `components/ui/spinner.tsx`, `components/ui/empty.tsx`, `components/ui/kbd.tsx`, `components/ui/sonner.tsx`
- Test: `stories/Alert.stories.tsx`, `stories/Progress.stories.tsx`, `stories/Skeleton.stories.tsx`, `stories/Spinner.stories.tsx`, `stories/Empty.stories.tsx`, `stories/Kbd.stories.tsx`, `stories/Sonner.stories.tsx`

Este grupo é o de maior risco de repetir o achado do Badge — todos usam cor semântica (sucesso/erro/aviso/info) com frequência. `sonner.tsx` já foi lido no audit original (usa `text-success`/`text-info`/`text-warning`/`text-destructive` corretamente nos ícones do Toaster — sem achado de cor conhecido), mas ainda não passou pelos greps de microinteração deste grupo nem pelo checklist manual de toast — incluído aqui para fechar essa lacuna.

- [ ] **Step 1: Ler os 7 arquivos**

```bash
cd packages/prumo && cat -n components/ui/alert.tsx components/ui/progress.tsx components/ui/skeleton.tsx components/ui/spinner.tsx components/ui/empty.tsx components/ui/kbd.tsx components/ui/sonner.tsx
```

- [ ] **Step 2: Rodar a detecção de cor crua**

```bash
cd packages/prumo && grep -nE "(bg|text|border|ring|fill|from|via|to)-(red|blue|green|emerald|amber|yellow|slate|gray|zinc|neutral|orange|indigo|purple|pink|sky|cyan|teal|lime)-[0-9]{2,3}" components/ui/alert.tsx components/ui/progress.tsx components/ui/skeleton.tsx components/ui/spinner.tsx components/ui/empty.tsx components/ui/kbd.tsx components/ui/sonner.tsx
```

Para cada linha retornada, aplicar a tabela de substituição da seção Global Constraints (família crua → token Prumo), seguindo o mesmo padrão de opacidade (`/10`, `/25`, etc.) já usado nas variantes corrigidas do `badge.tsx` na Task 1.

- [ ] **Step 3: Rodar a detecção de tells de microinteração**

```bash
cd packages/prumo && grep -nE "cubic-bezier\(0\.34, ?1\.56|cubic-bezier\(0\.68, ?-0\.55|transition-all\b|hover:scale-(105|110|95)\b|toast\.success|toast\(.*Done|Sucesso!" components/ui/alert.tsx components/ui/progress.tsx components/ui/skeleton.tsx components/ui/spinner.tsx components/ui/empty.tsx components/ui/kbd.tsx components/ui/sonner.tsx
```

Se `spinner.tsx` só flasha por menos de ~150ms sem controle de exibição mínima (ver `interaction-and-states.md` § Loading and empty states — "Spinners that flash"), anotar como achado mesmo que o grep não pegue automaticamente — ler o componente manualmente para essa checagem específica.

Verificar também `empty.tsx` contra o checklist de `interaction-and-states.md`: todo estado vazio precisa de ícone/ilustração pequena + uma frase explicando por que está vazio + uma ação — nunca "Nenhum resultado" genérico sem contexto.

- [ ] **Step 4: Aplicar os fixes encontrados nos Steps 2-3**

Editar cada arquivo conforme os achados. Se um arquivo não tiver nenhuma ocorrência nos greps e passar no checklist manual do Step 3, deixar como está e anotar "sem achados" no commit.

- [ ] **Step 5: Re-rodar os dois greps de detecção para confirmar zero ocorrências**

(repetir os comandos exatos dos Steps 2 e 3 — esperado: nenhuma linha)

- [ ] **Step 6: Rodar lint, testes de Storybook e build**

```bash
cd packages/prumo && npm run lint && npx vitest run && npm run build-storybook
```

- [ ] **Step 7: Commit**

```bash
git add components/ui/alert.tsx components/ui/progress.tsx components/ui/skeleton.tsx components/ui/spinner.tsx components/ui/empty.tsx components/ui/kbd.tsx components/ui/sonner.tsx
git commit -m "fix(prumo-audit): grupo feedback & status — tokens semânticos e disciplina de microinteração"
```

---

### Task 3: Auditar e corrigir — Form Controls

**Files:**
- Modify (conforme achados): `components/ui/checkbox.tsx`, `components/ui/switch.tsx`, `components/ui/radio-group.tsx`, `components/ui/slider.tsx`, `components/ui/toggle.tsx`, `components/ui/toggle-group.tsx`, `components/ui/native-select.tsx`, `components/ui/input-otp.tsx`, `components/ui/input-group.tsx`, `components/ui/combobox.tsx`, `components/ui/date-picker.tsx`, `components/ui/calendar.tsx`, `components/ui/field.tsx`, `components/ui/label.tsx`
- Test: `stories/Checkbox.stories.tsx`, `stories/Switch.stories.tsx`, `stories/RadioGroup.stories.tsx`, `stories/Slider.stories.tsx`, `stories/Toggle.stories.tsx`, `stories/NativeSelect.stories.tsx`, `stories/InputOTP.stories.tsx`, `stories/Combobox.stories.tsx`, `stories/DatePicker.stories.tsx`, `stories/Label.stories.tsx`, `stories/ShowcaseForms.stories.tsx` (cobre `toggle-group`, `input-group`, `field`, `calendar`, que não têm story dedicada)

Este grupo é regido pelo checklist mais rígido: `interaction-and-states.md` § "Input field states — the exhaustive checklist" — regra do não-deslocamento de layout (`border-width` constante em todo estado), altura de input = altura de botão, slot de 24px reservado à direita, foco nunca anima.

- [ ] **Step 1: Ler os 14 arquivos**

```bash
cd packages/prumo && cat -n components/ui/checkbox.tsx components/ui/switch.tsx components/ui/radio-group.tsx components/ui/slider.tsx components/ui/toggle.tsx components/ui/toggle-group.tsx components/ui/native-select.tsx components/ui/input-otp.tsx components/ui/input-group.tsx components/ui/combobox.tsx components/ui/date-picker.tsx components/ui/calendar.tsx components/ui/field.tsx components/ui/label.tsx
```

- [ ] **Step 2: Rodar a detecção de cor crua**

```bash
cd packages/prumo && grep -nE "(bg|text|border|ring|fill|from|via|to)-(red|blue|green|emerald|amber|yellow|slate|gray|zinc|neutral|orange|indigo|purple|pink|sky|cyan|teal|lime)-[0-9]{2,3}" components/ui/checkbox.tsx components/ui/switch.tsx components/ui/radio-group.tsx components/ui/slider.tsx components/ui/toggle.tsx components/ui/toggle-group.tsx components/ui/native-select.tsx components/ui/input-otp.tsx components/ui/input-group.tsx components/ui/combobox.tsx components/ui/date-picker.tsx components/ui/calendar.tsx components/ui/field.tsx components/ui/label.tsx
```

Aplicar a mesma tabela de substituição da Task 2 nos achados.

- [ ] **Step 3: Checklist manual de disciplina de estado (por arquivo com `border`)**

Para cada componente que renderize uma borda de campo (`checkbox`, `native-select`, `input-otp`, `input-group`, `combobox`, `date-picker`), verificar contra `interaction-and-states.md`:
1. `border-width` é o mesmo valor literal em `default`, `hover`, `focus-visible`, `aria-invalid`, `disabled`? (grep manual: procurar por mudanças de `border-` com número diferente por variante de estado)
2. O foco usa `outline`/`ring` (nunca anima) — não existe `transition` aplicada a `outline` ou ao próprio `border-width`?
3. `disabled` tem os três sinais independentes: opacidade reduzida + `cursor-not-allowed` + `aria-disabled`?

Anotar cada violação encontrada com arquivo:linha.

- [ ] **Step 4: Checklist manual de microinteração e a11y para toggle/switch/slider**

Contra `interaction-and-states.md` § "Specific control overrides": `switch`/`toggle` devem seguir as mesmas regras de a11y de um checkbox; `slider` — o polegar (thumb) recebe o estado de foco (não a trilha), e a área de toque do polegar deve ser ≥44px mesmo que o tamanho visual seja menor. Ler `slider.tsx` e confirmar se há uma expansão de hit-target (via `::before`/pseudo-elemento ou padding invisível); se não houver, esse é um achado.

- [ ] **Step 5: Aplicar todos os fixes dos Steps 2-4**

- [ ] **Step 6: Re-rodar a detecção de cor crua (Step 2) para confirmar zero ocorrências**

- [ ] **Step 7: Rodar lint, testes de Storybook e build**

```bash
cd packages/prumo && npm run lint && npx vitest run && npm run build-storybook
```

- [ ] **Step 8: Commit**

```bash
git add components/ui/checkbox.tsx components/ui/switch.tsx components/ui/radio-group.tsx components/ui/slider.tsx components/ui/toggle.tsx components/ui/toggle-group.tsx components/ui/native-select.tsx components/ui/input-otp.tsx components/ui/input-group.tsx components/ui/combobox.tsx components/ui/date-picker.tsx components/ui/calendar.tsx components/ui/field.tsx components/ui/label.tsx
git commit -m "fix(prumo-audit): grupo form controls — tokens, disciplina de borda e hit-targets"
```

---

### Task 4: Auditar e corrigir — Overlays & Floating Surfaces

**Files:**
- Modify (conforme achados): `components/ui/popover.tsx`, `components/ui/hover-card.tsx`, `components/ui/dropdown-menu.tsx`, `components/ui/context-menu.tsx`, `components/ui/command.tsx`, `components/ui/menubar.tsx`, `components/ui/sheet.tsx`, `components/ui/drawer.tsx`, `components/ui/navigation-menu.tsx`, `components/ui/dialog.tsx`, `components/ui/alert-dialog.tsx`
- Test: `stories/Popover.stories.tsx`, `stories/HoverCard.stories.tsx`, `stories/DropdownMenu.stories.tsx`, `stories/Command.stories.tsx`, `stories/Sheet.stories.tsx`, `stories/Drawer.stories.tsx`, `stories/Dialog.stories.tsx`, `stories/AlertDialog.stories.tsx`, `stories/ShowcaseApp.stories.tsx` (cobre `context-menu`, `menubar`, `navigation-menu`, que não têm story dedicada)

Este grupo repete o risco do `tooltip.tsx` (Task 1): superfícies flutuantes que às vezes hardcodam cinza em vez do par `popover`/`popover-foreground`. `dialog.tsx` e `alert-dialog.tsx` já foram lidos no audit original (sem achado de cor — usam `bg-popover`/`ring-foreground/6` corretamente), mas ainda não passaram pelos greps de easing/z-index nem pelo checklist de foco inicial deste grupo — incluídos aqui para fechar essa lacuna.

- [ ] **Step 1: Ler os 11 arquivos**

```bash
cd packages/prumo && cat -n components/ui/popover.tsx components/ui/hover-card.tsx components/ui/dropdown-menu.tsx components/ui/context-menu.tsx components/ui/command.tsx components/ui/menubar.tsx components/ui/sheet.tsx components/ui/drawer.tsx components/ui/navigation-menu.tsx components/ui/dialog.tsx components/ui/alert-dialog.tsx
```

- [ ] **Step 2: Rodar a detecção de cor crua**

```bash
cd packages/prumo && grep -nE "(bg|text|border|ring|fill|from|via|to)-(red|blue|green|emerald|amber|yellow|slate|gray|zinc|neutral|orange|indigo|purple|pink|sky|cyan|teal|lime)-[0-9]{2,3}" components/ui/popover.tsx components/ui/hover-card.tsx components/ui/dropdown-menu.tsx components/ui/context-menu.tsx components/ui/command.tsx components/ui/menubar.tsx components/ui/sheet.tsx components/ui/drawer.tsx components/ui/navigation-menu.tsx components/ui/dialog.tsx components/ui/alert-dialog.tsx
```

Aplicar a tabela de substituição — para superfícies flutuantes, o mapeamento correto de fundo é quase sempre `popover`/`popover-foreground`, não `card` ou `muted`.

- [ ] **Step 3: Rodar a detecção de easing com overshoot e `transition-all`**

```bash
cd packages/prumo && grep -nE "cubic-bezier\(0\.34, ?1\.56|cubic-bezier\(0\.68, ?-0\.55|transition-all\b" components/ui/popover.tsx components/ui/hover-card.tsx components/ui/dropdown-menu.tsx components/ui/context-menu.tsx components/ui/command.tsx components/ui/menubar.tsx components/ui/sheet.tsx components/ui/drawer.tsx components/ui/navigation-menu.tsx components/ui/dialog.tsx components/ui/alert-dialog.tsx
```

- [ ] **Step 4: Checklist manual — z-index e clipping (`interaction-and-states.md` § Dropdowns, tooltips, popovers)**

Para cada arquivo, confirmar: (a) o `z-index` usado é um valor nomeado/consistente entre os 11 arquivos (não um `z-[9999]` arbitrário — ver `anti-patterns.md` § "`z-index: 9999`"); (b) nenhum popover/dropdown está dentro de um container `overflow: hidden` sem mecanismo de escape; (c) o menu faz "flip" perto da borda do viewport (checar se a lib de posicionamento do Base UI já cuida disso — se sim, não é um achado). Para `dialog.tsx`/`alert-dialog.tsx` especificamente, confirmar também (d) o primeiro foco ao abrir vai para o primeiro elemento interativo, não para o botão de fechar (`interaction-and-states.md` § Modals and overlays).

- [ ] **Step 5: Checklist manual — `hover-card.tsx` (afordância só em hover)**

`anti-patterns.md` § "Hover-only affordances" — confirmar que o `HoverCard` também abre via foco de teclado (`TooltipPrimitive`/`HoverCardPrimitive` do Base UI deve expor isso nativamente); se só abrir em `:hover`, é um achado crítico (usuário de teclado/touch fica sem acesso ao conteúdo).

- [ ] **Step 6: Aplicar todos os fixes dos Steps 2-5**

- [ ] **Step 7: Re-rodar os greps dos Steps 2-3 para confirmar zero ocorrências**

- [ ] **Step 8: Rodar lint, testes de Storybook e build**

```bash
cd packages/prumo && npm run lint && npx vitest run && npm run build-storybook
```

- [ ] **Step 9: Commit**

```bash
git add components/ui/popover.tsx components/ui/hover-card.tsx components/ui/dropdown-menu.tsx components/ui/context-menu.tsx components/ui/command.tsx components/ui/menubar.tsx components/ui/sheet.tsx components/ui/drawer.tsx components/ui/navigation-menu.tsx components/ui/dialog.tsx components/ui/alert-dialog.tsx
git commit -m "fix(prumo-audit): grupo overlays & floating surfaces — tokens de popover e acessibilidade de hover/foco"
```

---

### Task 5: Auditar e corrigir — Data Display

**Files:**
- Modify (conforme achados): `components/ui/table.tsx`, `components/ui/data-table.tsx`, `components/ui/chart.tsx`, `components/ui/avatar.tsx`, `components/ui/aspect-ratio.tsx`, `components/ui/item.tsx`, `components/ui/breadcrumb.tsx`, `components/ui/pagination.tsx`
- Test: `stories/Table.stories.tsx`, `stories/DataTable.stories.tsx`, `stories/Avatar.stories.tsx`, `stories/Breadcrumb.stories.tsx`, `stories/Pagination.stories.tsx`, `stories/ExampleDashboard.stories.tsx` (cobre `chart`, `aspect-ratio`, `item`, que não têm story dedicada)

`chart.tsx` é o de maior risco deste grupo — bibliotecas de gráfico costumam vir com uma paleta de cor própria (`recharts` default) que pode ignorar os tokens `--chart-1` a `--chart-5` já definidos em `app/globals.css`.

- [ ] **Step 1: Ler os 8 arquivos**

```bash
cd packages/prumo && cat -n components/ui/table.tsx components/ui/data-table.tsx components/ui/chart.tsx components/ui/avatar.tsx components/ui/aspect-ratio.tsx components/ui/item.tsx components/ui/breadcrumb.tsx components/ui/pagination.tsx
```

- [ ] **Step 2: Rodar a detecção de cor crua (incluindo valores hex, já que `chart.tsx` pode usar cores inline em vez de classes Tailwind)**

```bash
cd packages/prumo && grep -nE "(bg|text|border|ring|fill|stroke|from|via|to)-(red|blue|green|emerald|amber|yellow|slate|gray|zinc|neutral|orange|indigo|purple|pink|sky|cyan|teal|lime)-[0-9]{2,3}|#[0-9a-fA-F]{3,6}\b" components/ui/table.tsx components/ui/data-table.tsx components/ui/chart.tsx components/ui/avatar.tsx components/ui/aspect-ratio.tsx components/ui/item.tsx components/ui/breadcrumb.tsx components/ui/pagination.tsx
```

Para achados em `chart.tsx`: confirmar que toda cor de série usa `var(--color-chart-1)` .. `var(--color-chart-5)` (já expostos em `app/globals.css` `@theme inline`) em vez de hex/paleta padrão da lib. Para os demais arquivos, aplicar a tabela de substituição padrão.

- [ ] **Step 3: Checklist manual — números tabulares (`anti-patterns.md` § "Tabular data without tabular-nums")**

Ler `table.tsx`, `data-table.tsx` e `pagination.tsx`: qualquer célula que exiba número, preço, data ou métrica precisa de `font-variant-numeric: tabular-nums` (via classe utilitária `tabular-nums` do Tailwind) para que as colunas alinhem verticalmente. Se ausente, é um achado.

- [ ] **Step 4: Checklist manual — `avatar.tsx` fallback**

Confirmar que o fallback (iniciais/placeholder) usa tokens de cor (`bg-muted text-muted-foreground` ou similar), não uma cor de fundo aleatória gerada por hash sem tokenização.

- [ ] **Step 5: Aplicar todos os fixes dos Steps 2-4**

- [ ] **Step 6: Re-rodar o grep do Step 2 para confirmar zero ocorrências**

- [ ] **Step 7: Rodar lint, testes de Storybook e build**

```bash
cd packages/prumo && npm run lint && npx vitest run && npm run build-storybook
```

- [ ] **Step 8: Commit**

```bash
git add components/ui/table.tsx components/ui/data-table.tsx components/ui/chart.tsx components/ui/avatar.tsx components/ui/aspect-ratio.tsx components/ui/item.tsx components/ui/breadcrumb.tsx components/ui/pagination.tsx
git commit -m "fix(prumo-audit): grupo data display — paleta de chart tokenizada e tabular-nums"
```

---

### Task 6: Auditar e corrigir — Layout & Navegação

**Files:**
- Modify (conforme achados): `components/ui/sidebar.tsx`, `components/ui/tabs.tsx`, `components/ui/accordion.tsx`, `components/ui/collapsible.tsx`, `components/ui/resizable.tsx`, `components/ui/scroll-area.tsx`, `components/ui/separator.tsx`, `components/ui/direction.tsx`, `components/ui/tour.tsx`, `components/ui/carousel.tsx`, `components/ui/button-group.tsx`
- Test: `stories/Tabs.stories.tsx`, `stories/Accordion.stories.tsx`, `stories/Resizable.stories.tsx`, `stories/ScrollArea.stories.tsx`, `stories/Separator.stories.tsx`, `stories/Carousel.stories.tsx`, `stories/ButtonGroup.stories.tsx`, `stories/ExampleDashboard.stories.tsx` (cobre `sidebar`, que não tem story dedicada)

- [ ] **Step 1: Ler os 11 arquivos**

```bash
cd packages/prumo && cat -n components/ui/sidebar.tsx components/ui/tabs.tsx components/ui/accordion.tsx components/ui/collapsible.tsx components/ui/resizable.tsx components/ui/scroll-area.tsx components/ui/separator.tsx components/ui/direction.tsx components/ui/tour.tsx components/ui/carousel.tsx components/ui/button-group.tsx
```

- [ ] **Step 2: Rodar a detecção de cor crua**

```bash
cd packages/prumo && grep -nE "(bg|text|border|ring|fill|from|via|to)-(red|blue|green|emerald|amber|yellow|slate|gray|zinc|neutral|orange|indigo|purple|pink|sky|cyan|teal|lime)-[0-9]{2,3}" components/ui/sidebar.tsx components/ui/tabs.tsx components/ui/accordion.tsx components/ui/collapsible.tsx components/ui/resizable.tsx components/ui/scroll-area.tsx components/ui/separator.tsx components/ui/direction.tsx components/ui/tour.tsx components/ui/carousel.tsx components/ui/button-group.tsx
```

- [ ] **Step 3: Rodar a detecção de carrossel autoplay sem pausa (`anti-patterns.md` § "Auto-rotating carousels with no pause" — falha WCAG 2.2.2)**

```bash
cd packages/prumo && grep -n "autoplay\|autoPlay\|autoScroll" components/ui/carousel.tsx
```

Se houver autoplay configurado por padrão sem `pause-on-hover-and-focus` nem controle manual visível, é um achado crítico.

- [ ] **Step 4: Checklist manual — `tour.tsx` (usa `driver.js`)**

Confirmar que os estilos do tour (spotlight, popover do passo) usam os tokens do sistema e não a paleta default do `driver.js`. Verificar se existe um arquivo CSS de override (`driver.js` exige CSS próprio importado) e se ele referencia `var(--color-*)`.

- [ ] **Step 5: Aplicar todos os fixes dos Steps 2-4**

- [ ] **Step 6: Re-rodar os greps dos Steps 2-3 para confirmar zero ocorrências**

- [ ] **Step 7: Rodar lint, testes de Storybook e build**

```bash
cd packages/prumo && npm run lint && npx vitest run && npm run build-storybook
```

- [ ] **Step 8: Commit**

```bash
git add components/ui/sidebar.tsx components/ui/tabs.tsx components/ui/accordion.tsx components/ui/collapsible.tsx components/ui/resizable.tsx components/ui/scroll-area.tsx components/ui/separator.tsx components/ui/direction.tsx components/ui/tour.tsx components/ui/carousel.tsx components/ui/button-group.tsx
git commit -m "fix(prumo-audit): grupo layout & navegação — tokens e a11y de carrossel/tour"
```

---

### Task 7: Auditar e corrigir — Composições e Fundação

**Files:**
- Modify (conforme achados): `components/examples/dashboard-example.tsx`, `stories/foundation/Colors.mdx`, `stories/foundation/Radius.mdx`, `stories/foundation/Shadows.mdx`, `stories/foundation/Spacing.mdx`, `stories/foundation/Typography.mdx`, `stories/ShowcaseApp.stories.tsx`, `stories/ShowcaseForms.stories.tsx`, `stories/ShowcaseMeta.stories.tsx`, `stories/ShowcaseOnboarding.stories.tsx`, `stories/ExampleDashboard.stories.tsx`

Diferente das Tasks 2-6 (nível de componente isolado), esta task audita **nível de página/uso** — os mesmos tells de `anti-patterns.md` que se aplicam a uma landing page, porque os Showcases *são* telas compostas.

- [ ] **Step 1: Ler as 5 composições e os 5 docs de fundação**

```bash
cd packages/prumo && cat -n components/examples/dashboard-example.tsx stories/ShowcaseApp.stories.tsx stories/ShowcaseForms.stories.tsx stories/ShowcaseMeta.stories.tsx stories/ShowcaseOnboarding.stories.tsx
```

```bash
cd packages/prumo && cat -n stories/foundation/Colors.mdx stories/foundation/Radius.mdx stories/foundation/Shadows.mdx stories/foundation/Spacing.mdx stories/foundation/Typography.mdx
```

- [ ] **Step 2: Verificar se os docs de fundação ainda batem com os tokens reais após as Tasks 1-6**

```bash
cd packages/prumo && grep -n "oklch(" stories/foundation/Colors.mdx app/globals.css
```

Comparar manualmente os valores hex/oklch documentados em `Colors.mdx` contra os valores reais em `app/globals.css` `:root`/`.dark`. Se alguma Task anterior tiver introduzido um novo token (não deveria — ver Global Constraints), ou se os docs já estivessem desatualizados antes desta auditoria, corrigir o MDX para refletir a fonte da verdade (`globals.css`).

- [ ] **Step 3: Rodar a detecção de métricas inventadas (`anti-patterns.md` § "Invented metrics")**

```bash
cd packages/prumo && grep -nE "[0-9]+% (faster|mais rápido|conversão)|trusted by|confiado por|[0-9]+x (faster|mais rápido)" components/examples/dashboard-example.tsx stories/ShowcaseApp.stories.tsx stories/ShowcaseForms.stories.tsx stories/ShowcaseMeta.stories.tsx stories/ShowcaseOnboarding.stories.tsx
```

Qualquer número estatístico nos dados de exemplo (dashboards, gráficos) deve estar claramente marcado como dado fictício de demonstração (ex.: nomes de empresa fictícios já usados no commit `226b68a`) — não apresentado como métrica real.

- [ ] **Step 4: Checklist manual — grid de 3 colunas / icon-tile card / emoji genérico**

Ler as 4 Showcases e o `dashboard-example.tsx` procurando por: (a) grid de exatamente 3 colunas iguais com ícone-quadrado-colorido + heading + 2 linhas de texto (`anti-patterns.md` § "The 3-column feature grid" / "Icon-tile feature card"); (b) emoji (`✨` `🚀` `⚡` etc.) usado como ícone principal em vez de `lucide-react`. Anotar cada ocorrência.

- [ ] **Step 5: Checklist manual — confirmação vs undo (`interaction-and-states.md` § "Undo over confirm")**

Procurar em `dashboard-example.tsx` e nos Showcases por qualquer uso de `AlertDialog` para uma ação reversível (ex.: remover uma linha de uma lista, arquivar um item). Se existir um `AlertDialog` de confirmação para algo reversível, marcar como achado — trocar por ação otimista + toast com Undo (usando `Toaster`/`sonner` já corrigido na Task 1).

- [ ] **Step 6: Checklist manual — toast celebratório (`anti-patterns.md` § "Celebratory success toasts")**

```bash
cd packages/prumo && grep -n "toast\." components/examples/dashboard-example.tsx stories/ShowcaseApp.stories.tsx stories/ShowcaseForms.stories.tsx stories/ShowcaseMeta.stories.tsx stories/ShowcaseOnboarding.stories.tsx
```

Qualquer `toast.success("...")` disparado após uma ação cujo resultado já é visível na tela (ex.: "Salvo!" depois de editar um campo que já mostra o novo valor) é um achado — trocar por sucesso silencioso.

- [ ] **Step 7: Aplicar todos os fixes dos Steps 2-6**

- [ ] **Step 8: Rodar lint, testes de Storybook e build**

```bash
cd packages/prumo && npm run lint && npx vitest run && npm run build-storybook
```

- [ ] **Step 9: Commit**

```bash
git add components/examples/dashboard-example.tsx stories/foundation/*.mdx stories/ShowcaseApp.stories.tsx stories/ShowcaseForms.stories.tsx stories/ShowcaseMeta.stories.tsx stories/ShowcaseOnboarding.stories.tsx stories/ExampleDashboard.stories.tsx
git commit -m "fix(prumo-audit): composições e fundação — docs sincronizados, sem métricas inventadas ou confirmação desnecessária"
```

---

## Verificação final (após Task 7)

- [ ] Rodar a suíte completa de detecção de cor crua em todo `components/`:

```bash
cd packages/prumo && grep -rnE "(bg|text|border|ring|fill|stroke)-(red|blue|green|emerald|amber|yellow|slate|gray|zinc|neutral|orange|indigo|purple|pink|sky|cyan|teal|lime)-[0-9]{2,3}" components/ | grep -v node_modules
```

Esperado: zero ocorrências (ou apenas ocorrências explicitamente justificadas e comentadas, se alguma task encontrou um caso onde a cor crua era intencional).

- [ ] Rodar a suíte completa uma última vez:

```bash
cd packages/prumo && npm run lint && npx vitest run && npm run build-storybook
```

- [ ] Rodar `npm run storybook` e navegar manualmente pelas 4 Showcases + `ExampleDashboard` em light e dark mode, conferindo que nenhuma superfície ficou com um tom de cinza/azul frio destoando do restante quente da paleta.
