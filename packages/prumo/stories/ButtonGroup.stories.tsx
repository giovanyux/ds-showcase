import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic } from 'lucide-react'
import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Componentes/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Dia</Button>
      <Button variant="outline">Semana</Button>
      <Button variant="outline">Mês</Button>
    </ButtonGroup>
  ),
}

export const ComIcones: Story = {
  name: 'Com ícones',
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Alinhar à esquerda"><AlignLeft /></Button>
      <Button variant="outline" size="icon" aria-label="Centralizar"><AlignCenter /></Button>
      <Button variant="outline" size="icon" aria-label="Alinhar à direita"><AlignRight /></Button>
    </ButtonGroup>
  ),
}

export const ComSeparador: Story = {
  name: 'Com separador e texto',
  render: () => (
    <ButtonGroup>
      <Button variant="outline"><Bold />Negrito</Button>
      <ButtonGroupSeparator />
      <Button variant="outline"><Italic />Itálico</Button>
    </ButtonGroup>
  ),
}

export const AtivoInativo: Story = {
  name: 'Período — ativo/inativo',
  render: () => (
    <ButtonGroup>
      <Button variant="default">Hoje</Button>
      <Button variant="outline">7 dias</Button>
      <Button variant="outline">30 dias</Button>
      <Button variant="outline">Personalizado</Button>
    </ButtonGroup>
  ),
}
