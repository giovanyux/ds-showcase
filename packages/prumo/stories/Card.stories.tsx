import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: [],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Negócio Exemplo</CardTitle>
        <CardDescription>Catálogo atualizado há 2 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">42 itens no catálogo · 3 categorias</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">Ver catálogo</Button>
      </CardFooter>
    </Card>
  ),
}

export const Interativo: Story = {
  name: 'Interativo (hover)',
  render: () => (
    <Card variant="interactive" className="w-72 cursor-pointer">
      <CardHeader>
        <CardTitle>Hamburgeria Central</CardTitle>
        <CardDescription>15 agendamentos hoje</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge variant="success">ABERTO</Badge>
          <span className="text-sm text-muted-foreground">Fecha às 23h</span>
        </div>
      </CardContent>
    </Card>
  ),
}

export const MetricaVendas: Story = {
  name: 'Métrica de vendas',
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {[
        { title: 'Receita hoje', value: 'R$ 1.847', change: '+12%', icon: DollarSign, variant: 'success' as const },
        { title: 'Agendamentos', value: '42', change: '+8%', icon: ShoppingBag, variant: 'default' as const },
        { title: 'Clientes', value: '38', change: '+5%', icon: Users, variant: 'secondary' as const },
        { title: 'Ticket médio', value: 'R$ 44', change: '+3%', icon: TrendingUp, variant: 'warning' as const },
      ].map(({ title, value, change, icon: Icon, variant }) => (
        <Card key={title} className="w-40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>{title}</CardDescription>
              <Icon className="size-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">{value}</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={variant}>{change}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
