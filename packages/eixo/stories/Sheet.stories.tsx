import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Sheet> = {
  title: 'Componentes/Sheet',
  component: Sheet,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Sheet>

export const PelaDireita: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir filtros</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Refine a busca por agendamentos.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}

export const PelaEsquerda: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navegação</SheetTitle>
          <SheetDescription>Acesse as principais áreas do painel.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
