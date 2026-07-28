import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const ITENS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  nome: `Item do catálogo ${i + 1}`,
  preco: `R$ ${(Math.random() * 80 + 15).toFixed(2)}`,
}))

const meta = {
  title: 'Componentes/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-64 w-64 rounded-lg border">
      <div className="p-3">
        <h4 className="mb-2 text-sm font-semibold">Itens do catálogo</h4>
        {ITENS.map((item, i) => (
          <div key={item.id}>
            <div className="flex items-center justify-between py-1.5 text-sm">
              <span>{item.nome}</span>
              <span className="text-muted-foreground">{item.preco}</span>
            </div>
            {i < ITENS.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-72 whitespace-nowrap rounded-lg border">
      <div className="flex gap-3 p-3">
        {['Entradas', 'Pizzas', 'Hambúrgueres', 'Bebidas', 'Extras', 'Saladas', 'Serviços executivos'].map(cat => (
          <div key={cat} className="shrink-0 rounded-lg bg-muted px-3 py-1.5 text-sm font-medium">
            {cat}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}
