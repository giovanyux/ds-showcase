import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const meta = {
  title: 'Componentes/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: 'Nome do negócio' },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ComInput: Story = {
  name: 'Com input',
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="nome-rest">Nome do negócio</Label>
      <Input id="nome-rest" placeholder="Ex: Negócio Exemplo" />
    </div>
  ),
}

export const ComCheckbox: Story = {
  name: 'Com checkbox',
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="termos" />
      <Label htmlFor="termos">Aceito os termos de uso</Label>
    </div>
  ),
}
