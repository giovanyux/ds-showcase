import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  LayoutDashboard, ShoppingCart, Users, TrendingUp, TrendingDown,
  Package, Settings, Bell, Search, ChevronDown, MoreHorizontal,
  ArrowUpRight, Activity, DollarSign, CreditCard,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const meta: Meta = {
  title: 'Showcases/Dashboard',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ─── Mock data ──────────────────────────────────────────────────────────────

const revenueData = [
  { dia: 'Seg', receita: 4200, despesa: 2400 },
  { dia: 'Ter', receita: 3800, despesa: 1398 },
  { dia: 'Qua', receita: 5600, despesa: 3800 },
  { dia: 'Qui', receita: 4900, despesa: 3908 },
  { dia: 'Sex', receita: 7200, despesa: 4800 },
  { dia: 'Sáb', receita: 8100, despesa: 3800 },
  { dia: 'Dom', receita: 6300, despesa: 4300 },
]

const agendamentos = [
  { id: '#AGD-001', cliente: 'Ana Souza',    produto: 'Corte + Barba',        valor: 'R$ 89,90',  status: 'Concluído',   avatar: 'AS' },
  { id: '#AGD-002', cliente: 'Carlos Lima',  produto: 'Manicure + Pedicure',  valor: 'R$ 64,50',  status: 'Confirmado',  avatar: 'CL' },
  { id: '#AGD-003', cliente: 'Mariana Koch', produto: 'Pacote completo',      valor: 'R$ 142,00', status: 'A caminho',   avatar: 'MK' },
  { id: '#AGD-004', cliente: 'Felipe Alves', produto: 'Consultoria inicial',  valor: 'R$ 45,90',  status: 'Concluído',   avatar: 'FA' },
  { id: '#AGD-005', cliente: 'Juliana Reis', produto: 'Retoque expresso',     valor: 'R$ 28,00',  status: 'Cancelado',   avatar: 'JR' },
]

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'Concluído':   'default',
  'Confirmado':  'secondary',
  'A caminho':   'outline',
  'Cancelado':   'destructive',
}

const produtos = [
  { nome: 'Corte + Barba',       vendidos: 142, estoque: 87, pct: 87 },
  { nome: 'Manicure + Pedicure', vendidos: 98,  estoque: 43, pct: 43 },
  { nome: 'Pacote completo',     vendidos: 76,  estoque: 62, pct: 62 },
  { nome: 'Consultoria inicial', vendidos: 64,  estoque: 94, pct: 94 },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function Sidebar({ active = 'dashboard' }: { active?: string }) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'agendamentos', icon: ShoppingCart, label: 'Agendamentos' },
    { id: 'clientes',  icon: Users,           label: 'Clientes' },
    { id: 'produtos',  icon: Package,         label: 'Produtos' },
  ]
  return (
    <aside className="w-60 shrink-0 border-r border-border bg-sidebar flex flex-col h-full">
      <div className="px-4 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary-foreground">Ei</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground leading-none">Eixo</p>
            <p className="text-xs text-muted-foreground mt-0.5">Painel Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ id, icon: Icon, label }) => (
          <div
            key={id}
            className={`flex items-center gap-3 px-3 h-9 rounded-md text-sm cursor-pointer transition-colors select-none ${
              active === id
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }`}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </div>
        ))}
      </nav>

      <div className="px-3 pb-4 border-t border-sidebar-border pt-4">
        <div className="flex items-center gap-3 px-3 h-9 rounded-md text-sm cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <Settings className="size-4 shrink-0" />
          Configurações
        </div>
      </div>

      <div className="px-3 pb-4">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-sidebar-accent">
          <Avatar className="size-7 shrink-0">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">GJ</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground truncate">Giovany Junior</p>
            <p className="text-[11px] text-muted-foreground">Admin</p>
          </div>
          <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
        </div>
      </div>
    </aside>
  )
}

function Topbar() {
  return (
    <header className="shrink-0 h-14 flex items-center border-b border-border bg-background px-6 gap-4">
      <div>
        <p className="text-sm font-semibold text-foreground">Empresa Exemplo</p>
        <p className="text-xs text-muted-foreground">Bem-vindo de volta!</p>
      </div>

      <div className="flex-1 max-w-sm ml-auto relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        <input
          className="w-full h-8 pl-8 pr-3 text-sm bg-muted rounded-md border border-input placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Buscar agendamentos, clientes..."
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="size-8 relative">
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-primary" />
        </Button>
        <Avatar className="size-8">
          <AvatarFallback className="text-xs bg-primary text-primary-foreground">GJ</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

const kpis = [
  {
    title: 'Receita Total',
    value: 'R$ 45.231,89',
    change: '+20,1% este mês',
    positive: true,
    icon: DollarSign,
    description: 'em relação ao mês anterior',
  },
  {
    title: 'Agendamentos',
    value: '+2.350',
    change: '+180,1% este mês',
    positive: true,
    icon: ShoppingCart,
    description: 'agendamentos realizados',
  },
  {
    title: 'Clientes Ativos',
    value: '+12.234',
    change: '+19% este mês',
    positive: true,
    icon: Users,
    description: 'clientes cadastrados',
  },
  {
    title: 'Taxa de Retorno',
    value: '57,3%',
    change: '-4,2% este mês',
    positive: false,
    icon: Activity,
    description: 'clientes que voltaram',
  },
]

function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Page title */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Visão geral do seu negócio</p>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon
              return (
                <Card key={kpi.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                    <Icon className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                    <p className={`text-xs mt-1 flex items-center gap-1 ${kpi.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                      {kpi.positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {kpi.change}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Chart + Top Produtos */}
          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Receita da Semana</CardTitle>
                <CardDescription>Receita e despesas dos últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="dia" tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: 'var(--color-foreground)', fontWeight: 600 }}
                      formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                    />
                    <Area type="monotone" dataKey="receita" stroke="var(--color-primary)" strokeWidth={2} fill="url(#colorReceita)" name="Receita" />
                    <Area type="monotone" dataKey="despesa" stroke="var(--color-muted-foreground)" strokeWidth={1.5} fill="none" strokeDasharray="4 3" name="Despesa" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Produtos</CardTitle>
                <CardDescription>Mais vendidos esta semana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {produtos.map((p) => (
                  <div key={p.nome} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-medium truncate max-w-[160px]">{p.nome}</span>
                      <span className="text-muted-foreground shrink-0 ml-2">{p.vendidos} un.</span>
                    </div>
                    <Progress value={p.pct} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Agendamentos recentes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Agendamentos Recentes</CardTitle>
                <CardDescription>Você tem {agendamentos.length} agendamentos hoje</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Ver todos
                <ArrowUpRight className="size-3.5 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="todos">
                <div className="px-6 pb-2">
                  <TabsList className="h-8">
                    <TabsTrigger value="todos" className="text-xs">Todos</TabsTrigger>
                    <TabsTrigger value="andamento" className="text-xs">Em andamento</TabsTrigger>
                    <TabsTrigger value="concluidos" className="text-xs">Concluídos</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="todos">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Agendamento</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead className="w-10" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agendamentos.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium text-xs text-muted-foreground">{p.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="size-6">
                                <AvatarFallback className="text-[10px]">{p.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{p.cliente}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{p.produto}</TableCell>
                          <TableCell>
                            <Badge variant={statusVariant[p.status]} className="text-xs">{p.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium text-sm">{p.valor}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-7">
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Imprimir recibo</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Cancelar agendamento</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="andamento">
                  <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                    1 agendamento em andamento
                  </div>
                </TabsContent>
                <TabsContent value="concluidos">
                  <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                    2 agendamentos concluídos hoje
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <DashboardPage />,
}
