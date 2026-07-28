# Eixo

Storybook com shadcn/ui puro + 2 temas (Reto e Suave), cada um com variante light e dark.

## Como rodar

```bash
npm install
npm run storybook
```

Abre em `http://localhost:6006`.

## Temas

Alterne pelo toolbar do Storybook (ícone de paleta):

| Modo | Classe aplicada no `<html>` |
|---|---|
| Reto Light | `theme-reto` |
| Reto Dark | `theme-reto dark` |
| Suave Light | `theme-suave` |
| Suave Dark | `theme-suave dark` |

- **Reto** — bordas retas, base neutra, primary âmbar
- **Suave** — bordas arredondadas, base neutra, primary azul

Os tokens CSS estão em `src/themes/reto.css` e `src/themes/suave.css`.
Uma versão standalone e comentada do tema Reto (para exportar para outros
projetos Tailwind v4) está em `eixo-reto-theme.css`.

## Showcases disponíveis

| Story | Path no Storybook |
|---|---|
| Dashboard | `Showcases/Dashboard` |
| Forms (Login + Cadastro + Erros) | `Showcases/Forms` |
| Tasks | `Showcases/Tasks` |
| Cards | `Showcases/Cards` |

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind v4 (`@tailwindcss/vite`)
- shadcn/ui (estilo `default`, 26 componentes)
- Storybook 10.3 + `@storybook/addon-themes`
- Recharts (gráficos)

## Estrutura

```
src/
  components/ui/   # componentes shadcn (não editar)
  themes/
    reto.css       # tokens Reto light + dark
    suave.css      # tokens Suave light + dark
  index.css        # @import tailwindcss + temas + @theme inline
  lib/utils.ts     # cn()
stories/
  Dashboard.stories.tsx
  Forms.stories.tsx
  Tasks.stories.tsx
  Cards.stories.tsx
.storybook/
  main.ts
  preview.tsx
```
