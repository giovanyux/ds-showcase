import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Heart, MessageCircle, Share2, Star, MapPin, Phone, Mail, Globe,
  TrendingUp, TrendingDown, MoreHorizontal, Bell, CheckCircle2,
  AlertCircle, Info, Package, Users, DollarSign, Activity,
  ArrowUpRight, Bookmark, ShoppingCart, Clock, ExternalLink,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const meta: Meta = {
  title: 'Showcases/Cards',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ─── Card: Perfil ────────────────────────────────────────────────────────────

function CardPerfil() {
  const [liked, setLiked] = useState(false)
  return (
    <Card className="w-72">
      <CardHeader className="text-center pb-3">
        <div className="relative mx-auto w-fit">
          <Avatar className="size-20 mx-auto">
            <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">MK</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 size-5 bg-emerald-500 rounded-full border-2 border-card" />
        </div>
        <CardTitle className="mt-3">Mariana Koch</CardTitle>
        <CardDescription>Designer de Produto · São Paulo</CardDescription>
        <div className="flex justify-center gap-1 flex-wrap mt-1">
          <Badge variant="secondary">UI/UX</Badge>
          <Badge variant="secondary">Figma</Badge>
          <Badge variant="secondary">Pesquisa</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Especialista em design de sistemas e experiência do usuário para produtos digitais.
        </p>
        <div className="flex justify-center gap-6 mt-4 text-center">
          {[{ v: '142', l: 'Posts' }, { v: '4.2k', l: 'Seguidores' }, { v: '318', l: 'Seguindo' }].map(({ v, l }) => (
            <div key={l}>
              <p className="font-bold text-foreground">{v}</p>
              <p className="text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="flex-1">Seguir</Button>
        <Button variant="outline" className="flex-1">Mensagem</Button>
      </CardFooter>
    </Card>
  )
}

// ─── Card: Produto ───────────────────────────────────────────────────────────

function CardProduto({ nome = 'Pizza Margherita', preco = 'R$ 49,90', categoria = 'Pizzas', rating = 4.8, vendas = 324, destaque = false }) {
  const [saved, setSaved] = useState(false)
  return (
    <Card className="w-64 overflow-hidden">
      <div className="relative bg-muted h-44 flex items-center justify-center">
        <div className="text-6xl select-none">🍕</div>
        {destaque && (
          <Badge className="absolute top-3 left-3">Destaque</Badge>
        )}
        <button
          className="absolute top-3 right-3 size-7 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
          onClick={() => setSaved((v) => !v)}
        >
          <Bookmark className={`size-4 transition-colors ${saved ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
        </button>
      </div>
      <CardContent className="pt-4 pb-3">
        <p className="text-xs text-muted-foreground">{categoria}</p>
        <h3 className="font-semibold text-foreground mt-0.5">{nome}</h3>
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">({vendas} vendas)</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 justify-between">
        <span className="font-bold text-foreground">{preco}</span>
        <Button size="sm" className="gap-1.5">
          <ShoppingCart className="size-3.5" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  )
}

// ─── Card: Métrica ───────────────────────────────────────────────────────────

function CardMetrica({ titulo = 'Receita Mensal', valor = 'R$ 28.450', change = '+12,5%', positive = true, icon: Icon = DollarSign, desc = 'vs. mês anterior' }) {
  return (
    <Card className="w-56">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">{titulo}</CardTitle>
        <div className={`size-8 rounded-lg flex items-center justify-center ${positive ? 'bg-primary/10' : 'bg-destructive/10'}`}>
          <Icon className={`size-4 ${positive ? 'text-primary' : 'text-destructive'}`} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-foreground">{valor}</p>
        <div className={`flex items-center gap-1 mt-1.5 text-xs ${positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
          {positive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
          <span className="font-medium">{change}</span>
          <span className="text-muted-foreground font-normal">{desc}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Card: Notificação ───────────────────────────────────────────────────────

function CardNotificacoes() {
  const notifs = [
    { tipo: 'success', icone: CheckCircle2, cor: 'text-emerald-500', titulo: 'Pagamento confirmado', desc: 'Agendamento #1234 foi pago com sucesso', tempo: '2 min' },
    { tipo: 'warning', icone: AlertCircle, cor: 'text-amber-500', titulo: 'Estoque crítico', desc: 'Pizza Frango abaixo de 5 unidades', tempo: '18 min' },
    { tipo: 'info', icone: Info, cor: 'text-blue-500', titulo: 'Novo cliente cadastrado', desc: 'Maria Silva criou uma conta', tempo: '1 h' },
    { tipo: 'default', icone: Bell, cor: 'text-muted-foreground', titulo: 'Relatório disponível', desc: 'Relatório de abril foi gerado', tempo: '3 h' },
  ]
  return (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Notificações</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">{notifs.length}</Badge>
          <button className="text-xs text-primary hover:underline">Marcar lidas</button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1 p-0">
        {notifs.map((n, i) => (
          <div key={i} className="flex items-start gap-3 px-6 py-3 hover:bg-muted/40 transition-colors cursor-pointer">
            <n.icone className={`size-4 shrink-0 mt-0.5 ${n.cor}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-none">{n.titulo}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{n.desc}</p>
            </div>
            <span className="text-[11px] text-muted-foreground shrink-0">{n.tempo}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-3 pb-4">
        <Button variant="ghost" size="sm" className="w-full text-xs">Ver todas as notificações</Button>
      </CardFooter>
    </Card>
  )
}

// ─── Card: Negócio (contato) ─────────────────────────────────────────────

function CardNegócio() {
  return (
    <Card className="w-72">
      <div className="h-28 bg-gradient-to-br from-primary/30 to-primary/10 relative rounded-t-xl overflow-hidden">
        <div className="absolute bottom-3 left-4">
          <Avatar className="size-14 border-2 border-card">
            <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">BP</AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="text-xs">Parceiro</Badge>
        </div>
      </div>
      <CardContent className="pt-3 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-foreground">Bonna Pizza</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Italiana · Pizza · Massas</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">4.9</span>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="space-y-2">
          {[
            { icon: MapPin, text: 'Av. Paulista, 1578 — SP' },
            { icon: Phone, text: '(11) 9 8765-4321' },
            { icon: Clock, text: 'Aberto · Fecha às 23h' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="size-3.5 shrink-0 text-primary" />
              {text}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Button variant="outline" size="sm" className="flex-1">Ver catálogo</Button>
        <Button size="sm" className="flex-1">Pedir agora</Button>
      </CardFooter>
    </Card>
  )
}

// ─── Card: Progresso / metas ─────────────────────────────────────────────────

function CardMetas() {
  const metas = [
    { label: 'Agendamentos do mês', atual: 234, meta: 300, cor: 'bg-primary' },
    { label: 'Receita (R$)',   atual: 28450, meta: 35000, cor: 'bg-emerald-500' },
    { label: 'Novos clientes', atual: 48, meta: 50, cor: 'bg-amber-500' },
    { label: 'Avaliações 5★',  atual: 37, meta: 60, cor: 'bg-blue-500' },
  ]
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle className="text-base">Metas de Maio</CardTitle>
        <CardDescription>Acompanhe seu progresso mensal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metas.map((m) => {
          const pct = Math.round((m.atual / m.meta) * 100)
          return (
            <div key={m.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">{m.label}</span>
                <span className={`text-xs font-semibold ${pct >= 100 ? 'text-emerald-500' : 'text-muted-foreground'}`}>{pct}%</span>
              </div>
              <Progress value={Math.min(pct, 100)} className="h-1.5" />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{typeof m.atual === 'number' && m.label.includes('R$') ? `R$ ${m.atual.toLocaleString('pt-BR')}` : m.atual}</span>
                <span>meta: {typeof m.meta === 'number' && m.label.includes('R$') ? `R$ ${m.meta.toLocaleString('pt-BR')}` : m.meta}</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

// ─── Card: Agendamento resumo ─────────────────────────────────────────────────────

function CardAgendamento() {
  return (
    <Card className="w-72">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div>
          <CardTitle className="text-base">Agendamento #PED-2847</CardTitle>
          <CardDescription>há 12 minutos</CardDescription>
        </div>
        <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400">
          Em preparo
        </Badge>
      </CardHeader>
      <CardContent className="pb-3 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">LC</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">Luís Carvalho</p>
            <p className="text-xs text-muted-foreground">Entrega · Rua das Flores, 42</p>
          </div>
        </div>
        <Separator />
        <div className="space-y-1.5">
          {[
            { qt: 2, nome: 'Pizza Margherita G',  preco: 'R$ 79,80' },
            { qt: 1, nome: 'Coca-Cola 2L',         preco: 'R$ 12,00' },
            { qt: 1, nome: 'Borda Recheada',        preco: 'R$ 8,00' },
          ].map(({ qt, nome, preco }) => (
            <div key={nome} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{qt}× {nome}</span>
              <span className="font-medium text-foreground">{preco}</span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between text-sm font-bold">
          <span>Total</span>
          <span>R$ 99,80</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Button variant="outline" size="sm" className="flex-1 text-xs">Detalhes</Button>
        <Button size="sm" className="flex-1 text-xs">Marcar como pronto</Button>
      </CardFooter>
    </Card>
  )
}

// ─── Gallery page ─────────────────────────────────────────────────────────────

function CardsGallery() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Cards</h1>
          <p className="text-sm text-muted-foreground">Variações de cards do shadcn/ui com dados reais</p>
        </div>

        {/* Métricas */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Métricas</h2>
          <div className="flex flex-wrap gap-4">
            <CardMetrica titulo="Receita Mensal" valor="R$ 28.450" change="+12,5%" positive icon={DollarSign} desc="vs. mês anterior" />
            <CardMetrica titulo="Agendamentos" valor="2.350" change="+8,2%" positive icon={ShoppingCart} desc="este mês" />
            <CardMetrica titulo="Clientes Ativos" valor="1.204" change="-3,1%" positive={false} icon={Users} desc="vs. semana anterior" />
            <CardMetrica titulo="Taxa de Conversão" valor="57,3%" change="+2,4%" positive icon={Activity} desc="mês atual" />
          </div>
        </section>

        <Separator />

        {/* Perfil + Negócio */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Perfis</h2>
          <div className="flex flex-wrap gap-4 items-start">
            <CardPerfil />
            <CardNegócio />
            <CardAgendamento />
          </div>
        </section>

        <Separator />

        {/* Produto */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Produtos</h2>
          <div className="flex flex-wrap gap-4 items-start">
            <CardProduto destaque />
            <CardProduto nome="Hambúrguer Smash" preco="R$ 34,90" categoria="Hambúrgueres" rating={4.6} vendas={218} />
            <CardProduto nome="Açaí 500ml" preco="R$ 24,90" categoria="Extras" rating={4.9} vendas={512} />
          </div>
        </section>

        <Separator />

        {/* Notificações + Metas */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Compostos</h2>
          <div className="flex flex-wrap gap-4 items-start">
            <CardNotificacoes />
            <CardMetas />
          </div>
        </section>

        <Separator />

        {/* Badge variants */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Badge Variants</h2>
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>Status de Agendamentos</CardTitle>
              <CardDescription>Todas as variantes de badge disponíveis</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 pt-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Entregue</Badge>
              <Badge variant="warning">Em preparo</Badge>
              <Badge variant="info">Aguardando</Badge>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <CardsGallery />,
}
