# Prumo

Design system — componentes, tokens e fundações visuais.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)](https://ui.shadcn.com)

---

## Stack

- **Next.js 16** — framework base
- **Tailwind CSS v4** — tokens via CSS custom properties em OKLCH
- **shadcn/ui** — 50+ componentes customizados
- **Storybook 10** — documentação viva com a11y integrado
- **Inter** (corpo/UI) + **Zen Kaku Gothic New** (títulos/display) — tipografia dupla
- **Laranja queimado `#A6520F`** — cor primária, extraída e ajustada a partir da identidade pessoal do autor (5.48:1 de contraste sobre branco ✅)

## Rodando localmente

```bash
npm install
npm run dev        # Next.js em localhost:3000
npm run storybook  # Storybook em localhost:6006
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento Next.js |
| `npm run build` | Build de produção |
| `npm run storybook` | Storybook em desenvolvimento |
| `npm run build-storybook` | Build estático do Storybook |

## Estrutura

```
app/globals.css → Tokens de design (OKLCH, radius, spacing, shadows)
app/page.tsx    → Landing do design system
components/ui/  → Componentes shadcn customizados
components/examples/ → Telas de exemplo compostas (usadas em Examples/*)
stories/        → Stories Storybook + documentação MDX
lib/            → Utilitários (cn, etc.)
hooks/          → React hooks compartilhados
```

## Usando um componente

Todos os componentes ficam em `components/ui/` e são importados diretamente:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

<Button variant="default">Salvar</Button>
<Button variant="destructive">Cancelar</Button>
<Badge variant="success">Concluído</Badge>
```

Variantes, tamanhos e estados de cada componente estão documentados no Storybook.
