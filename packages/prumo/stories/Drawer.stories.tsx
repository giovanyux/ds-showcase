import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Componentes/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Detalhes do agendamento #1042</DrawerTitle>
          <DrawerDescription>Pizza Margherita · R$ 42,00 · Domicílio</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 space-y-2 text-sm text-muted-foreground">
          <p>Cliente: João Silva</p>
          <p>Endereço: Rua das Flores, 123</p>
          <p>Tempo estimado: 35 min</p>
        </div>
        <DrawerFooter>
          <Button>Confirmar agendamento</Button>
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const PelaEsquerda: Story = {
  name: 'Pela esquerda',
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Prumo</DrawerTitle>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 px-4">
          {['Dashboard', 'Catálogo', 'Agendamentos', 'Relatórios'].map(item => (
            <button key={item} className="text-left px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors">
              {item}
            </button>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  ),
}
