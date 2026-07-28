import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Opção' },
}

export const Marcado: Story = {
  args: { defaultChecked: true, 'aria-label': 'Opção marcada' },
}

export const ComLabel: Story = {
  name: 'Com label',
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="destaque" />
      <Label htmlFor="destaque">Destacar no catálogo</Label>
    </div>
  ),
}

export const Desabilitado: Story = {
  args: { disabled: true, 'aria-label': 'Opção desabilitada' },
}

export const DesabilitadoMarcado: Story = {
  name: 'Desabilitado marcado',
  args: { disabled: true, defaultChecked: true, 'aria-label': 'Opção desabilitada marcada' },
}

export const ListaOpcoes: Story = {
  name: 'Lista de opções',
  render: () => (
    <div className="flex flex-col gap-3">
      {['Opção A', 'Opção B', 'Opção C', 'Opção D'].map(op => (
        <div key={op} className="flex items-center gap-2">
          <Checkbox id={op} />
          <Label htmlFor={op}>{op}</Label>
        </div>
      ))}
    </div>
  ),
}
