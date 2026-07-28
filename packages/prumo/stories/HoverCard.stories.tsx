import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Componentes/HoverCard',
  component: HoverCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link">@negocio_exemplo</Button>} />
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar size="lg">
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Negócio Exemplo</h4>
            <p className="text-xs text-muted-foreground">Especialidade em pizzas artesanais desde 2018.</p>
            <div className="flex gap-1 pt-1">
              <Badge variant="success">ABERTO</Badge>
              <Badge variant="secondary">42 itens</Badge>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const CatalogoItem: Story = {
  name: 'Preview de item',
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<button className="text-sm underline underline-offset-4 cursor-pointer text-primary bg-transparent border-0 p-0">Pizza Margherita</button>} />
      <HoverCardContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Pizza Margherita</h4>
          <p className="text-xs text-muted-foreground">Molho de tomate, mussarela e manjericão fresco.</p>
          <div className="flex items-center justify-between pt-1">
            <span className="font-semibold text-sm">R$ 42,00</span>
            <Badge variant="success">DISPONÍVEL</Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
