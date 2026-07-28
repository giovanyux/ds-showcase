# Prumo — Reforma de identidade e profundidade (design)

## Contexto

O Prumo (`packages/prumo`) é um design system maduro dentro do monorepo `ds-showcase` (portfólio pessoal que também abriga o Eixo): 58 componentes shadcn/ui customizados, tokens em OKLCH, dark mode nativo, Storybook 10 com a11y integrado. Apesar da maturidade técnica, a identidade visual atual (teal + slate + Inter) é genérica — indistinguível de qualquer template shadcn/ui padrão — e a documentação, embora funcional, não demonstra profundidade de raciocínio de design.

**Objetivo:** usar o Prumo como peça de portfólio para candidaturas (frontend/design engineer e product design, ainda não definido qual). "Profissional" aqui significa duas coisas em paridade: aparência visual distinta e profundidade de conteúdo/raciocínio — não só polish estético.

**Referência de identidade:** capa do LinkedIn do usuário (`giovanyux.github.io/portfolio`), extraída via Figma (`get_design_context`, file `AvHU5BVZSaS5LfGJ2xRdSq`, node `2015:454`):
- Fundo: `#FFF3EC` (creme pêssego)
- Texto/título: `#5F2016` (oxblood) — texto secundário é a mesma cor a 40% de opacidade
- Acento: `#219FDD` (azul céu)
- Terciário: `#BFA6A2` (mauve empoeirado)
- Blob decorativo: gradiente aurora radial (coral `rgba(251,135,110,1)` → areia → sálvia → menta → azul `rgba(66,164,255,1)`), usado como elemento de assinatura visual, não como cor de UI
- Tipografia do título: Hiragino Sans (fonte de sistema Apple, não licenciada para web) — substituída por **Zen Kaku Gothic New** (Google Fonts), a alternativa web-embeddable mais próxima na mesma família de gótica japonesa

## Escopo

Reforma sequenciada em 4 fases (abordagem "fatiada por camada" — cada fase é revisável e shippable isoladamente; evita quebrar o Storybook no meio do processo, que é o risco de fazer tudo simultaneamente).

### Fase 1 — Fundação: tokens + tipografia + correção de contraste

Reestrutura `app/globals.css` mantendo a arquitetura atual (CSS custom properties em OKLCH, `@theme inline`, blocos `:root`/`.dark`), substituindo a paleta:

| Token | Light | Dark | Nota |
|---|---|---|---|
| `--background` | `#FFFBF7` | `#1C120F` | O pêssego saturado (`#FFF3EC`) fica reservado para hero/marketing, não para fundo geral de UI densa (tabelas, formulários) — evita fadiga visual |
| `--foreground` | `#2B1410` | `#F5E9E2` | Substitui slate-900/50 |
| `--primary` | `#5F2016` (oxblood) | `#FB876E` (coral, do próprio gradiente aurora) | Oxblood sobre branco resolve definitivamente o "revisar contraste" marcado no código atual (teal `oklch(0.491 0.270 165)`). No dark, oxblood puro ficaria escuro demais como cor de destaque, por isso o coral do gradiente assume o papel de tom de marca |
| `--secondary` / `--muted` | `#F5EDE7` | `#2B211D` | Substitui slate-100/800 (neutro frio → neutro quente/stone) |
| `--info` | `#219FDD` | tom mais claro equivalente | Direto da referência |
| `--success` | verde sálvia `~#4F7A5B` | tom mais claro equivalente | Extraído do stop "sage" do gradiente aurora |
| `--destructive` | vermelho tijolo `~#B3261E` | tom mais claro equivalente | Ajustado para combinar com a paleta quente |
| `--radius` base | 10px (era 6px) | — | Cantos mais generosos, ecoando o chip pill da referência |
| `--shadow-*` | tingidas de oxblood (era teal) | — | Mesma técnica multi-layer já existente no arquivo, só troca o tingimento |

Tipografia dual: **Zen Kaku Gothic New** para títulos/display (H1–H3, landing), **Inter** mantido para corpo/UI densa — uma gótica japonesa em texto pequeno prejudica legibilidade em telas de formulário/tabela.

Todo par texto/fundo (light e dark) deve fechar WCAG AA (≥4.5:1 para texto normal) antes de a fase ser considerada concluída — validação manual dos tokens, não só do primary.

**Escopo do arquivo:** só `globals.css` + import de fonte + `layout.tsx`. Nenhum componente individual é tocado — os 58 herdam a paleta nova via CSS vars, e essa herança automática é o próprio teste de que a arquitetura de tokens está correta.

### Fase 2 — Landing + narrativa

Mantém o esqueleto atual de `app/page.tsx` (hero → princípios → amostra de tokens), com a casca visual atualizada para a identidade nova, e adiciona uma seção nova de narrativa (`components/case-study.tsx`):

- Texto corrido, tom editorial (não cards/bullets tipo spec sheet), ecoando o tom da headline de referência ("da pesquisa com usuários ao componente em produção")
- Conteúdo: o raciocínio de design real por trás das decisões do Prumo (por que a identidade mudou de teal genérico para uma paleta própria; por que radius generoso; por que dois pesos tipográficos) — **não inventa pesquisa de usuário que não existiu**; o Prumo é explicitamente uma peça de demonstração de habilidade, e a narrativa é honesta sobre isso, ancorada no raciocínio de design que de fato aconteceu
- Título da seção grande em Zen Kaku Gothic New, corpo em coluna larga e legível (`max-w-2xl`), possível pull-quote para quebrar o ritmo de leitura
- Hero ganha um wash sutil do gradiente aurora como assinatura visual, restrito a essa seção — não vaza para tokens de componente
- Rodapé com links: Storybook, repositório, portfólio pessoal

### Fase 3 — Profundidade de documentação

Documentar os 58 componentes no mesmo nível não é viável nem é o que um recrutador lê. Aprofunda um subconjunto "vitrine" em MDX (`stories/*.mdx`, seguindo o padrão que já existe parcialmente em `Button.mdx`/`Card.mdx`):

- **Guidelines de uso** — quando usar vs. não usar (ex: `Dialog` vs `Sheet` vs `Drawer`)
- **Do's/Don'ts** — 2-3 exemplos visuais lado a lado por componente
- **Notas de acessibilidade** — comportamento de teclado/screen reader específico, expondo em texto o que o addon de a11y do Storybook já valida automaticamente

Componentes no escopo desta fase: `Button`, `Card`, `Dialog`/`Sheet`/`Drawer` (documentados em conjunto, como comparação), `Form`/`Field`, `Table`/`DataTable`, `Select`/`Combobox`, `Sidebar`.

### Fase 4 — Verificação

- Após a Fase 1, revisão visual completa dos 58 componentes no Storybook (light + dark); addon de a11y roda automaticamente em cada story e expõe regressões de contraste
- Conferência manual dos pares de contraste dos tokens novos (texto/fundo, botão primário, badges semânticos) contra WCAG AA antes de fechar a Fase 1
- `npm run build` ao final de cada fase, replicando o que o Vercel roda no deploy
- Fases 2 e 3 são aditivas (landing + MDX novo) — não quebram componentes existentes; o risco ali é visual/de conteúdo, revisado antes de avançar de fase

## Fora de escopo

- Reescrever ou aprofundar documentação dos 51 componentes restantes fora da lista "vitrine" da Fase 3
- Mudanças no Eixo (o segundo DS do monorepo)
- Pesquisa de usuário real, testes de usabilidade ou qualquer artefato que implique um processo que não ocorreu
- Reprodução literal do blob aurora animado (Motion/keyframes) da referência — usado apenas como inspiração de paleta, não como componente a replicar 1:1
