import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const meta = {
  title: 'Componentes/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { className: 'w-96' },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Info className="size-4" />
      <AlertTitle>Informação</AlertTitle>
      <AlertDescription>Seu catálogo está visível para os clientes.</AlertDescription>
    </Alert>
  ),
}

export const Destrutivo: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertCircle className="size-4" />
      <AlertTitle>Erro ao salvar</AlertTitle>
      <AlertDescription>Não foi possível salvar as alterações. Tente novamente.</AlertDescription>
    </Alert>
  ),
}

export const Sucesso: Story = {
  render: () => (
    // `text-success` is calibrated for use as a fill/border accent, not as
    // small body text on a near-white tint — it falls short of 4.5:1 there.
    // We intentionally use raw Tailwind `emerald-700`/`dark:emerald-400`
    // here instead of the `--success` design token: it's the same
    // text-on-tint override already used in badge.tsx for this exact
    // problem, so this keeps the two "success text" treatments consistent
    // with each other rather than inventing a third one. This does mean two
    // conventions for "success text" now coexist (token-based for
    // fills/borders, raw Tailwind for small text-on-tint) — fixing that by
    // recalibrating `--success`/`--warning` themselves is out of scope for
    // this a11y-gate task; tracked as follow-up token work, not redone here.
    <Alert className="w-96 border-success/30 bg-success/5 text-emerald-700 dark:text-emerald-400">
      <CheckCircle2 className="size-4" />
      <AlertTitle>Agendamento confirmado</AlertTitle>
      <AlertDescription className="text-emerald-700 dark:text-emerald-400">O agendamento #1042 foi confirmado e está em preparo.</AlertDescription>
    </Alert>
  ),
}

export const Aviso: Story = {
  render: () => (
    // Same rationale as Sucesso above: raw Tailwind `amber-700`/
    // `dark:amber-400` mirrors badge.tsx's verified warning text-on-tint
    // combination rather than the `--warning` token, which doesn't clear
    // 4.5:1 as small text on a near-white tint. See the longer note on
    // Sucesso above — recalibrating the token itself is out of scope here.
    <Alert className="w-96 border-warning/30 bg-warning/5 text-amber-700 dark:text-amber-400">
      <AlertTriangle className="size-4" />
      <AlertTitle>Plano expirando</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-400">Seu plano expira em 3 dias. Renove para continuar recebendo agendamentos.</AlertDescription>
    </Alert>
  ),
}
