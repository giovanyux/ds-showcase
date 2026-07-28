import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { placeholder: 'Descreva o serviço...', className: 'w-80' },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ComLabel: Story = {
  name: 'Com label',
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Label htmlFor="descricao">Descrição do serviço</Label>
      <Textarea id="descricao" placeholder="Ingredientes, preparo, alergênicos..." />
    </div>
  ),
}

export const ComErro: Story = {
  name: 'Com erro',
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Label htmlFor="obs-erro">Observações</Label>
      <Textarea id="obs-erro" aria-invalid="true" defaultValue="..." />
      <p className="text-xs text-destructive">Campo obrigatório.</p>
    </div>
  ),
}

export const Desabilitado: Story = {
  args: { disabled: true, defaultValue: 'Conteúdo fixo não editável.' },
}
