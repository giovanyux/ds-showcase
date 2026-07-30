import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Table> = {
  title: 'Componentes/Table',
  component: Table,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Table>

const agendamentos = [
  { cliente: 'João Silva', servico: 'Corte + Barba', valor: 'R$ 84,00', status: 'Confirmado' },
  { cliente: 'Maria Souza', servico: 'Manicure + Pedicure', valor: 'R$ 45,00', status: 'Novo' },
  { cliente: 'Pedro Costa', servico: 'Consultoria inicial', valor: 'R$ 65,00', status: 'Em andamento' },
]

export const Default: Story = {
  render: () => (
    <Table className="w-[520px]">
      <TableCaption>Agendamentos recentes do Studio Bela.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Serviço</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agendamentos.map((a) => (
          <TableRow key={a.cliente}>
            <TableCell className="font-medium">{a.cliente}</TableCell>
            <TableCell>{a.servico}</TableCell>
            <TableCell>{a.valor}</TableCell>
            <TableCell><Badge variant="outline">{a.status}</Badge></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
