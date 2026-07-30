import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import {
  CheckCircle2, ChevronRight, ArrowRight,
  Home, CalendarClock, Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5

const STEP_LABELS = ['Bem-vindo', 'Negócio', 'Operação', 'Pagamentos', 'Pronto!']

// ─── Stepper ─────────────────────────────────────────────────────────────────

function Stepper({ current }: { current: Step }) {
  return (
    <div className="flex items-start justify-center">
      {STEP_LABELS.map((label, i) => {
        const idx = (i + 1) as Step
        const done = idx < current
        const active = idx === current
        return (
          <div key={label} className="flex items-start">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                'flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-all',
                done ? 'bg-primary text-primary-foreground' :
                active ? 'border-2 border-primary text-primary bg-primary/10' :
                'border-2 border-border text-muted-foreground',
              )}>
                {done ? <CheckCircle2 className="size-4" /> : idx}
              </div>
              <span className={cn(
                'text-[10px] font-medium hidden sm:block whitespace-nowrap',
                active ? 'text-primary' : done ? 'text-foreground' : 'text-muted-foreground',
              )}>{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={cn(
                'h-px w-8 sm:w-14 mt-4 transition-all shrink-0',
                done ? 'bg-primary' : 'bg-border',
              )} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Shared header ────────────────────────────────────────────────────────────

function OnboardingHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-6">
      <div className="flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <CalendarClock className="size-3.5" />
        </div>
        <span className="text-sm font-semibold">Painel do negócio</span>
      </div>
      <Badge variant="secondary">Configuração inicial</Badge>
    </header>
  )
}

// ─── Step 1: Bem-vindo ────────────────────────────────────────────────────────

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <CalendarClock className="size-7" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Bem-vindo</h2>
        <p className="text-sm text-muted-foreground">
          Vamos configurar seu negócio em 4 passos simples.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: CalendarClock, label: 'Agenda online', desc: 'Monte sua agenda de serviços' },
          { icon: Home, label: 'Gestão de agendamentos', desc: 'Tempo real, sem papel' },
          { icon: Zap, label: 'Relatórios', desc: 'Dados para decidir' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/40 p-3">
            <Icon className="size-5 text-primary" />
            <p className="text-[11px] font-semibold leading-tight text-center">{label}</p>
            <p className="text-[10px] text-muted-foreground text-center leading-tight">{desc}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1.5 text-left">
        <Label htmlFor="ob-email">Seu e-mail</Label>
        <Input id="ob-email" type="email" defaultValue="joao@exemplo.com" />
      </div>
      <Button className="w-full" onClick={onNext}>
        Começar configuração <ArrowRight className="size-4" />
      </Button>
      <p className="text-xs text-muted-foreground">
        Já tem conta?{' '}
        <span className="text-primary underline cursor-pointer">Fazer login</span>
      </p>
    </div>
  )
}

// ─── Step 2: Negócio ──────────────────────────────────────────────────────────

function BusinessStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [categoria, setCategoria] = useState('salao')

  const cats = [
    { key: 'salao', label: 'Salão de beleza' },
    { key: 'tecnica', label: 'Assistência técnica' },
    { key: 'consultoria', label: 'Consultoria' },
    { key: 'limpeza', label: 'Limpeza' },
    { key: 'estetica', label: 'Estética' },
    { key: 'outros', label: 'Outros' },
  ]

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">Dados do negócio</h2>
        <p className="text-sm text-muted-foreground">
          Essas informações aparecerão na sua agenda pública.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="ob-nome">Nome do negócio</Label>
          <Input id="ob-nome" defaultValue="Studio Bela" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ob-tel">Telefone</Label>
          <Input id="ob-tel" type="tel" defaultValue="(11) 98765-4321" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ob-end">Endereço</Label>
          <Input id="ob-end" defaultValue="Rua das Flores, 123 — São Paulo" />
        </div>
        <div className="space-y-1.5">
          <Label>Categoria</Label>
          <div className="flex flex-wrap gap-2">
            {cats.map(({ key, label }) => (
              <Button
                key={key}
                size="sm"
                variant={categoria === key ? 'default' : 'outline'}
                onClick={() => setCategoria(key)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Voltar</Button>
        <Button onClick={onNext} className="flex-1">
          Próximo <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

// ─── Step 3: Operação ─────────────────────────────────────────────────────────

type DaysMap = Record<'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom', boolean>

const DIAS: { key: keyof DaysMap; short: string }[] = [
  { key: 'seg', short: 'Seg' }, { key: 'ter', short: 'Ter' }, { key: 'qua', short: 'Qua' },
  { key: 'qui', short: 'Qui' }, { key: 'sex', short: 'Sex' }, { key: 'sab', short: 'Sab' },
  { key: 'dom', short: 'Dom' },
]

function OperacaoStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [dias, setDias] = useState<DaysMap>({
    seg: true, ter: true, qua: true, qui: true, sex: true, sab: true, dom: false,
  })
  const [domicilioAtivo, setDomicilioAtivo] = useState(true)

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">Operação</h2>
        <p className="text-sm text-muted-foreground">Configure os horários e o atendimento.</p>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-medium">Dias de funcionamento</p>
        <div className="flex gap-2 flex-wrap">
          {DIAS.map(({ key, short }) => (
            <button
              key={key}
              onClick={() => setDias(prev => ({ ...prev, [key]: !prev[key] }))}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                dias[key]
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:bg-accent',
              )}
            >
              {short}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3 rounded-xl border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Atendimento a domicílio</p>
            <p className="text-xs text-muted-foreground">Aceitar agendamentos a domicílio</p>
          </div>
          <Switch
            checked={domicilioAtivo}
            onCheckedChange={setDomicilioAtivo}
            aria-label="Ativar atendimento a domicílio"
          />
        </div>
        {domicilioAtivo && (
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <Label htmlFor="ob-raio" className="text-xs">Área de atendimento (km)</Label>
              <Input id="ob-raio" defaultValue="5" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ob-min" className="text-xs">Valor mínimo</Label>
              <Input id="ob-min" defaultValue="R$ 30,00" />
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Voltar</Button>
        <Button onClick={onNext} className="flex-1">
          Próximo <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

// ─── Step 4: Pagamentos ───────────────────────────────────────────────────────

type PayMap = Record<'pix' | 'credito' | 'debito' | 'dinheiro' | 'vr', boolean>

const METODOS: { key: keyof PayMap; label: string; desc: string; recommended?: boolean }[] = [
  { key: 'pix', label: 'Pix', desc: 'Pagamento instantâneo sem taxa', recommended: true },
  { key: 'credito', label: 'Cartão de crédito', desc: 'Visa, Mastercard, Elo, Amex' },
  { key: 'debito', label: 'Cartão de débito', desc: 'Débito na maquininha' },
  { key: 'dinheiro', label: 'Dinheiro', desc: 'Pagamento em espécie' },
  { key: 'vr', label: 'Vale-benefício', desc: 'Alelo, Sodexo, VR Benefícios' },
]

function PagamentosStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [pagamentos, setPagamentos] = useState<PayMap>({
    pix: true, credito: true, debito: false, dinheiro: true, vr: false,
  })

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">Formas de pagamento</h2>
        <p className="text-sm text-muted-foreground">Quais formas você aceita?</p>
      </div>
      <div className="space-y-2">
        {METODOS.map(({ key, label, desc, recommended }) => (
          <div
            key={key}
            className={cn(
              'flex items-center justify-between rounded-xl border p-3.5 cursor-pointer transition-colors',
              pagamentos[key] ? 'border-primary/40 bg-primary/5' : 'border-border hover:bg-muted/40',
            )}
            onClick={() => setPagamentos(prev => ({ ...prev, [key]: !prev[key] }))}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{label}</p>
                {recommended && <Badge variant="secondary" className="text-[10px]">Recomendado</Badge>}
              </div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <Switch
              checked={pagamentos[key]}
              onCheckedChange={v => setPagamentos(prev => ({ ...prev, [key]: v }))}
              aria-label={`Aceitar ${label}`}
              onClick={e => e.stopPropagation()}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Voltar</Button>
        <Button onClick={onNext} className="flex-1">
          Próximo <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

// ─── Step 5: Pronto! ──────────────────────────────────────────────────────────

function ProntoStep() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-8" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Tudo pronto!</h2>
        <p className="text-sm text-muted-foreground">
          Seu negócio está configurado e pronto para receber agendamentos.
        </p>
      </div>
      <div className="rounded-xl border border-border bg-muted/40 p-4 text-left space-y-2.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resumo</p>
        {[
          'Studio Bela · São Paulo',
          'Atendimento a domicílio · área de 5 km',
          'Pix, Cartão de crédito e Dinheiro',
          'Aberto Seg–Sab',
        ].map(item => (
          <div key={item} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="size-3.5 text-success shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <Button className="w-full" size="lg">
        Ir para o painel <ArrowRight className="size-4" />
      </Button>
      <p className="text-xs text-muted-foreground">
        Você pode ajustar essas configurações a qualquer momento em Configurações.
      </p>
    </div>
  )
}

// ─── Onboarding shell ─────────────────────────────────────────────────────────

function OnboardingFlow({ initialStep = 1 }: { initialStep?: Step }) {
  const [step, setStep] = useState<Step>(initialStep)

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      <OnboardingHeader />
      <div className="flex flex-1 flex-col items-center gap-8 overflow-auto py-10 px-4">
        <Stepper current={step} />
        <div className="w-full max-w-md">
          {step === 1 && <WelcomeStep onNext={() => setStep(2)} />}
          {step === 2 && <BusinessStep onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <OperacaoStep onNext={() => setStep(4)} onBack={() => setStep(2)} />}
          {step === 4 && <PagamentosStep onNext={() => setStep(5)} onBack={() => setStep(3)} />}
          {step === 5 && <ProntoStep />}
        </div>
      </div>
    </div>
  )
}

// ─── Stories ──────────────────────────────────────────────────────────────────

const meta = {
  title: 'Showcases/Onboarding',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const FluxoCompleto: Story = {
  name: '✅ Fluxo completo',
  render: () => <OnboardingFlow />,
}

export const Concluido: Story = {
  name: '🎉 Tela de conclusão',
  render: () => <OnboardingFlow initialStep={5} />,
}
