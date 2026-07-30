import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import {
  LayoutDashboard, ClipboardList, CalendarClock, Users, BarChart3, Settings,
  Bell, Plus, X, Clock, Wrench, CheckCircle2, XCircle,
  TrendingUp, DollarSign, Download, Phone, Mail, Star,
  ArrowUpRight, MapPin, Edit, ChevronRight, Route,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from '@/components/ui/dialog'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
  SheetDescription, SheetFooter,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useTour } from '@/components/ui/tour'

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = 'dashboard' | 'agendamentos' | 'servicos' | 'clientes' | 'financeiro' | 'configuracoes'
type BookingStatus = 'novo' | 'confirmado' | 'andamento' | 'concluido' | 'cancelado'
type Tier = 'Regular' | 'Frequente' | 'VIP'
type BadgeVar = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'success' | 'warning'

interface Booking {
  id: string; cliente: string; items: string; valor: string
  status: BookingStatus; tipo: string; tempo: string; endereco: string
}
interface ServiceItem {
  id: number; nome: string; categoria: string; preco: string; ativo: boolean; descricao: string
}
interface Cliente {
  id: number; nome: string; email: string; telefone: string
  agendamentos: number; gasto: string; tier: Tier; ultimo: string
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const BOOKINGS_INIT: Booking[] = [
  { id: '#1042', cliente: 'João Silva', items: 'Corte + Barba', valor: 'R$ 84,00', status: 'novo', tipo: 'Domicílio', tempo: '2 min', endereco: 'Rua das Flores, 123 — Ap 45' },
  { id: '#1043', cliente: 'Maria Souza', items: 'Manicure + Pedicure', valor: 'R$ 45,00', status: 'confirmado', tipo: 'Domicílio', tempo: '12 min', endereco: 'Av. Brasil, 900' },
  { id: '#1044', cliente: 'Pedro Costa', items: 'Consultoria inicial', valor: 'R$ 65,00', status: 'andamento', tipo: 'Domicílio', tempo: '28 min', endereco: 'Rua Palmeiras, 55' },
  { id: '#1045', cliente: 'Ana Lima', items: 'Limpeza padrão', valor: 'R$ 32,00', status: 'concluido', tipo: 'Presencial', tempo: '45 min', endereco: '—' },
  { id: '#1046', cliente: 'Carlos Mendes', items: 'Corte completo', valor: 'R$ 58,00', status: 'novo', tipo: 'Domicílio', tempo: '1 min', endereco: 'Rua XV de Nov., 204' },
  { id: '#1047', cliente: 'Fernanda Dias', items: 'Massagem relaxante', valor: 'R$ 28,00', status: 'cancelado', tipo: 'Presencial', tempo: '1h', endereco: '—' },
]

const SERVICOS_INIT: ServiceItem[] = [
  { id: 1, nome: 'Corte de cabelo', categoria: 'Cabelo', preco: 'R$ 42,00', ativo: true, descricao: 'Corte, lavagem e finalização.' },
  { id: 2, nome: 'Corte + Barba', categoria: 'Cabelo', preco: 'R$ 38,00', ativo: true, descricao: 'Corte completo com acabamento de barba.' },
  { id: 3, nome: 'Coloração', categoria: 'Cabelo', preco: 'R$ 45,00', ativo: false, descricao: 'Coloração completa com produtos profissionais.' },
  { id: 4, nome: 'Manicure', categoria: 'Tratamentos', preco: 'R$ 32,00', ativo: true, descricao: 'Cuidado completo das unhas das mãos.' },
  { id: 5, nome: 'Manicure + Pedicure', categoria: 'Tratamentos', preco: 'R$ 45,00', ativo: true, descricao: 'Combo completo de mãos e pés.' },
  { id: 6, nome: 'Limpeza de pele', categoria: 'Tratamentos', preco: 'R$ 28,00', ativo: true, descricao: 'Limpeza profunda com produtos hipoalergênicos.' },
  { id: 7, nome: 'Consultoria rápida', categoria: 'Extras', preco: 'R$ 6,00', ativo: true, descricao: 'Sessão de 15 minutos.' },
  { id: 8, nome: 'Retoque expresso', categoria: 'Extras', preco: 'R$ 12,00', ativo: true, descricao: 'Ajuste rápido entre sessões.' },
]

const CLIENTES_DATA: Cliente[] = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-0001', agendamentos: 24, gasto: 'R$ 892,00', tier: 'VIP', ultimo: 'Hoje' },
  { id: 2, nome: 'Maria Souza', email: 'maria@email.com', telefone: '(11) 88888-0002', agendamentos: 12, gasto: 'R$ 445,00', tier: 'Frequente', ultimo: 'Ontem' },
  { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', telefone: '(11) 77777-0003', agendamentos: 3, gasto: 'R$ 98,00', tier: 'Regular', ultimo: '5 dias' },
  { id: 4, nome: 'Ana Lima', email: 'ana@email.com', telefone: '(11) 66666-0004', agendamentos: 18, gasto: 'R$ 670,00', tier: 'VIP', ultimo: '2 dias' },
  { id: 5, nome: 'Carlos Mendes', email: 'carlos@email.com', telefone: '(11) 55555-0005', agendamentos: 7, gasto: 'R$ 245,00', tier: 'Frequente', ultimo: '3 dias' },
  { id: 6, nome: 'Fernanda Dias', email: 'fernanda@email.com', telefone: '(11) 44444-0006', agendamentos: 1, gasto: 'R$ 32,00', tier: 'Regular', ultimo: '2 sem' },
]

const TRANSACOES = [
  { id: '#1042', desc: 'Corte + Barba', valor: 'R$ 84,00', metodo: 'Pix', hora: '14:32' },
  { id: '#1043', desc: 'Manicure + Pedicure', valor: 'R$ 45,00', metodo: 'Cartão', hora: '13:15' },
  { id: '#1044', desc: 'Consultoria inicial', valor: 'R$ 65,00', metodo: 'Pix', hora: '12:48' },
  { id: '#1045', desc: 'Limpeza padrão', valor: 'R$ 32,00', metodo: 'Dinheiro', hora: '12:05' },
  { id: '#1046', desc: 'Corte completo', valor: 'R$ 58,00', metodo: 'Cartão', hora: '11:30' },
  { id: '#1038', desc: 'Manicure + Pedicure', valor: 'R$ 45,00', metodo: 'Pix', hora: '10:44' },
  { id: '#1037', desc: 'Retoque expresso × 3', valor: 'R$ 36,00', metodo: 'Dinheiro', hora: '10:12' },
]

const STATUS_BADGE: Record<BookingStatus, BadgeVar> = {
  novo: 'default', confirmado: 'warning', andamento: 'default', concluido: 'success', cancelado: 'destructive',
}
const STATUS_LABEL: Record<BookingStatus, string> = {
  novo: 'Novo', confirmado: 'Confirmado', andamento: 'Em andamento', concluido: 'Concluído', cancelado: 'Cancelado',
}
const TIER_BADGE: Record<Tier, BadgeVar> = { VIP: 'default', Frequente: 'warning', Regular: 'secondary' }
const NAV: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agendamentos', label: 'Agendamentos', icon: CalendarClock },
  { id: 'servicos', label: 'Serviços', icon: ClipboardList },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'financeiro', label: 'Financeiro', icon: BarChart3 },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
]

// ─── Shell components ─────────────────────────────────────────────────────────

function Sidebar({ active, onNav }: { active: Page; onNav: (p: Page) => void }) {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-4">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <CalendarClock className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight truncate">Painel do negócio</p>
          <p className="text-[10px] text-muted-foreground truncate">Studio Bela</p>
        </div>
      </div>
      <nav id="tour-nav" aria-label="Navegação principal" className="flex flex-col gap-0.5 p-2 flex-1">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNav(id)}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors text-left',
              active === id
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </button>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <Avatar size="sm"><AvatarFallback>JO</AvatarFallback></Avatar>
          <div className="min-w-0">
            <p className="text-xs font-medium truncate">João Oliveira</p>
            <p className="text-[10px] text-muted-foreground truncate">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

function Header({ page, storeOpen, setStoreOpen }: { page: Page; storeOpen: boolean; setStoreOpen: (v: boolean) => void }) {
  const titles: Record<Page, string> = {
    dashboard: 'Dashboard', agendamentos: 'Agendamentos', servicos: 'Serviços', clientes: 'Clientes',
    financeiro: 'Financeiro', configuracoes: 'Configurações',
  }
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-sm">
      <h1 className="text-base font-semibold">{titles[page]}</h1>
      <div className="flex items-center gap-3">
        <div id="tour-store" className="flex items-center gap-2">
          <Switch id="loja-sw" checked={storeOpen} onCheckedChange={setStoreOpen} aria-label="Status do negócio" />
          <Label htmlFor="loja-sw" className="text-xs cursor-pointer select-none">
            {storeOpen ? <span className="text-success font-medium">Aberto</span> : <span className="text-muted-foreground">Fechado</span>}
          </Label>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="Notificações"><Bell className="size-4" /></Button>
        <Avatar size="sm"><AvatarFallback>JO</AvatarFallback></Avatar>
      </div>
    </header>
  )
}

// ─── Page: Dashboard ─────────────────────────────────────────────────────────

const CHART_DATA = [
  { day: 'Seg', pct: 65 }, { day: 'Ter', pct: 48 }, { day: 'Qua', pct: 72 },
  { day: 'Qui', pct: 55 }, { day: 'Sex', pct: 88 }, { day: 'Sab', pct: 100 },
  { day: 'Dom', pct: 78 },
]

const TOUR_STEPS = [
  {
    title: 'Bem-vindo ao painel!',
    description: 'Este é o seu Dashboard. Aqui você acompanha o desempenho do negócio em tempo real.',
  },
  {
    element: '#tour-kpis',
    title: 'Métricas do dia',
    description: 'Receita, agendamentos, clientes novos e ticket médio — comparados com o dia anterior.',
    side: 'bottom' as const,
  },
  {
    element: '#tour-chart',
    title: 'Receita semanal',
    description: 'Evolução da receita dos últimos 7 dias. O sábado foi seu melhor dia esta semana.',
    side: 'top' as const,
  },
  {
    element: '#tour-recent',
    title: 'Agendamentos recentes',
    description: 'Os últimos agendamentos com status atualizado. Clique em Agendamentos na sidebar para gerenciar todos.',
    side: 'left' as const,
  },
  {
    element: '#tour-nav',
    title: 'Navegação',
    description: 'Acesse Serviços, Clientes, Financeiro e Configurações pelo menu lateral.',
    side: 'right' as const,
  },
  {
    element: '#tour-store',
    title: 'Status do negócio',
    description: 'Abra e feche seu negócio com um clique. Quando fechado, novos agendamentos não são aceitos.',
    side: 'bottom' as const,
  },
]

function DashboardPage() {
  const [bannerVisible, setBannerVisible] = useState(true)
  const { start } = useTour({ steps: TOUR_STEPS })

  const kpis: { label: string; value: string; change: string; icon: React.ElementType; badge: BadgeVar }[] = [
    { label: 'Receita hoje', value: 'R$ 1.847', change: '+12%', icon: DollarSign, badge: 'success' },
    { label: 'Agendamentos', value: '42', change: '+8%', icon: CalendarClock, badge: 'default' },
    { label: 'Clientes novos', value: '8', change: '+23%', icon: Users, badge: 'success' },
    { label: 'Ticket médio', value: 'R$ 44', change: '+3%', icon: TrendingUp, badge: 'warning' },
  ]

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={start}>
          <Route className="size-3.5" />Tour guiado
        </Button>
      </div>

      {bannerVisible && (
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <TrendingUp className="size-4 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Seu negócio está crescendo!</p>
            <p className="text-xs text-muted-foreground">Receita 12% acima da semana passada. Continue assim!</p>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={() => setBannerVisible(false)} aria-label="Dispensar aviso">
            <X className="size-3.5" />
          </Button>
        </div>
      )}

      <div id="tour-kpis" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, change, icon: Icon, badge }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{value}</p>
              <Badge variant={badge} className="mt-2 text-[10px]">
                <ArrowUpRight className="size-2.5" />{change} vs. ontem
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card id="tour-chart" className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Receita — últimos 7 dias</CardTitle>
            <CardDescription className="text-xs">Total: R$ 9.230 · Média diária: R$ 1.319</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 pt-2" style={{ height: '96px' }}>
              {CHART_DATA.map(({ day, pct }) => (
                <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-full flex flex-col justify-end" style={{ height: '76px' }}>
                    <div
                      className={cn('w-full rounded-t-sm transition-all', day === 'Sab' ? 'bg-primary' : 'bg-primary/30')}
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card id="tour-recent" className="lg:col-span-2">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm">Agendamentos recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/60">
              {BOOKINGS_INIT.slice(0, 4).map(o => (
                <div key={o.id} className="flex items-center gap-3 px-5 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{o.cliente}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{o.items}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold">{o.valor}</p>
                    <Badge variant={STATUS_BADGE[o.status]} className="text-[10px] mt-0.5">{STATUS_LABEL[o.status]}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground mb-3">Serviços mais agendados hoje</p>
            {[
              { nome: 'Corte de cabelo', count: 12, pct: 85 },
              { nome: 'Manicure + Pedicure', count: 9, pct: 64 },
              { nome: 'Consultoria inicial', count: 7, pct: 50 },
            ].map(({ nome, count, pct }) => (
              <div key={nome} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium truncate">{nome}</span>
                  <span className="text-muted-foreground shrink-0 ml-2">{count}×</span>
                </div>
                <Progress value={pct} aria-label={nome} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground mb-3">Formas de pagamento</p>
            {[
              { metodo: 'Pix', pct: 52, value: 'R$ 960' },
              { metodo: 'Cartão', pct: 35, value: 'R$ 646' },
              { metodo: 'Dinheiro', pct: 13, value: 'R$ 241' },
            ].map(({ metodo, pct, value }) => (
              <div key={metodo} className="flex items-center gap-3 mb-3 last:mb-0">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{metodo}</span>
                    <span className="text-muted-foreground">{pct}%</span>
                  </div>
                  <Progress value={pct} aria-label={metodo} className="h-1.5" />
                </div>
                <span className="text-xs font-semibold shrink-0">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground mb-3">Status do dia</p>
            <div className="space-y-3">
              {[
                { label: 'Agendamentos aceitos', value: '38', icon: CheckCircle2, color: 'text-success' },
                { label: 'Confirmados', value: '3', icon: Clock, color: 'text-warning' },
                { label: 'Cancelados', value: '1', icon: XCircle, color: 'text-destructive' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className={cn('size-4 shrink-0', color)} />
                  <span className="text-sm flex-1">{label}</span>
                  <span className="text-sm font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ─── Page: Agendamentos ───────────────────────────────────────────────────────

function AgendamentosPage() {
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS_INIT)
  const [tab, setTab] = useState('todos')
  const [selected, setSelected] = useState<Booking | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const counts = {
    todos: bookings.length,
    novo: bookings.filter(o => o.status === 'novo').length,
    confirmado: bookings.filter(o => o.status === 'confirmado').length,
    andamento: bookings.filter(o => o.status === 'andamento').length,
    concluido: bookings.filter(o => o.status === 'concluido').length,
  }
  const filtered = tab === 'todos' ? bookings : bookings.filter(o => o.status === tab)

  const updateStatus = (id: string, status: BookingStatus) =>
    setBookings(prev => prev.map(o => o.id === id ? { ...o, status } : o))

  const openDetail = (booking: Booking) => { setSelected(booking); setDialogOpen(true) }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {[
              { value: 'todos', label: 'Todos', count: counts.todos },
              { value: 'novo', label: 'Novos', count: counts.novo },
              { value: 'confirmado', label: 'Confirmados', count: counts.confirmado },
              { value: 'andamento', label: 'Em andamento', count: counts.andamento },
              { value: 'concluido', label: 'Concluídos', count: counts.concluido },
            ].map(({ value, label, count }) => (
              <TabsTrigger key={value} value={value} className="gap-1.5">
                {label}
                {count > 0 && (
                  <Badge variant={value === 'novo' ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0">
                    {count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button size="sm"><Plus className="size-3.5" />Novo agendamento</Button>
      </div>

      <div className="space-y-2">
        {filtered.map(booking => (
          <Card key={booking.id}>
            <CardContent className="flex items-center gap-4 px-4 py-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                {booking.status === 'novo' && <Clock className="size-4" />}
                {booking.status === 'confirmado' && <Wrench className="size-4" />}
                {booking.status === 'andamento' && <Route className="size-4" />}
                {booking.status === 'concluido' && <CheckCircle2 className="size-4 text-success" />}
                {booking.status === 'cancelado' && <XCircle className="size-4 text-destructive" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold">{booking.id}</span>
                  <span className="text-sm text-muted-foreground">·</span>
                  <span className="text-sm">{booking.cliente}</span>
                  <Badge variant="secondary" className="text-[10px]">{booking.tipo}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{booking.items}</p>
              </div>
              <span className="text-sm font-semibold shrink-0">{booking.valor}</span>
              <Badge variant={STATUS_BADGE[booking.status]}>{STATUS_LABEL[booking.status]}</Badge>
              <div className="flex items-center gap-1.5 shrink-0">
                {booking.status === 'novo' && (
                  <Button size="sm" onClick={() => updateStatus(booking.id, 'confirmado')}>
                    <CheckCircle2 className="size-3.5" />Confirmar
                  </Button>
                )}
                {booking.status === 'confirmado' && (
                  <Button size="sm" variant="outline" onClick={() => updateStatus(booking.id, 'andamento')}>
                    <Route className="size-3.5" />Iniciar
                  </Button>
                )}
                {booking.status === 'andamento' && (
                  <Button size="sm" variant="outline" onClick={() => updateStatus(booking.id, 'concluido')}>
                    <CheckCircle2 className="size-3.5" />Concluir
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => openDetail(booking)}>Detalhes</Button>
                {booking.status !== 'cancelado' && booking.status !== 'concluido' && (
                  <Button size="icon-sm" variant="ghost" aria-label="Cancelar" onClick={() => updateStatus(booking.id, 'cancelado')}>
                    <X className="size-3.5 text-destructive" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-muted-foreground">Nenhum agendamento nesta categoria.</div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={open => setDialogOpen(open)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>Agendamento {selected.id}</DialogTitle>
                <DialogDescription>{selected.cliente} · {selected.tipo} · {selected.tempo} atrás</DialogDescription>
              </DialogHeader>
              <div className="space-y-2.5 text-sm">
                {[
                  ['Serviço', selected.items],
                  ['Endereço', selected.endereco],
                  ['Total', selected.valor],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-muted-foreground shrink-0">{label}</span>
                    <span className="text-right">{val}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={STATUS_BADGE[selected.status]}>{STATUS_LABEL[selected.status]}</Badge>
                </div>
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline">Fechar</Button>} />
                {selected.status === 'novo' && (
                  <Button onClick={() => { updateStatus(selected.id, 'confirmado'); setDialogOpen(false) }}>
                    Confirmar agendamento
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Page: Serviços ───────────────────────────────────────────────────────────

function ServicosPage() {
  const [items, setItems] = useState<ServiceItem[]>(SERVICOS_INIT)
  const [catFilter, setCatFilter] = useState('Todos')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editing, setEditing] = useState<ServiceItem | null>(null)
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [desc, setDesc] = useState('')

  const cats = ['Todos', ...Array.from(new Set(items.map(i => i.categoria)))]
  const filtered = catFilter === 'Todos' ? items : items.filter(i => i.categoria === catFilter)

  const toggleAtivo = (id: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, ativo: !i.ativo } : i))

  const openNew = () => { setEditing(null); setNome(''); setPreco(''); setDesc(''); setSheetOpen(true) }
  const openEdit = (item: ServiceItem) => { setEditing(item); setNome(item.nome); setPreco(item.preco); setDesc(item.descricao); setSheetOpen(true) }

  const saveItem = () => {
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, nome, preco, descricao: desc } : i))
    } else {
      setItems(prev => [...prev, {
        id: Date.now(), nome, preco, descricao: desc,
        categoria: catFilter === 'Todos' ? 'Outros' : catFilter, ativo: true,
      }])
    }
    setSheetOpen(false)
  }

  const deleteItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {cats.map(c => (
            <Button key={c} size="sm" variant={catFilter === c ? 'default' : 'outline'} onClick={() => setCatFilter(c)}>
              {c}
            </Button>
          ))}
        </div>
        <Button size="sm" onClick={openNew}><Plus className="size-3.5" />Novo serviço</Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* `opacity-*` on the whole card would uniformly dim descendant text
            too, dropping small badge text below the 4.5:1 contrast floor
            even though it's compliant at full strength. `grayscale` conveys
            the same "inactive" affordance without touching alpha. */}
        {filtered.map(item => (
          <Card key={item.id} className={cn(!item.ativo && 'grayscale')}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{item.nome}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.descricao}</p>
                  <p className="text-sm font-semibold text-primary mt-2">{item.preco}</p>
                </div>
                <Badge variant="secondary" className="text-[10px] shrink-0">{item.categoria}</Badge>
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id={`item-${item.id}`}
                    checked={item.ativo}
                    onCheckedChange={() => toggleAtivo(item.id)}
                    aria-label={`${item.ativo ? 'Desativar' : 'Ativar'} ${item.nome}`}
                  />
                  <Label htmlFor={`item-${item.id}`} className="text-xs cursor-pointer">
                    {item.ativo ? 'Disponível' : 'Indisponível'}
                  </Label>
                </div>
                <div className="flex gap-1">
                  <Button size="icon-sm" variant="ghost" aria-label="Editar serviço" onClick={() => openEdit(item)}>
                    <Edit className="size-3.5" />
                  </Button>
                  <Button size="icon-sm" variant="ghost" aria-label="Excluir serviço" onClick={() => deleteItem(item.id)}>
                    <X className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={sheetOpen} onOpenChange={open => setSheetOpen(open)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editing ? 'Editar serviço' : 'Novo serviço'}</SheetTitle>
            <SheetDescription>
              {editing ? `Edite as informações de "${editing.nome}".` : 'Adicione um novo serviço à agenda.'}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 p-4">
            <div className="space-y-1.5">
              <Label htmlFor="item-nome">Nome do serviço</Label>
              <Input id="item-nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Corte de cabelo" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="item-preco">Preço</Label>
              <Input id="item-preco" value={preco} onChange={e => setPreco(e.target.value)} placeholder="R$ 0,00" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="item-desc">Descrição</Label>
              <Textarea id="item-desc" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Detalhes do serviço..." />
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setSheetOpen(false)}>Cancelar</Button>
            <Button onClick={saveItem} disabled={!nome.trim() || !preco.trim()}>
              {editing ? 'Salvar alterações' : 'Adicionar serviço'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// ─── Page: Financeiro ─────────────────────────────────────────────────────────

function FinanceiroPage() {
  const [periodo, setPeriodo] = useState('hoje')
  const [exported, setExported] = useState(false)

  const kpis = periodo === 'hoje'
    ? [{ label: 'Receita', value: 'R$ 1.847', change: '+12%', icon: DollarSign, badge: 'success' as BadgeVar }]
    : periodo === '7d'
    ? [{ label: 'Receita', value: 'R$ 9.230', change: '+8%', icon: DollarSign, badge: 'success' as BadgeVar }]
    : [{ label: 'Receita', value: 'R$ 38.400', change: '+5%', icon: DollarSign, badge: 'success' as BadgeVar }]

  const handleExport = () => { setExported(true); setTimeout(() => setExported(false), 3000) }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Tabs value={periodo} onValueChange={setPeriodo}>
          <TabsList>
            <TabsTrigger value="hoje">Hoje</TabsTrigger>
            <TabsTrigger value="7d">7 dias</TabsTrigger>
            <TabsTrigger value="30d">30 dias</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button size="sm" variant={exported ? 'default' : 'outline'} onClick={handleExport}>
          {exported ? <><CheckCircle2 className="size-3.5" />Exportado!</> : <><Download className="size-3.5" />Exportar</>}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Receita bruta', value: kpis[0].value, change: kpis[0].change, icon: DollarSign, badge: 'success' as BadgeVar },
          { label: 'Agendamentos', value: periodo === 'hoje' ? '42' : periodo === '7d' ? '218' : '894', change: '+8%', icon: CalendarClock, badge: 'default' as BadgeVar },
          { label: 'Ticket médio', value: periodo === 'hoje' ? 'R$ 44' : periodo === '7d' ? 'R$ 42' : 'R$ 43', change: '+3%', icon: TrendingUp, badge: 'warning' as BadgeVar },
        ].map(({ label, value, change, icon: Icon, badge }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{value}</p>
              <Badge variant={badge} className="mt-2 text-[10px]">
                <ArrowUpRight className="size-2.5" />{change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Últimas transações</CardTitle>
          <CardDescription className="text-xs">Pagamentos recebidos hoje</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/60">
            {TRANSACOES.map(t => (
              <div key={t.id} className="flex items-center gap-4 px-5 py-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-success/10 text-success">
                  <DollarSign className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{t.desc}</p>
                  <p className="text-xs text-muted-foreground">{t.id} · {t.metodo}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-success">{t.valor}</p>
                  <p className="text-xs text-muted-foreground">{t.hora}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Page: Clientes ───────────────────────────────────────────────────────────

function ClientesPage() {
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState<Tier | 'Todos'>('Todos')
  const [selected, setSelected] = useState<Cliente | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const filtered = CLIENTES_DATA.filter(c => {
    const matchSearch = c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchTier = tierFilter === 'Todos' || c.tier === tierFilter
    return matchSearch && matchTier
  })

  const openCliente = (c: Cliente) => { setSelected(c); setSheetOpen(true) }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Input
            aria-label="Buscar cliente"
            placeholder="Buscar por nome ou e-mail..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {(['Todos', 'VIP', 'Frequente', 'Regular'] as const).map(t => (
          <Button
            key={t}
            size="sm"
            variant={tierFilter === t ? 'default' : 'outline'}
            onClick={() => setTierFilter(t)}
          >
            {t === 'VIP' && <Star className="size-3.5" />}{t}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border/60">
            {filtered.map(c => (
              <div key={c.id} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/40 transition-colors">
                <Avatar>
                  <AvatarFallback>{c.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{c.nome}</p>
                    <Badge variant={TIER_BADGE[c.tier]} className="text-[10px]">{c.tier}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-sm font-semibold">{c.gasto}</p>
                  <p className="text-xs text-muted-foreground">{c.agendamentos} agendamentos</p>
                </div>
                <div className="text-xs text-muted-foreground shrink-0 hidden md:block">
                  Último: {c.ultimo}
                </div>
                <Button size="sm" variant="ghost" onClick={() => openCliente(c)} aria-label={`Ver detalhes de ${c.nome}`}>
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-16 text-center text-sm text-muted-foreground">Nenhum cliente encontrado.</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={open => setSheetOpen(open)}>
        <SheetContent>
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.nome}</SheetTitle>
                <SheetDescription>
                  <Badge variant={TIER_BADGE[selected.tier]}>{selected.tier}</Badge>
                </SheetDescription>
              </SheetHeader>
              <div className="p-4 space-y-4">
                <div className="flex justify-center py-4">
                  <Avatar size="lg">
                    <AvatarFallback className="text-lg">
                      {selected.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2.5 text-sm">
                  {[
                    { icon: Mail, label: selected.email },
                    { icon: Phone, label: selected.telefone },
                    { icon: MapPin, label: 'Rua das Flores, 123 — São Paulo' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 text-muted-foreground">
                      <Icon className="size-4 shrink-0" />{label}
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Total gasto', value: selected.gasto },
                    { label: 'Agendamentos', value: String(selected.agendamentos) },
                    { label: 'Último agendamento', value: selected.ultimo },
                    { label: 'Ticket médio', value: `R$ ${Math.round(parseInt(selected.gasto.replace(/\D/g, '')) / selected.agendamentos / 100)},00` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-muted/60 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-semibold mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <SheetFooter>
                <Button variant="outline" className="w-full" onClick={() => setSheetOpen(false)}>Fechar</Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

// ─── Page: Configurações ──────────────────────────────────────────────────────

function ConfiguracoesPage() {
  type Section = 'geral' | 'horarios' | 'domicilio' | 'pagamentos'
  const [section, setSection] = useState<Section>('geral')
  const [saved, setSaved] = useState(false)
  const [nome, setNome] = useState('Studio Bela')
  const [telefone, setTelefone] = useState('(11) 98765-4321')
  const [endereco, setEndereco] = useState('Rua das Flores, 123 — São Paulo')
  const [horarios, setHorarios] = useState({
    seg: true, ter: true, qua: true, qui: true, sex: true, sab: true, dom: false,
  })
  const [pagamentos, setPagamentos] = useState({
    pix: true, credito: true, debito: true, dinheiro: true, vr: false,
  })
  const [domicilio, setDomicilio] = useState({ ativo: true, raio: '5', valorMin: 'R$ 30,00', taxa: 'R$ 5,00' })

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  const sections: { id: Section; label: string }[] = [
    { id: 'geral', label: 'Geral' },
    { id: 'horarios', label: 'Horários' },
    { id: 'domicilio', label: 'Atendimento a domicílio' },
    { id: 'pagamentos', label: 'Pagamentos' },
  ]
  const dias: { key: keyof typeof horarios; label: string }[] = [
    { key: 'seg', label: 'Segunda' }, { key: 'ter', label: 'Terça' },
    { key: 'qua', label: 'Quarta' }, { key: 'qui', label: 'Quinta' },
    { key: 'sex', label: 'Sexta' }, { key: 'sab', label: 'Sábado' },
    { key: 'dom', label: 'Domingo' },
  ]
  const metodos: { key: keyof typeof pagamentos; label: string }[] = [
    { key: 'pix', label: 'Pix' }, { key: 'credito', label: 'Cartão de crédito' },
    { key: 'debito', label: 'Cartão de débito' }, { key: 'dinheiro', label: 'Dinheiro' },
    { key: 'vr', label: 'Vale-benefício' },
  ]

  return (
    <div className="flex h-full">
      <nav aria-label="Seções de configuração" className="w-44 shrink-0 border-r border-border p-2 space-y-0.5">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={cn(
              'w-full text-left text-sm px-3 py-2 rounded-lg transition-colors',
              section === s.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {section === 'geral' && (
          <div className="max-w-md space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="cfg-nome">Nome do negócio</Label>
              <Input id="cfg-nome" value={nome} onChange={e => setNome(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cfg-tel">Telefone</Label>
              <Input id="cfg-tel" value={telefone} onChange={e => setTelefone(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cfg-end">Endereço</Label>
              <Input id="cfg-end" value={endereco} onChange={e => setEndereco(e.target.value)} />
            </div>
          </div>
        )}

        {section === 'horarios' && (
          <div className="max-w-sm space-y-3">
            <p className="text-sm text-muted-foreground">Configure os dias de funcionamento.</p>
            {dias.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between py-1">
                <Label htmlFor={`dia-${key}`} className="cursor-pointer">{label}</Label>
                <Switch
                  id={`dia-${key}`}
                  checked={horarios[key]}
                  onCheckedChange={v => setHorarios(prev => ({ ...prev, [key]: v }))}
                  aria-label={`Funciona na ${label}`}
                />
              </div>
            ))}
          </div>
        )}

        {section === 'domicilio' && (
          <div className="max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Atendimento a domicílio</p>
                <p className="text-xs text-muted-foreground">Aceitar agendamentos a domicílio</p>
              </div>
              <Switch
                id="domicilio-sw"
                checked={domicilio.ativo}
                onCheckedChange={v => setDomicilio(prev => ({ ...prev, ativo: v }))}
                aria-label="Ativar atendimento a domicílio"
              />
            </div>
            <Separator />
            {[
              { key: 'raio', label: 'Área de atendimento (km)', id: 'cfg-raio' },
              { key: 'valorMin', label: 'Valor mínimo', id: 'cfg-min' },
              { key: 'taxa', label: 'Taxa de atendimento', id: 'cfg-taxa' },
            ].map(({ key, label, id }) => (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  value={domicilio[key as keyof typeof domicilio] as string}
                  onChange={e => setDomicilio(prev => ({ ...prev, [key]: e.target.value }))}
                  disabled={!domicilio.ativo}
                />
              </div>
            ))}
          </div>
        )}

        {section === 'pagamentos' && (
          <div className="max-w-sm space-y-3">
            <p className="text-sm text-muted-foreground">Formas de pagamento aceitas.</p>
            {metodos.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between py-1">
                <Label htmlFor={`pay-${key}`} className="cursor-pointer">{label}</Label>
                <Switch
                  id={`pay-${key}`}
                  checked={pagamentos[key]}
                  onCheckedChange={v => setPagamentos(prev => ({ ...prev, [key]: v }))}
                  aria-label={`Aceitar ${label}`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} variant={saved ? 'default' : 'default'}>
            {saved ? <><CheckCircle2 className="size-3.5" />Salvo!</> : 'Salvar alterações'}
          </Button>
          <Button variant="outline">Descartar</Button>
        </div>
      </div>
    </div>
  )
}

// ─── App Shell ────────────────────────────────────────────────────────────────

function AppShell({ initialPage }: { initialPage: Page }) {
  const [page, setPage] = useState<Page>(initialPage)
  const [storeOpen, setStoreOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans">
      <Sidebar active={page} onNav={setPage} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header page={page} storeOpen={storeOpen} setStoreOpen={setStoreOpen} />
        <main className="flex-1 overflow-auto">
          {page === 'dashboard' && <DashboardPage />}
          {page === 'agendamentos' && <AgendamentosPage />}
          {page === 'servicos' && <ServicosPage />}
          {page === 'clientes' && <ClientesPage />}
          {page === 'financeiro' && <FinanceiroPage />}
          {page === 'configuracoes' && <ConfiguracoesPage />}
        </main>
      </div>
    </div>
  )
}

// ─── Stories ──────────────────────────────────────────────────────────────────

const meta = {
  title: 'Showcases/Painel do Negócio',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const DashboardPrincipal: Story = {
  name: '📊 Dashboard Principal',
  render: () => <AppShell initialPage="dashboard" />,
}

export const PainelAgendamentos: Story = {
  name: '📅 Painel de Agendamentos',
  render: () => <AppShell initialPage="agendamentos" />,
}

export const GestaoServicos: Story = {
  name: '🛠️ Gestão de Serviços',
  render: () => <AppShell initialPage="servicos" />,
}

export const DashboardFinanceiro: Story = {
  name: '💰 Dashboard Financeiro',
  render: () => <AppShell initialPage="financeiro" />,
}

export const BaseClientes: Story = {
  name: '👥 Base de Clientes',
  render: () => <AppShell initialPage="clientes" />,
}

export const CentralConfiguracoes: Story = {
  name: '⚙️ Central de Configurações',
  render: () => <AppShell initialPage="configuracoes" />,
}
