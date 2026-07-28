import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { value: 60, className: 'w-64' },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Indicador de progresso' },
}

export const ComLabel: Story = {
  name: 'Com label',
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <div className="flex justify-between text-sm">
        <Label>Configuração do catálogo</Label>
        <span className="text-muted-foreground">60%</span>
      </div>
      <Progress value={60} aria-label="Configuração do catálogo: 60%" />
    </div>
  ),
}

export const EtapasOnboarding: Story = {
  name: 'Etapas de onboarding',
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      {[
        { label: 'Dados do negócio', value: 100 },
        { label: 'Catálogo criado', value: 75 },
        { label: 'Formas de pagamento', value: 33 },
        { label: 'Integração domicilio', value: 0 },
      ].map(({ label, value }) => (
        <div key={label} className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value}%</span>
          </div>
          <Progress value={value} aria-label={`${label}: ${value}%`} />
        </div>
      ))}
    </div>
  ),
}
