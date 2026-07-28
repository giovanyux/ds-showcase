import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ShoppingBag, Search, FileText } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Componentes/Empty',
  component: Empty,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const SemAgendamentos: Story = {
  name: 'Sem agendamentos',
  render: () => (
    <Empty className="w-80">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingBag />
        </EmptyMedia>
        <EmptyTitle>Nenhum agendamento ainda</EmptyTitle>
        <EmptyDescription>Quando os primeiros agendamentos chegarem, eles aparecerão aqui.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">Compartilhar catálogo</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const SemResultados: Story = {
  name: 'Sem resultados de busca',
  render: () => (
    <Empty className="w-80">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>Nada encontrado</EmptyTitle>
        <EmptyDescription>Tente buscar por outro nome ou categoria.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const SemItens: Story = {
  name: 'Catálogo vazio',
  render: () => (
    <Empty className="w-80">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileText />
        </EmptyMedia>
        <EmptyTitle>Catálogo vazio</EmptyTitle>
        <EmptyDescription>Adicione seu primeiro item para começar a receber agendamentos.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Adicionar item</Button>
      </EmptyContent>
    </Empty>
  ),
}
