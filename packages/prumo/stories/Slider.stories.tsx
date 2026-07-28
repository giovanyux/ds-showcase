import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { className: 'w-64', defaultValue: [50] },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Slider de valor' },
}

export const ComLabel: Story = {
  name: 'Com label',
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Label htmlFor="raio-entrega">Raio de entrega: 5 km</Label>
      <Slider id="raio-entrega" aria-label="Raio de entrega em km" defaultValue={[5]} min={1} max={30} step={1} />
    </div>
  ),
}

export const RangePreco: Story = {
  name: 'Range de preço',
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Label htmlFor="faixa-preco">Faixa de preço: R$10 — R$80</Label>
      <Slider id="faixa-preco" aria-label="Faixa de preço" defaultValue={[10, 80]} min={0} max={200} step={5} />
    </div>
  ),
}

export const Desabilitado: Story = {
  args: { disabled: true, defaultValue: [40], 'aria-label': 'Slider desabilitado' },
}
