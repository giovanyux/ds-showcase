import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const AGENDAMENTOS = [
  { id: '#1042', cliente: 'João Silva', item: 'Pizza Margherita', valor: 'R$ 42,00', status: 'ENTREGUE' as const },
  { id: '#1043', cliente: 'Maria Souza', item: 'Hambúrguer Clássico', valor: 'R$ 28,00', status: 'EM PREPARO' as const },
  { id: '#1044', cliente: 'Pedro Costa', item: 'Coca-Cola 2L + Pizza', valor: 'R$ 65,00', status: 'PENDENTE' as const },
  { id: '#1045', cliente: 'Ana Lima', item: 'Salada Caesar', valor: 'R$ 32,00', status: 'CANCELADO' as const },
]

const STATUS_MAP = {
  'ENTREGUE': 'success',
  'EM PREPARO': 'default',
  'PENDENTE': 'warning',
  'CANCELADO': 'destructive',
} as const

const meta = {
  title: 'Componentes/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Últimos agendamentos do dia</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Agendamento</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {AGENDAMENTOS.map(p => (
          <TableRow key={p.id}>
            <TableCell className="font-medium">{p.id}</TableCell>
            <TableCell>{p.cliente}</TableCell>
            <TableCell className="text-muted-foreground">{p.item}</TableCell>
            <TableCell>{p.valor}</TableCell>
            <TableCell>
              <Badge variant={STATUS_MAP[p.status]}>{p.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="font-medium">Total</TableCell>
          <TableCell className="font-semibold">R$ 167,00</TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

export const ComAcoes: Story = {
  name: 'Com ações por linha',
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-20" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { nome: 'Pizza Margherita', cat: 'Pizzas', preco: 'R$ 42,00', ativo: true },
          { nome: 'Hambúrguer Smash', cat: 'Lanches', preco: 'R$ 35,00', ativo: true },
          { nome: 'Salada Caesar', cat: 'Saladas', preco: 'R$ 28,00', ativo: false },
        ].map(item => (
          <TableRow key={item.nome}>
            <TableCell className="font-medium">{item.nome}</TableCell>
            <TableCell className="text-muted-foreground">{item.cat}</TableCell>
            <TableCell>{item.preco}</TableCell>
            <TableCell>
              <Badge variant={item.ativo ? 'success' : 'secondary'}>
                {item.ativo ? 'ATIVO' : 'INATIVO'}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">Editar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
