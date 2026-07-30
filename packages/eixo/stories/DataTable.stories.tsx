import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof DataTable> = {
  title: 'Componentes/DataTable',
  component: DataTable,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof DataTable>

interface Cliente {
  nome: string
  servico: string
  horario: string
  status: 'confirmado' | 'pendente' | 'cancelado'
}

const clientes: Cliente[] = [
  { nome: 'Mariana Costa', servico: 'Corte + Escova', horario: '09:00', status: 'confirmado' },
  { nome: 'Camila Rocha', servico: 'Coloração', horario: '10:30', status: 'confirmado' },
  { nome: 'Beatriz Lima', servico: 'Manicure', horario: '13:00', status: 'pendente' },
  { nome: 'Fernanda Alves', servico: 'Escova', horario: '14:30', status: 'cancelado' },
  { nome: 'Juliana Prado', servico: 'Corte', horario: '16:00', status: 'confirmado' },
]

const statusVariant: Record<Cliente['status'], 'default' | 'secondary' | 'destructive'> = {
  confirmado: 'default',
  pendente: 'secondary',
  cancelado: 'destructive',
}

const columns: ColumnDef<Cliente>[] = [
  {
    accessorKey: 'nome',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cliente" />,
  },
  {
    accessorKey: 'servico',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Serviço" />,
  },
  {
    accessorKey: 'horario',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Horário" />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
    ),
  },
]

export const Default: Story = {
  render: () => (
    <div className="w-[560px]">
      <DataTable columns={columns} data={clientes} searchable searchPlaceholder="Buscar cliente..." />
    </div>
  ),
}
