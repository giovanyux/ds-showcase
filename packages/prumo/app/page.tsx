import { buttonVariants } from "@/lib/button-variants";
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
              "radial-gradient(circle at 15% 20%, var(--secondary) 0%, var(--background) 55%)",
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
              href="/prumo/storybook"
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
            <a href="/prumo/storybook" target="_blank" rel="noreferrer" className="hover:text-foreground underline underline-offset-4">
              Storybook
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
