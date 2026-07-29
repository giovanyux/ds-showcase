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
    // emerald-700/400 is the same combination already verified accessible
    // for success text-on-tint in the Badge component.
    <Alert className="w-96 border-success/30 bg-success/5 text-emerald-700 dark:text-emerald-400">
      <CheckCircle2 className="size-4" />
      <AlertTitle>Agendamento confirmado</AlertTitle>
      <AlertDescription className="text-emerald-700 dark:text-emerald-400">O agendamento #1042 foi confirmado e está em preparo.</AlertDescription>
    </Alert>
  ),
}

export const Aviso: Story = {
  render: () => (
    // Same rationale as Sucesso above, mirroring Badge's verified
    // amber-700/400 warning text-on-tint combination.
    <Alert className="w-96 border-warning/30 bg-warning/5 text-amber-700 dark:text-amber-400">
      <AlertTriangle className="size-4" />
      <AlertTitle>Plano expirando</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-400">Seu plano expira em 3 dias. Renove para continuar recebendo agendamentos.</AlertDescription>
    </Alert>
  ),
}
