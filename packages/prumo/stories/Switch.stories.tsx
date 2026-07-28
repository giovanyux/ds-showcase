import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Interruptor' },
}

export const Ativado: Story = {
  args: { defaultChecked: true, 'aria-label': 'Interruptor ativado' },
}

export const ComLabel: Story = {
  name: 'Com label',
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="catalogo-ativo" defaultChecked />
      <Label htmlFor="catalogo-ativo">Catálogo ativo</Label>
    </div>
  ),
}

export const Desabilitado: Story = {
  args: { disabled: true, 'aria-label': 'Interruptor desabilitado' },
}

export const ListaConfiguracoes: Story = {
  name: 'Lista de configurações',
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      {[
        { id: 'agendamentos', label: 'Aceitar agendamentos', checked: true },
        { id: 'domicilio', label: 'Domicílio ativo', checked: true },
        { id: 'retirada', label: 'Retirada no local', checked: false },
        { id: 'agendamento', label: 'Agendamento', checked: false },
      ].map(item => (
        <div key={item.id} className="flex items-center justify-between">
          <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
          <Switch id={item.id} defaultChecked={item.checked} />
        </div>
      ))}
    </div>
  ),
}
