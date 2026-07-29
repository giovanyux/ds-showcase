import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table'

// ─── Dados de agendamentos ────────────────────────────────────────────────

type Agendamento = {
  id: string
  cliente: string
  item: string
  valor: number
  status: 'Concluído' | 'Confirmado' | 'Em andamento' | 'Cancelado'
}

const AGENDAMENTOS: Agendamento[] = [
  { id: '#1042', cliente: 'João Silva',   item: 'Corte + Barba',           valor: 42, status: 'Concluído' },
  { id: '#1043', cliente: 'Maria Souza',  item: 'Manicure + Pedicure',      valor: 28, status: 'Confirmado' },
  { id: '#1044', cliente: 'Pedro Costa',  item: 'Consultoria inicial',      valor: 65, status: 'Em andamento' },
  { id: '#1045', cliente: 'Ana Lima',     item: 'Limpeza padrão',           valor: 32, status: 'Cancelado' },
  { id: '#1046', cliente: 'Carlos Neto',  item: 'Corte de cabelo',          valor: 38, status: 'Concluído' },
  { id: '#1047', cliente: 'Lucia Braga',  item: 'Massagem relaxante',       valor: 55, status: 'Confirmado' },
  { id: '#1048', cliente: 'Rafael Melo',  item: 'Retoque expresso',         valor: 22, status: 'Concluído' },
  { id: '#1049', cliente: 'Fernanda Paz', item: 'Coloração',                valor: 48, status: 'Em andamento' },
  { id: '#1050', cliente: 'Bruno Dias',   item: 'Corte completo',           valor: 35, status: 'Concluído' },
  { id: '#1051', cliente: 'Camila Reis',  item: 'Tratamento capilar',       valor: 72, status: 'Confirmado' },
  { id: '#1052', cliente: 'Diego Faria',  item: 'Consultoria rápida',       valor: 29, status: 'Cancelado' },
  { id: '#1053', cliente: 'Patrícia Lins',item: 'Pacote completo',          valor: 89, status: 'Concluído' },
]

const STATUS_VARIANT = {
  'Concluído':     'success',
  'Confirmado':    'default',
  'Em andamento':  'warning',
  'Cancelado':     'destructive',
} as const

// ─── Colunas básicas ──────────────────────────────────────────────────────

const colunasAgendamento: ColumnDef<Agendamento>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Selecionar todas"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Agendamento" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue('id')}</span>,
  },
  {
    accessorKey: 'cliente',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cliente" />,
  },
  {
    accessorKey: 'item',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Item" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.getValue('item')}</span>,
  },
  {
    accessorKey: 'valor',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Valor" />,
    cell: ({ row }) => {
      const valor = row.getValue<number>('valor')
      return <span className="font-medium">R$ {valor.toFixed(2).replace('.', ',')}</span>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue<Agendamento['status']>('status')
      return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
    },
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Ações</span>,
    cell: () => (
      <Button variant="ghost" size="icon-sm" aria-label="Mais opções">
        <MoreHorizontal />
      </Button>
    ),
    enableSorting: false,
  },
]

// ─── Meta ─────────────────────────────────────────────────────────────────

const meta = {
  title: 'Componentes/DataTable',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ──────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Tabela de agendamentos',
  render: () => (
    <DataTable columns={colunasAgendamento} data={AGENDAMENTOS} />
  ),
}

export const ComBusca: Story = {
  name: 'Com busca global',
  render: () => (
    <DataTable
      columns={colunasAgendamento}
      data={AGENDAMENTOS}
      searchable
      searchPlaceholder="Buscar agendamento ou cliente..."
    />
  ),
}

export const SemPaginacao: Story = {
  name: 'Sem paginação',
  render: () => (
    <DataTable columns={colunasAgendamento} data={AGENDAMENTOS.slice(0, 5)} pagination={false} />
  ),
}

export const Vazia: Story = {
  name: 'Estado vazio',
  render: () => (
    <DataTable columns={colunasAgendamento} data={[]} searchable />
  ),
}
