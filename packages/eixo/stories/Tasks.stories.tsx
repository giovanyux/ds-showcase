import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Plus, Search, Filter, MoreHorizontal, ChevronDown,
  Circle, Clock, CheckCircle2, XCircle, AlertCircle,
  ArrowUp, ArrowDown, Minus,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'

const meta: Meta = {
  title: 'Showcases/Tasks',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ─── Types & data ────────────────────────────────────────────────────────────

type Status = 'backlog' | 'fazer' | 'progresso' | 'revisao' | 'concluido' | 'cancelado'
type Priority = 'urgente' | 'alta' | 'media' | 'baixa'

interface Task {
  id: string
  titulo: string
  status: Status
  prioridade: Priority
  responsavel: string
  avatarInitials: string
  tag: string
  data: string
  checked: boolean
}

const initialTasks: Task[] = [
  { id: 'TASK-001', titulo: 'Implementar página de catálogo digital',     status: 'progresso', prioridade: 'urgente', responsavel: 'Ana Souza',    avatarInitials: 'AS', tag: 'Feature',    data: '06/05', checked: false },
  { id: 'TASK-002', titulo: 'Corrigir bug no cálculo de frete',           status: 'fazer',     prioridade: 'alta',   responsavel: 'Carlos Lima',   avatarInitials: 'CL', tag: 'Bug',        data: '07/05', checked: false },
  { id: 'TASK-003', titulo: 'Criar relatório de vendas por período',      status: 'backlog',   prioridade: 'media',  responsavel: 'Mariana Koch',  avatarInitials: 'MK', tag: 'Feature',    data: '10/05', checked: false },
  { id: 'TASK-004', titulo: 'Revisar fluxo de onboarding',                status: 'revisao',   prioridade: 'media',  responsavel: 'Felipe Alves',  avatarInitials: 'FA', tag: 'Melhoria',   data: '08/05', checked: false },
  { id: 'TASK-005', titulo: 'Migrar banco de dados para PostgreSQL',      status: 'concluido', prioridade: 'alta',   responsavel: 'Juliana Reis',  avatarInitials: 'JR', tag: 'Infra',      data: '04/05', checked: true  },
  { id: 'TASK-006', titulo: 'Adicionar suporte a múltiplos idiomas',      status: 'backlog',   prioridade: 'baixa',  responsavel: 'Ricardo Neto',  avatarInitials: 'RN', tag: 'Feature',    data: '15/05', checked: false },
  { id: 'TASK-007', titulo: 'Testes automatizados para checkout',         status: 'fazer',     prioridade: 'alta',   responsavel: 'Ana Souza',     avatarInitials: 'AS', tag: 'Qualidade',  data: '09/05', checked: false },
  { id: 'TASK-008', titulo: 'Documentar API de agendamentos',                  status: 'progresso', prioridade: 'media',  responsavel: 'Carlos Lima',   avatarInitials: 'CL', tag: 'Docs',       data: '08/05', checked: false },
  { id: 'TASK-009', titulo: 'Implementar notificações por WhatsApp',      status: 'backlog',   prioridade: 'alta',   responsavel: 'Mariana Koch',  avatarInitials: 'MK', tag: 'Feature',    data: '12/05', checked: false },
  { id: 'TASK-010', titulo: 'Otimizar queries lentas do dashboard',       status: 'cancelado', prioridade: 'urgente',responsavel: 'Felipe Alves',  avatarInitials: 'FA', tag: 'Infra',      data: '03/05', checked: false },
]

const statusConfig: Record<Status, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  backlog:   { label: 'Backlog',      icon: Circle,       color: 'text-muted-foreground' },
  fazer:     { label: 'A fazer',      icon: Clock,        color: 'text-blue-500' },
  progresso: { label: 'Em progresso', icon: AlertCircle,  color: 'text-amber-500' },
  revisao:   { label: 'Em revisão',   icon: AlertCircle,  color: 'text-purple-500' },
  concluido: { label: 'Concluído',    icon: CheckCircle2, color: 'text-emerald-500' },
  cancelado: { label: 'Cancelado',    icon: XCircle,      color: 'text-destructive' },
}

const priorityConfig: Record<Priority, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  urgente: { label: 'Urgente', icon: ArrowUp,   color: 'text-destructive' },
  alta:    { label: 'Alta',    icon: ArrowUp,   color: 'text-amber-500' },
  media:   { label: 'Média',   icon: Minus,     color: 'text-muted-foreground' },
  baixa:   { label: 'Baixa',   icon: ArrowDown, color: 'text-blue-400' },
}

const tagColors: Record<string, string> = {
  Feature:   'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Bug:       'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  Melhoria:  'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Infra:     'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  Qualidade: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Docs:      'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
}

// ─── Criar tarefa modal ──────────────────────────────────────────────────────

function CriarTarefaDialog({ onAdd }: { onAdd: (t: Task) => void }) {
  const [open, setOpen] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [status, setStatus] = useState<Status>('fazer')
  const [prioridade, setPrioridade] = useState<Priority>('media')
  const [tag, setTag] = useState('Feature')

  function handleCreate() {
    if (!titulo.trim()) return
    onAdd({
      id: `TASK-${String(Math.floor(Math.random() * 900) + 100)}`,
      titulo,
      status,
      prioridade,
      responsavel: 'Você',
      avatarInitials: 'VX',
      tag,
      data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      checked: false,
    })
    setTitulo('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4 mr-1.5" />
          Nova tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar nova tarefa</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Descreva a tarefa..."
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <Label>Descrição (opcional)</Label>
            <Textarea placeholder="Contexto adicional..." className="resize-none" rows={3} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="fazer">A fazer</SelectItem>
                  <SelectItem value="progresso">Em progresso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Prioridade</Label>
              <Select value={prioridade} onValueChange={(v) => setPrioridade(v as Priority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgente">Urgente</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Tag</Label>
              <Select value={tag} onValueChange={setTag}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Feature">Feature</SelectItem>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Melhoria">Melhoria</SelectItem>
                  <SelectItem value="Infra">Infra</SelectItem>
                  <SelectItem value="Docs">Docs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreate} disabled={!titulo.trim()}>Criar tarefa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Tasks page ──────────────────────────────────────────────────────────────

function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<Set<Status>>(new Set())
  const [filterPriority, setFilterPriority] = useState<Set<Priority>>(new Set())

  function toggleCheck(id: string) {
    setTasks((ts) => ts.map((t) => t.id === id ? { ...t, checked: !t.checked, status: !t.checked ? 'concluido' : 'fazer' } : t))
  }

  function addTask(t: Task) {
    setTasks((ts) => [t, ...ts])
  }

  const filtered = tasks.filter((t) => {
    const matchSearch = t.titulo.toLowerCase().includes(search.toLowerCase()) || t.id.includes(search)
    const matchStatus = filterStatus.size === 0 || filterStatus.has(t.status)
    const matchPriority = filterPriority.size === 0 || filterPriority.has(t.prioridade)
    return matchSearch && matchStatus && matchPriority
  })

  function toggleStatus(s: Status) {
    setFilterStatus((prev) => {
      const next = new Set(prev)
      next.has(s) ? next.delete(s) : next.add(s)
      return next
    })
  }
  function togglePriority(p: Priority) {
    setFilterPriority((prev) => {
      const next = new Set(prev)
      next.has(p) ? next.delete(p) : next.add(p)
      return next
    })
  }

  const stats = {
    total: tasks.length,
    concluidas: tasks.filter((t) => t.status === 'concluido').length,
    emProgresso: tasks.filter((t) => t.status === 'progresso').length,
    urgentes: tasks.filter((t) => t.prioridade === 'urgente' && t.status !== 'concluido').length,
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Tarefas</h1>
            <p className="text-sm text-muted-foreground">{stats.total} tarefas no total</p>
          </div>
          <CriarTarefaDialog onAdd={addTask} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total', value: stats.total, color: 'text-foreground' },
            { label: 'Concluídas', value: stats.concluidas, color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Em progresso', value: stats.emProgresso, color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Urgentes', value: stats.urgentes, color: 'text-destructive' },
          ].map((s) => (
            <Card key={s.label} className="py-4">
              <CardContent className="text-center p-0">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              className="pl-8 h-8 text-sm"
              placeholder="Buscar tarefas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Filter className="size-3.5" />
                Status
                {filterStatus.size > 0 && (
                  <Badge variant="secondary" className="h-4 px-1 text-[10px] ml-0.5">{filterStatus.size}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(statusConfig) as Status[]).map((s) => {
                const { label, icon: Icon, color } = statusConfig[s]
                return (
                  <DropdownMenuCheckboxItem
                    key={s}
                    checked={filterStatus.has(s)}
                    onCheckedChange={() => toggleStatus(s)}
                  >
                    <Icon className={`size-3.5 mr-2 ${color}`} />
                    {label}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <ChevronDown className="size-3.5" />
                Prioridade
                {filterPriority.size > 0 && (
                  <Badge variant="secondary" className="h-4 px-1 text-[10px] ml-0.5">{filterPriority.size}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtrar por prioridade</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(priorityConfig) as Priority[]).map((p) => {
                const { label, icon: Icon, color } = priorityConfig[p]
                return (
                  <DropdownMenuCheckboxItem
                    key={p}
                    checked={filterPriority.has(p)}
                    onCheckedChange={() => togglePriority(p)}
                  >
                    <Icon className={`size-3.5 mr-2 ${color}`} />
                    {label}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {(filterStatus.size > 0 || filterPriority.size > 0) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={() => { setFilterStatus(new Set()); setFilterPriority(new Set()) }}
            >
              Limpar filtros
            </Button>
          )}

          <p className="ml-auto text-xs text-muted-foreground">{filtered.length} de {tasks.length}</p>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-10" />
                <TableHead className="w-24">ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-28">Prioridade</TableHead>
                <TableHead className="w-24">Tag</TableHead>
                <TableHead className="w-36">Responsável</TableHead>
                <TableHead className="w-20">Data</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12 text-muted-foreground text-sm">
                    Nenhuma tarefa encontrada
                  </TableCell>
                </TableRow>
              ) : filtered.map((task) => {
                const S = statusConfig[task.status]
                const P = priorityConfig[task.prioridade]
                return (
                  <TableRow key={task.id} className={task.checked ? 'opacity-60' : ''}>
                    <TableCell>
                      <Checkbox
                        checked={task.checked}
                        onCheckedChange={() => toggleCheck(task.id)}
                        aria-label={`Marcar "${task.titulo}" como concluída`}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{task.id}</TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${task.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.titulo}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1.5 text-xs font-medium ${S.color}`}>
                        <S.icon className="size-3.5 shrink-0" />
                        {S.label}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1.5 text-xs font-medium ${P.color}`}>
                        <P.icon className="size-3.5 shrink-0" />
                        {P.label}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${tagColors[task.tag] ?? 'bg-muted text-muted-foreground'}`}>
                        {task.tag}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-[10px]">{task.avatarInitials}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground truncate max-w-[80px]">{task.responsavel}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{task.data}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-7">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination stub */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Mostrando {Math.min(filtered.length, 10)} de {filtered.length} resultados
          </p>
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Anterior</Button>
            <Button variant="outline" size="sm" className="h-7 w-7 text-xs bg-primary text-primary-foreground border-primary">1</Button>
            <Button variant="outline" size="sm" className="h-7 w-7 text-xs">2</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">Próximo</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <TasksPage />,
}
