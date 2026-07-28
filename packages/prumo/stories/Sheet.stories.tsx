import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/Sheet',
  component: Sheet,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const PelaDireita: Story = {
  name: 'Pela direita (padrão)',
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Abrir painel</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar item</SheetTitle>
          <SheetDescription>Faça alterações no item do catálogo.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="sheet-nome">Nome do item</Label>
            <Input id="sheet-nome" defaultValue="Pizza Margherita" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sheet-preco">Preço</Label>
            <Input id="sheet-preco" defaultValue="R$ 42,00" />
          </div>
        </div>
        <SheetFooter>
          <Button className="w-full">Salvar alterações</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const PelaEsquerda: Story = {
  name: 'Pela esquerda',
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Menu lateral</Button>} />
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navegação</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4">
          {['Dashboard', 'Catálogo', 'Agendamentos', 'Relatórios', 'Configurações'].map(item => (
            <button key={item} className="text-left px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors">
              {item}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  ),
}

export const PelaBaixo: Story = {
  name: 'Pela baixo',
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Filtros</Button>} />
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Filtrar agendamentos</SheetTitle>
          <SheetDescription>Selecione os filtros para refinar a lista.</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-3 p-4">
          {['Hoje', 'Esta semana', 'Este mês', 'Personalizado'].map(f => (
            <Button key={f} variant="outline" size="sm">{f}</Button>
          ))}
        </div>
        <SheetFooter>
          <Button className="w-full">Aplicar filtros</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
