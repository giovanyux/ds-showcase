import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const meta = {
  title: 'Componentes/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: 'Opção' },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
}

export const ComIcone: Story = {
  name: 'Com ícone',
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Negrito"><Bold /></Toggle>
      <Toggle aria-label="Itálico"><Italic /></Toggle>
      <Toggle aria-label="Sublinhado"><Underline /></Toggle>
    </div>
  ),
}

export const GrupoAlinhamento: Story = {
  name: 'Grupo — alinhamento (seleção única)',
  render: () => (
    <ToggleGroup defaultValue={['left']}>
      <ToggleGroupItem value="left" aria-label="Alinhar à esquerda"><AlignLeft /></ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Centralizar"><AlignCenter /></ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Alinhar à direita"><AlignRight /></ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const GrupoMultiplo: Story = {
  name: 'Grupo — seleção múltipla',
  render: () => (
    <ToggleGroup multiple>
      <ToggleGroupItem value="bold" aria-label="Negrito"><Bold /></ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Itálico"><Italic /></ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Sublinhado"><Underline /></ToggleGroupItem>
    </ToggleGroup>
  ),
}
