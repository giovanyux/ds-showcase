import { buttonVariants } from "@/lib/button-variants";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { ArrowRight } from "lucide-react";

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
  { label: "Primary", token: "var(--primary)", fg: "white" },
  { label: "Secondary", token: "var(--secondary)", fg: "var(--secondary-foreground)" },
  { label: "Destructive", token: "var(--destructive)", fg: "white" },
  { label: "Success", token: "var(--success)", fg: "white" },
  { label: "Warning", token: "var(--warning)", fg: "black" },
  { label: "Info", token: "var(--info)", fg: "white" },
];

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight">Prumo</span>
        <ModeToggle />
      </header>

      <main className="flex-1 px-6 py-16 md:px-12 md:py-24 max-w-4xl mx-auto w-full space-y-20">
        <section className="space-y-6">
          <Badge variant="outline">Design System</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Prumo</h1>
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
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Princípios</h2>
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
          <h2 className="text-xl font-semibold">Amostra de tokens</h2>
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
      </main>

      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted-foreground">
        Prumo — Design System
      </footer>
    </div>
  );
}
