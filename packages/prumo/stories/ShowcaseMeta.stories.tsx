import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import {
  MessageSquare, Settings, Bell, Megaphone, CheckCircle2,
  XCircle, AlertCircle, Plus, Search,
  Copy, Trash2, Send,
  Phone, Globe, ArrowLeft, Check, Clock, CalendarClock,
  Route, Bold, Italic, Strikethrough, Hash,
  Users, BarChart3, DollarSign, Eye, MousePointerClick,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
  SheetDescription, SheetFooter,
} from '@/components/ui/sheet'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Toggle } from '@/components/ui/toggle'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/ui/empty'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

// ─── Mock data ────────────────────────────────────────────────────────────────

type TemplateStatus = 'aprovado' | 'pendente' | 'rejeitado' | 'rascunho'
type TemplateCategory = 'Marketing' | 'Transacional' | 'Autenticação'

interface Template {
  id: string; nome: string; categoria: TemplateCategory
  idioma: string; status: TemplateStatus; data: string
  body: string; footer?: string
}

const TEMPLATES: Template[] = [
  { id: '1', nome: 'boas_vindas_cliente', categoria: 'Marketing', idioma: 'pt-BR', status: 'aprovado', data: '12/04/2026', body: 'Olá, {{1}}! Seja bem-vindo ao *{{2}}*. Seu cadastro foi confirmado com sucesso 🎉', footer: 'Negócio Exemplo' },
  { id: '2', nome: 'agendamento_confirmado', categoria: 'Transacional', idioma: 'pt-BR', status: 'aprovado', data: '10/04/2026', body: 'Seu agendamento *#{{1}}* foi confirmado! Valor: *R$ {{2}}*. Horário: {{3}}.', footer: 'Negócio Exemplo' },
  { id: '3', nome: 'nova_campanha_abril', categoria: 'Marketing', idioma: 'pt-BR', status: 'pendente', data: '28/04/2026', body: 'Aproveite nossas promoções de abril! Use o cupom *{{1}}* e ganhe {{2}}% de desconto.' },
  { id: '4', nome: 'lembrete_agendamento', categoria: 'Marketing', idioma: 'pt-BR', status: 'rejeitado', data: '20/04/2026', body: 'Oi {{1}}, você tem um agendamento marcado. Confirme sua presença!' },
  { id: '5', nome: 'feedback_atendimento', categoria: 'Transacional', idioma: 'pt-BR', status: 'rascunho', data: '29/04/2026', body: 'Olá {{1}}, seu atendimento foi concluído! Como foi a experiência? Responda de 1 a 5.' },
]

const PAGINAS = [
  { id: 'p1', nome: 'Negócio Exemplo', seguidores: '2.4k', foto: 'NE' },
  { id: 'p2', nome: 'Página Oficial', seguidores: '8.1k', foto: 'PO' },
]

const NUMEROS = [
  { id: 'n1', numero: '+55 11 98765-4321', nome: 'Principal', verificado: true },
  { id: 'n2', numero: '+55 11 91234-5678', nome: 'Domicílio', verificado: false },
]

const CLIENTES = [
  { id: 'c1', nome: 'João Silva', telefone: '+55 11 99000-1111' },
  { id: 'c2', nome: 'Maria Souza', telefone: '+55 11 99000-2222' },
  { id: 'c3', nome: 'Pedro Costa', telefone: '+55 11 99000-3333' },
  { id: 'c4', nome: 'Ana Lima', telefone: '+55 11 99000-4444' },
  { id: 'c5', nome: 'Carlos Mendes', telefone: '+55 11 99000-5555' },
]

const NOTIFICATION_EVENTS = [
  { id: 'ev1', icon: CalendarClock, label: 'Agendamento confirmado', template: TEMPLATES[1], ativo: true },
  { id: 'ev2', icon: Clock, label: 'Confirmado', template: null, ativo: false },
  { id: 'ev3', icon: Route, label: 'A caminho', template: TEMPLATES[1], ativo: true },
  { id: 'ev4', icon: CheckCircle2, label: 'Agendamento concluído', template: null, ativo: false },
  { id: 'ev5', icon: XCircle, label: 'Agendamento cancelado', template: null, ativo: false },
]

// ─── Helper components ────────────────────────────────────────────────────────

function TemplateStatusBadge({ status }: { status: TemplateStatus }) {
  const map: Record<TemplateStatus, { label: string; variant: 'success' | 'warning' | 'destructive' | 'secondary' }> = {
    aprovado: { label: 'Aprovado', variant: 'success' },
    pendente: { label: 'Pendente', variant: 'warning' },
    rejeitado: { label: 'Rejeitado', variant: 'destructive' },
    rascunho: { label: 'Rascunho', variant: 'secondary' },
  }
  const { label, variant } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}

function MessagePreview({ body, footer, buttons }: {
  body: string; footer?: string; buttons?: { label: string; type: string }[]
}) {
  const isEmpty = !body.trim()

  const renderBody = (text: string) =>
    text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
      .replace(/_([^_]+)_/g, '<em>$1</em>')
      .replace(/~([^~]+)~/g, '<s>$1</s>')
      .replace(/\{\{(\d+)\}\}/g, '<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">{{$1}}</mark>')

  return (
    <div className="flex flex-col h-full bg-muted rounded-xl p-4 gap-3">
      {/* Header bar simulado */}
      <div className="flex items-center gap-2 bg-primary rounded-lg px-3 py-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-white/20 text-primary-foreground">
          <MessageSquare className="size-4" />
        </div>
        <div>
          <p className="text-primary-foreground text-xs font-semibold">Negócio Exemplo</p>
          <p className="text-primary-foreground/70 text-[10px]">Canal verificado</p>
        </div>
      </div>

      <div className="flex-1 flex items-end">
        {isEmpty ? (
          <div className="w-full text-center py-8">
            <MessageSquare className="mx-auto mb-2 size-8 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground/60">Sua mensagem aparecerá aqui</p>
          </div>
        ) : (
          <div className="max-w-[85%] bg-card rounded-lg rounded-bl-none shadow-sm px-3 py-2 space-y-1 border border-border">
            <p
              className="text-[13px] text-foreground leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: renderBody(body) }}
            />
            {footer && (
              <p className="text-[11px] text-muted-foreground border-t border-border pt-1 mt-1">{footer}</p>
            )}
            <p className="text-[10px] text-muted-foreground text-right">09:41 ✓✓</p>
            {buttons && buttons.length > 0 && (
              <div className="border-t border-border pt-1 space-y-1">
                {buttons.map((btn, i) => (
                  <div key={i} className="flex items-center justify-center gap-1 text-primary text-xs font-medium py-0.5">
                    {btn.type === 'url' ? <Globe className="size-3" /> : btn.type === 'phone' ? <Phone className="size-3" /> : <MessageSquare className="size-3" />}
                    {btn.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── OAuth Modal ──────────────────────────────────────────────────────────────

function OAuthModal({ open, onClose, onSuccess }: {
  open: boolean; onClose: () => void; onSuccess: () => void
}) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedPage, setSelectedPage] = useState('')
  const [selectedNumber, setSelectedNumber] = useState('')
  const [loadingList, setLoadingList] = useState(false)

  function handleProvider() {
    setLoading(true)
    setTimeout(() => { setLoading(false); setLoadingList(true); setStep(2); setTimeout(() => setLoadingList(false), 1200) }, 1800)
  }

  function handlePageNext() {
    setLoadingList(true); setStep(3); setTimeout(() => setLoadingList(false), 1000)
  }

  function handleConnect() {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(4) }, 1500)
  }

  function handleClose() {
    setStep(1); setLoading(false); setSelectedPage(''); setSelectedNumber(''); onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            {[1,2,3,4].map(s => (
              <div key={s} className={cn('h-1 flex-1 rounded-full transition-colors', s <= step ? 'bg-primary' : 'bg-muted')} />
            ))}
          </div>
          <DialogTitle>
            {step === 1 && 'Conectar canal de mensagens'}
            {step === 2 && 'Selecionar página'}
            {step === 3 && 'Selecionar número'}
            {step === 4 && 'Integração concluída!'}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && 'Envie notificações e campanhas diretamente pelo canal de mensagens.'}
            {step === 2 && 'Escolha a página associada à sua conta de negócios.'}
            {step === 3 && 'Escolha o número que enviará as mensagens.'}
            {step === 4 && 'Seu canal de mensagens está conectado.'}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              {['Notificações automáticas de agendamentos', 'Envio de campanhas de marketing', 'Templates aprovados pela plataforma', 'Relatórios de entrega e leitura'].map(b => (
                <div key={b} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="size-4 text-success shrink-0" />
                  {b}
                </div>
              ))}
            </div>
            <Button className="w-full gap-2" onClick={handleProvider} disabled={loading}>
              {loading ? <><Spinner className="text-primary-foreground" />Aguardando autorização...</> : <><Globe className="size-4" />Continuar com provedor</>}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            {loadingList ? (
              <div className="space-y-2">{[1,2].map(i => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}</div>
            ) : (
              <RadioGroup value={selectedPage} onValueChange={setSelectedPage} className="space-y-2">
                {PAGINAS.map(p => (
                  <div key={p.id} className={cn('flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors', selectedPage === p.id ? 'border-primary bg-primary/5' : 'border-border')}>
                    <RadioGroupItem value={p.id} id={p.id} />
                    <Avatar size="sm"><AvatarFallback>{p.foto}</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <Label htmlFor={p.id} className="cursor-pointer font-medium text-sm">{p.nome}</Label>
                      <p className="text-xs text-muted-foreground">{p.seguidores} seguidores</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}
            <DialogFooter>
              <Button variant="ghost" onClick={() => setStep(1)}>Voltar</Button>
              <Button onClick={handlePageNext} disabled={!selectedPage || loadingList}>Próximo</Button>
            </DialogFooter>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            {loadingList ? (
              <div className="space-y-2">{[1,2].map(i => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}</div>
            ) : (
              <RadioGroup value={selectedNumber} onValueChange={setSelectedNumber} className="space-y-2">
                {NUMEROS.map(n => (
                  <div key={n.id} className={cn('flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors', selectedNumber === n.id ? 'border-primary bg-primary/5' : 'border-border')}>
                    <RadioGroupItem value={n.id} id={n.id} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={n.id} className="cursor-pointer font-medium text-sm">{n.numero}</Label>
                        <Badge variant={n.verificado ? 'success' : 'warning'} className="text-[10px]">{n.verificado ? 'Verificado' : 'Pendente'}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{n.nome}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}
            <DialogFooter>
              <Button variant="ghost" onClick={() => setStep(2)}>Voltar</Button>
              <Button onClick={handleConnect} disabled={!selectedNumber || loading}>
                {loading ? <><Spinner className="text-primary-foreground" />Conectando...</> : 'Conectar'}
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="size-8 text-success" />
            </div>
            <div className="rounded-lg border bg-muted/40 p-3 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Página</span><span className="font-medium">{PAGINAS.find(p => p.id === selectedPage)?.nome}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Número</span><span className="font-medium">{NUMEROS.find(n => n.id === selectedNumber)?.numero}</span></div>
            </div>
            <Button className="w-full" onClick={() => { onSuccess(); handleClose() }}>Ir para configurações</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ─── Page: Integrações ────────────────────────────────────────────────────────

function IntegracoesPage({ onConnect, connected }: { onConnect: () => void; connected: boolean }) {
  const integracoes = [
    { id: 'canal', nome: 'Canal de Mensagens', desc: 'Envie notificações e campanhas por mensagem.', cor: 'bg-primary', letra: 'M', ativo: connected },
    { id: 'agenda-ext', nome: 'Agenda Externa', desc: 'Receba agendamentos direto de outra plataforma no painel.', cor: 'bg-blue-500', letra: 'A', ativo: false },
    { id: 'marketplace', nome: 'Marketplace', desc: 'Integre com um marketplace de serviços.', cor: 'bg-orange-500', letra: 'K', ativo: false },
    { id: 'pagamentos', nome: 'Processador de Pagamentos', desc: 'Processe pagamentos integrados ao painel.', cor: 'bg-emerald-600', letra: 'P', ativo: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Integrações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Conecte ferramentas externas ao seu negócio.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-component">
        {integracoes.map(integ => (
          <Card key={integ.id} className={integ.id === 'canal' ? 'ring-1 ring-primary/30' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn('flex size-10 items-center justify-center rounded-lg text-white font-bold text-sm', integ.cor)}>{integ.letra}</div>
                  <div>
                    <CardTitle className="text-sm">{integ.nome}</CardTitle>
                    <Badge variant={integ.ativo ? 'success' : 'secondary'} className="mt-1 text-[10px]">
                      {integ.ativo ? 'Conectado' : 'Não conectado'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{integ.desc}</p>
            </CardContent>
            <CardFooter>
              {integ.id === 'canal' ? (
                integ.ativo
                  ? <Button variant="outline" size="sm" className="w-full">Gerenciar · +55 11 98765-4321</Button>
                  : <Button size="sm" className="w-full" onClick={onConnect}>Conectar</Button>
              ) : (
                <Button variant="outline" size="sm" className="w-full" disabled>Em breve</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── Page: Templates ──────────────────────────────────────────────────────────

function TemplatesPage({ onNew, onEdit }: { onNew: () => void; onEdit: (t: Template) => void }) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('todos')
  const [loading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = TEMPLATES.filter(t => {
    const matchSearch = t.nome.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'todos' || t.status === filterStatus
    return matchSearch && matchStatus
  })

  function handleDelete() {
    toast.success('Template excluído com sucesso.')
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerencie seus templates de mensagem.</p>
        </div>
        <Button onClick={onNew}><Plus />Novo template</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input placeholder="Buscar template..." className="pl-8 h-8 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filterStatus} onValueChange={(v) => v && setFilterStatus(v)}>
          <SelectTrigger className="w-36 h-8 text-sm" aria-label="Filtrar por status"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="aprovado">Aprovado</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="rejeitado">Rejeitado</SelectItem>
            <SelectItem value="rascunho">Rascunho</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-2">{[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}</div>
      ) : filtered.length === 0 ? (
        <Empty className="py-16">
          <EmptyHeader>
            <EmptyTitle>{search || filterStatus !== 'todos' ? 'Nenhum resultado' : 'Nenhum template ainda'}</EmptyTitle>
            <EmptyDescription>{search || filterStatus !== 'todos' ? 'Tente outros termos ou limpe os filtros.' : 'Crie seu primeiro template para começar.'}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            {search || filterStatus !== 'todos'
              ? <Button variant="outline" onClick={() => { setSearch(''); setFilterStatus('todos') }}>Limpar filtros</Button>
              : <Button onClick={onNew}><Plus />Criar template</Button>}
          </EmptyContent>
        </Empty>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Idioma</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="w-10"><span className="sr-only">Ações</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-sm">{t.nome}</TableCell>
                  <TableCell><Badge variant="outline">{t.categoria}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.idioma}</TableCell>
                  <TableCell><TemplateStatusBadge status={t.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.data}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {(t.status === 'rascunho' || t.status === 'rejeitado') && (
                        <Button variant="ghost" size="icon-sm" onClick={() => onEdit(t)} aria-label="Editar"><Settings className="size-3.5" /></Button>
                      )}
                      <Button variant="ghost" size="icon-sm" aria-label="Duplicar" onClick={() => toast.success('Template duplicado.')}><Copy className="size-3.5" /></Button>
                      {t.status === 'aprovado' && (
                        <Button variant="ghost" size="icon-sm" aria-label="Enviar campanha"><Send className="size-3.5" /></Button>
                      )}
                      <Button variant="ghost" size="icon-sm" aria-label="Excluir" onClick={() => setDeleteId(t.id)}><Trash2 className="size-3.5 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir template?</DialogTitle>
            <DialogDescription>Essa ação não pode ser desfeita. O template será removido permanentemente.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Page: Criar / Editar Template ───────────────────────────────────────────

function CreateTemplatePage({ template, onBack }: { template?: Template; onBack: () => void }) {
  const [nome, setNome] = useState(template?.nome ?? '')
  const [categoria, setCategoria] = useState<string>(template?.categoria ?? '')
  const [idioma, setIdioma] = useState(template?.idioma ?? 'pt-BR')
  const [body, setBody] = useState(template?.body ?? '')
  const [footer, setFooter] = useState(template?.footer ?? '')
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function insertVariable() {
    const el = textareaRef.current
    if (!el) return
    const count = (body.match(/\{\{\d+\}\}/g) || []).length + 1
    const start = el.selectionStart; const end = el.selectionEnd
    const newVal = body.substring(0, start) + `{{${count}}}` + body.substring(end)
    setBody(newVal)
    setTimeout(() => { el.focus(); el.setSelectionRange(start + 5, start + 5) }, 0)
  }

  function wrapSelection(before: string, after: string) {
    const el = textareaRef.current; if (!el) return
    const start = el.selectionStart; const end = el.selectionEnd
    const selected = body.substring(start, end)
    const newVal = body.substring(0, start) + before + selected + after + body.substring(end)
    setBody(newVal)
  }

  function handleSaveDraft() {
    setSaving(true)
    setTimeout(() => { setSaving(false); toast.success('Rascunho salvo.') }, 1000)
  }

  function handleSubmit() {
    if (!nome || !categoria || !body) { toast.error('Preencha todos os campos obrigatórios.'); return }
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); toast.success('Template enviado para aprovação!'); onBack() }, 1500)
  }

  const categoryHelpers: Record<string, string> = {
    Marketing: 'Usado para promoções, campanhas e conteúdo promocional. Requer opt-in do usuário.',
    Transacional: 'Notificações transacionais relacionadas a agendamentos e conta. Menor taxa de rejeição.',
    'Autenticação': 'Apenas para envio de senhas e códigos de verificação.',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={onBack}><ArrowLeft /></Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{template ? 'Editar template' : 'Novo template'}</h1>
          <p className="text-sm text-muted-foreground">Configure e visualize sua mensagem em tempo real.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-section">
        {/* Formulário */}
        <div className="lg:col-span-3 space-y-5">
          <Card>
            <CardHeader><CardTitle className="text-base">Informações básicas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="tpl-nome">Nome <span className="text-destructive">*</span></Label>
                <Input id="tpl-nome" value={nome} onChange={e => setNome(e.target.value.toLowerCase().replace(/\s/g, '_'))} placeholder="ex: agendamento_confirmado" className="font-mono" />
                <p className="text-xs text-muted-foreground">Apenas letras minúsculas, números e underscores.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-component">
                <div className="space-y-1.5">
                  <Label>Categoria <span className="text-destructive">*</span></Label>
                  <Select value={categoria} onValueChange={(v) => v && setCategoria(v)}>
                    <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Transacional">Transacional</SelectItem>
                      <SelectItem value="Autenticação">Autenticação</SelectItem>
                    </SelectContent>
                  </Select>
                  {categoria && <p className="text-xs text-muted-foreground">{categoryHelpers[categoria]}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Idioma</Label>
                  <Select value={idioma} onValueChange={(v) => v && setIdioma(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (BR)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Corpo da mensagem</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-1 border-b pb-2">
                <Toggle size="sm" aria-label="Negrito" onPressedChange={() => wrapSelection('*', '*')}><Bold className="size-3.5" /></Toggle>
                <Toggle size="sm" aria-label="Itálico" onPressedChange={() => wrapSelection('_', '_')}><Italic className="size-3.5" /></Toggle>
                <Toggle size="sm" aria-label="Tachado" onPressedChange={() => wrapSelection('~', '~')}><Strikethrough className="size-3.5" /></Toggle>
                <Separator orientation="vertical" className="h-5 mx-1" />
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={insertVariable}><Hash className="size-3" />Variável</Button>
              </div>
              <Textarea
                ref={textareaRef}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Olá, {{1}}! Seu agendamento *#{{2}}* foi confirmado."
                rows={5}
                maxLength={1024}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Use *negrito*, _itálico_, ~tachado~, {'{{1}}'} para variáveis</span>
                <span>{body.length}/1024</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Rodapé <span className="text-muted-foreground font-normal text-sm">(opcional)</span></CardTitle></CardHeader>
            <CardContent>
              <Input value={footer} onChange={e => setFooter(e.target.value)} placeholder="Ex: Negócio Exemplo" maxLength={60} />
              <p className="text-xs text-muted-foreground mt-1.5 text-right">{footer.length}/60</p>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleSaveDraft} disabled={saving}>
              {saving ? <><Spinner />Salvando...</> : 'Salvar rascunho'}
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? <><Spinner className="text-primary-foreground" />Enviando...</> : 'Enviar para aprovação'}
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 sticky top-0">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Preview</p>
          <div className="h-80">
            <MessagePreview body={body} footer={footer} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page: Notificações ───────────────────────────────────────────────────────

function NotificacoesPage({ connected }: { connected: boolean }) {
  const [events, setEvents] = useState(NOTIFICATION_EVENTS)
  const [drawerEvent, setDrawerEvent] = useState<typeof NOTIFICATION_EVENTS[0] | null>(null)
  const [saving, setSaving] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [delay, setDelay] = useState('imediato')

  function handleSave() {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success('Notificação configurada com sucesso.')
      setDrawerEvent(null)
    }, 1200)
  }

  const utilityTemplates = TEMPLATES.filter(t => t.categoria === 'Transacional' && t.status === 'aprovado')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Notificações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Envie mensagens automáticas em eventos do agendamento.</p>
      </div>

      {!connected && (
        <div className="flex items-center gap-3 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3">
          <AlertCircle className="size-4 text-warning shrink-0" />
          <p className="text-sm flex-1">Canal não conectado. Conecte para ativar as notificações.</p>
          <Button size="sm" variant="outline">Conectar canal</Button>
        </div>
      )}

      <div className="space-y-3">
        {events.map(event => {
          const Icon = event.icon
          return (
            <Card key={event.id}>
              <CardContent className="flex items-center gap-4 py-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{event.label}</p>
                  {event.template
                    ? <div className="flex items-center gap-2 mt-0.5"><span className="text-xs text-muted-foreground font-mono">{event.template.nome}</span><TemplateStatusBadge status={event.template.status} /></div>
                    : <Badge variant="warning" className="mt-0.5 text-[10px]">Configure um template</Badge>}
                </div>
                <Switch
                  checked={event.ativo}
                  disabled={!connected}
                  onCheckedChange={checked => setEvents(ev => ev.map(e => e.id === event.id ? { ...e, ativo: checked } : e))}
                  aria-label={`Ativar ${event.label}`}
                />
                <Button variant="outline" size="sm" disabled={!connected} onClick={() => { setDrawerEvent(event); setSelectedTemplate(event.template?.id ?? '') }}>
                  Configurar
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Sheet open={!!drawerEvent} onOpenChange={() => setDrawerEvent(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Configurar notificação</SheetTitle>
            <SheetDescription>{drawerEvent?.label}</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-5">
            <div className="space-y-1.5">
              <Label>Template</Label>
              {utilityTemplates.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum template Transacional aprovado. <button className="text-primary underline">Criar template</button></p>
              ) : (
                <Select value={selectedTemplate} onValueChange={(v) => v && setSelectedTemplate(v)}>
                  <SelectTrigger><SelectValue placeholder="Selecionar template" /></SelectTrigger>
                  <SelectContent>
                    {utilityTemplates.map(t => <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>)}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Delay</Label>
              <Select value={delay} onValueChange={(v) => v && setDelay(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="imediato">Imediato</SelectItem>
                  <SelectItem value="1min">1 minuto</SelectItem>
                  <SelectItem value="2min">2 minutos</SelectItem>
                  <SelectItem value="5min">5 minutos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? <><Spinner className="text-primary-foreground" />Salvando...</> : 'Salvar configuração'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// ─── Page: Campanhas ──────────────────────────────────────────────────────────

function CampanhasPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedClientes, setSelectedClientes] = useState<string[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [scheduleType, setScheduleType] = useState('agora')

  const metricas = [
    { label: 'Receita gerada', value: 'R$ 0', icon: DollarSign },
    { label: 'Agendamentos', value: '0', icon: CalendarClock },
    { label: 'Contatos impactados', value: '0', icon: Users },
    { label: 'Taxa de leitura', value: '—', icon: Eye },
    { label: 'CTR', value: '—', icon: MousePointerClick },
    { label: 'Investimento', value: 'R$ 0', icon: BarChart3 },
  ]

  function handleSend() {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setConfirmOpen(false)
      setDrawerOpen(false)
      toast.success(`${selectedClientes.length} mensagens enviadas com sucesso!`)
      setSelectedTemplate('')
      setSelectedClientes([])
    }, 2000)
  }

  const marketingTemplates = TEMPLATES.filter(t => t.categoria === 'Marketing' && t.status === 'aprovado')
  const selectedTpl = TEMPLATES.find(t => t.id === selectedTemplate)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Campanhas</h1>
          <p className="mt-1 text-sm text-muted-foreground">Dispare mensagens em massa pelo canal de mensagens.</p>
        </div>
        <Button onClick={() => setDrawerOpen(true)}><Send />Disparar mensagem</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-component">
        {metricas.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-3 py-4">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted"><Icon className="size-4 text-muted-foreground" /></div>
              <div><p className="text-xs text-muted-foreground">{label}</p><p className="text-lg font-semibold">{value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Empty className="py-16">
        <EmptyHeader>
          <EmptyTitle>Nenhuma campanha enviada</EmptyTitle>
          <EmptyDescription>Não encontramos envios neste período. Dispare sua primeira campanha.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => setDrawerOpen(true)}><Send />Disparar mensagem</Button>
        </EmptyContent>
      </Empty>

      {/* Drawer: Nova campanha */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Nova campanha</SheetTitle>
            <SheetDescription>Configure e dispare uma mensagem em massa.</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-5">
            <div className="space-y-1.5">
              <Label>Template</Label>
              <Select value={selectedTemplate} onValueChange={(v) => v && setSelectedTemplate(v)}>
                <SelectTrigger><SelectValue placeholder="Selecionar template" /></SelectTrigger>
                <SelectContent>
                  {marketingTemplates.map(t => <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {selectedTpl && (
              <div className="h-48">
                <MessagePreview body={selectedTpl.body} footer={selectedTpl.footer} />
              </div>
            )}

            <div className="space-y-2">
              <Label>Agendamento de envio</Label>
              <RadioGroup value={scheduleType} onValueChange={setScheduleType} className="flex gap-4">
                <div className="flex items-center gap-2"><RadioGroupItem value="agora" id="ag-agora" /><Label htmlFor="ag-agora" className="font-normal cursor-pointer">Enviar agora</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="agendar" id="ag-agenda" /><Label htmlFor="ag-agenda" className="font-normal cursor-pointer">Agendar</Label></div>
              </RadioGroup>
              {scheduleType === 'agendar' && (
                <div className="grid grid-cols-2 gap-3">
                  <Input type="date" />
                  <Input type="time" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Destinatários</Label>
              <div className="space-y-1.5">
                {CLIENTES.map(c => (
                  <div key={c.id} className={cn('flex items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer transition-colors', selectedClientes.includes(c.id) ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/40')}
                    onClick={() => setSelectedClientes(sel => sel.includes(c.id) ? sel.filter(id => id !== c.id) : [...sel, c.id])}>
                    <Avatar size="sm"><AvatarFallback className="text-[10px]">{c.nome[0]}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{c.nome}</p>
                      <p className="text-xs text-muted-foreground">{c.telefone}</p>
                    </div>
                    {selectedClientes.includes(c.id) && <Check className="size-4 text-primary" />}
                  </div>
                ))}
              </div>
              {selectedClientes.length > 0 && (
                <p className="text-xs text-muted-foreground">{selectedClientes.length} contato{selectedClientes.length > 1 ? 's' : ''} selecionado{selectedClientes.length > 1 ? 's' : ''}</p>
              )}
            </div>
          </div>

          <SheetFooter className="mt-6">
            <Button
              className="w-full"
              disabled={!selectedTemplate || selectedClientes.length === 0}
              onClick={() => setConfirmOpen(true)}
            >
              <Send />Enviar mensagens
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Modal de confirmação */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmar envio</DialogTitle>
            <DialogDescription>
              Você está prestes a enviar para <strong>{selectedClientes.length} contato{selectedClientes.length > 1 ? 's' : ''}</strong>. Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
            <Button onClick={handleSend} disabled={sending}>
              {sending ? <><Spinner className="text-primary-foreground" />Enviando...</> : 'Confirmar envio'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── App shell ────────────────────────────────────────────────────────────────

type Page = 'integracoes' | 'templates' | 'create-template' | 'notificacoes' | 'campanhas'

function MessagingApp({ initialConnected = false, initialPage = 'integracoes' }: { initialConnected?: boolean; initialPage?: Page } = {}) {
  const [page, setPage] = useState<Page>(initialPage)
  const [oauthOpen, setOauthOpen] = useState(false)
  const [connected, setConnected] = useState(initialConnected)
  const [editingTemplate, setEditingTemplate] = useState<Template | undefined>()

  const navItems = [
    { id: 'integracoes', label: 'Integrações', icon: Settings },
    { id: 'templates', label: 'Templates', icon: MessageSquare },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'campanhas', label: 'Campanhas', icon: Megaphone },
  ] as const

  function handleConnect() { setOauthOpen(true) }
  function handleOAuthSuccess() { setConnected(true); setPage('notificacoes') }

  function handleNewTemplate() { setEditingTemplate(undefined); setPage('create-template') }
  function handleEditTemplate(t: Template) { setEditingTemplate(t); setPage('create-template') }

  return (
    <div className="flex flex-col-reverse sm:flex-row h-screen bg-background text-foreground">
      {/* Sidebar — desktop lateral, mobile bottom nav */}
      <nav className={cn(
        'shrink-0 bg-sidebar border-border',
        'flex sm:flex-col',
        'sm:w-52 sm:border-r sm:px-2 sm:py-4 sm:gap-1',
        'border-t px-2 py-1 gap-1 justify-around sm:justify-start',
      )}>
        {/* Logo — só no desktop */}
        <div className="hidden sm:block px-3 pb-4 mb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <MessageSquare className="size-3.5" />
            </div>
            <span className="text-sm font-semibold">Mensagens</span>
          </div>
        </div>

        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setPage(id as Page)}
            className={cn(
              'flex items-center rounded-md text-sm font-medium transition-colors',
              'flex-col gap-0.5 px-3 py-1.5 sm:flex-row sm:gap-2.5 sm:px-3 sm:py-2 sm:text-left',
              page === id || (page === 'create-template' && id === 'templates')
                ? 'bg-accent text-accent-foreground sm:border-l-2 sm:border-primary'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="text-[10px] sm:text-sm">{label}</span>
          </button>
        ))}

        {/* Status — só no desktop */}
        <div className="hidden sm:flex mt-auto px-3">
          <div className="flex items-center gap-2">
            <div className={cn('size-2 rounded-full', connected ? 'bg-success' : 'bg-muted-foreground')} />
            <span className="text-xs text-muted-foreground">{connected ? 'Conectado' : 'Não conectado'}</span>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-component sm:p-layout">
        {page === 'integracoes' && <IntegracoesPage onConnect={handleConnect} connected={connected} />}
        {page === 'templates' && <TemplatesPage onNew={handleNewTemplate} onEdit={handleEditTemplate} />}
        {page === 'create-template' && <CreateTemplatePage template={editingTemplate} onBack={() => setPage('templates')} />}
        {page === 'notificacoes' && <NotificacoesPage connected={connected} />}
        {page === 'campanhas' && <CampanhasPage />}
      </main>

      <OAuthModal open={oauthOpen} onClose={() => setOauthOpen(false)} onSuccess={handleOAuthSuccess} />
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Showcases/Mensageria',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Fluxo completo de integração de canal de mensagens — integrações, OAuth, templates, notificações e campanhas.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Fluxo completo',
  render: () => <MessagingApp />,
}

export const DefaultDark: Story = {
  name: 'Fluxo completo — Dark',
  globals: { theme: 'dark' },
  render: () => <MessagingApp />,
}

export const Conectado: Story = {
  name: 'Já conectado — Templates',
  render: () => <MessagingApp initialConnected initialPage="templates" />,
}

export const ConectadoNotificacoes: Story = {
  name: 'Já conectado — Notificações',
  render: () => <MessagingApp initialConnected initialPage="notificacoes" />,
}

export const ConectadoCampanhas: Story = {
  name: 'Já conectado — Campanhas',
  render: () => <MessagingApp initialConnected initialPage="campanhas" />,
}

export const ConectadoDark: Story = {
  name: 'Já conectado — Dark',
  globals: { theme: 'dark' },
  render: () => <MessagingApp initialConnected initialPage="templates" />,
}
