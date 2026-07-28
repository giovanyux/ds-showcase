import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Inbox, Send, FileText, Trash2, Star, Tag, Settings,
  Search, Pencil, MoreHorizontal, Reply, ReplyAll, Forward,
  Archive, Trash, ChevronDown, Paperclip, ArrowLeft,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const meta: Meta = {
  title: 'Showcases/Mail',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ─── Mock data ────────────────────────────────────────────────────────────────

interface Email {
  id: string
  from: string
  initials: string
  subject: string
  preview: string
  body: string
  date: string
  read: boolean
  starred: boolean
  folder: 'inbox' | 'sent' | 'drafts' | 'trash'
  tags: string[]
  attachments?: string[]
}

const emails: Email[] = [
  {
    id: '1',
    from: 'Ana Souza',
    initials: 'AS',
    subject: 'Revisão do protótipo — Dashboard v3',
    preview: 'Oi! Termiei as alterações no protótipo. Pode dar uma olhada antes da reunião de amanhã?',
    body: `Oi!\n\nTerminei as alterações no protótipo do Dashboard v3 conforme discutimos na última reunião.\n\nPrincipais mudanças:\n- Reorganizei os KPI cards para mobile\n- Adicionei o filtro por período no gráfico de receita\n- Corrigi o alinhamento dos ícones na sidebar\n\nPode dar uma olhada antes da reunião de amanhã às 14h? Deixei o link do Figma no card do Linear.\n\nQualquer dúvida é só falar!\n\nAna`,
    date: '10:32',
    read: false,
    starred: true,
    folder: 'inbox',
    tags: ['Design', 'Urgente'],
    attachments: ['protótipo-v3.fig'],
  },
  {
    id: '2',
    from: 'Carlos Lima',
    initials: 'CL',
    subject: 'Deploy em produção — 14/05',
    preview: 'Precisamos alinhar o processo de deploy. A janela de manutenção está confirmada para quinta.',
    body: `Carlos Lima aqui.\n\nPrecisamos alinhar o processo de deploy para quinta-feira (14/05).\n\nJanela de manutenção: 23h–01h\nAmbiente: produção\nRollback plan: snapshot antes do deploy\n\nItems no checklist:\n- [ ] Migrations testadas em staging\n- [ ] Feature flags configuradas\n- [ ] Alertas do Datadog revisados\n- [ ] On-call escalation definida\n\nResponde aqui confirmando presença no canal #deploy do Slack.\n\nAbraços`,
    date: '09:15',
    read: false,
    starred: false,
    folder: 'inbox',
    tags: ['Infra'],
  },
  {
    id: '3',
    from: 'Mariana Koch',
    initials: 'MK',
    subject: 'Contrato de parceria — Bonna Pizza',
    preview: 'Segue em anexo o contrato revisado pelo jurídico. Favor assinar até sexta.',
    body: `Bom dia,\n\nSegue em anexo o contrato de parceria com a Bonna Pizza, revisado pelo nosso jurídico.\n\nPrazo para assinatura: sexta-feira (16/05)\nAssinatura digital via DocuSign — link no rodapé do documento\n\nDestaques das alterações:\n- Cláusula 4.2: prazo de exclusividade reduzido de 12 para 6 meses\n- Cláusula 7.1: SLA de suporte técnico incluído\n- Anexo B: tabela de comissões atualizada\n\nEm caso de dúvidas, entre em contato com o jurídico (juridico@exemplo.com).\n\nAtenciosamente,\nMariana Koch\nGestora de Parcerias`,
    date: 'ontem',
    read: true,
    starred: false,
    folder: 'inbox',
    tags: ['Jurídico'],
    attachments: ['contrato-bonna-v2.pdf', 'anexo-b-comissoes.xlsx'],
  },
  {
    id: '4',
    from: 'Felipe Alves',
    initials: 'FA',
    subject: 'Sprint review — semana 18',
    preview: 'Resumo da sprint: 14 de 17 tasks concluídas. Velocity acima da média.',
    body: `Galera,\n\nResumo da sprint 18:\n\n✅ Concluídas: 14/17 tasks (82%)\n🔄 Em progresso: 2 (serão puxadas pra sprint 19)\n❌ Bloqueadas: 1 (aguardando resposta do cliente)\n\nVelocity: 47 pontos (média histórica: 41)\n\nDestaques:\n- Feature de notificações por WhatsApp entrou em produção\n- Migração de banco concluída sem incidentes\n- Dívida técnica do módulo de relatórios foi quitada\n\nProxima sprint planning: segunda-feira 10h\n\nFelipe`,
    date: 'ontem',
    read: true,
    starred: true,
    folder: 'inbox',
    tags: ['Time'],
  },
  {
    id: '5',
    from: 'Juliana Reis',
    initials: 'JR',
    subject: 'Feedback do cliente — negócio exemplo',
    preview: 'O cliente Sabor Carioca entrou em contato sobre problemas no módulo de pagamento.',
    body: `Oi equipe,\n\nO cliente Sabor Carioca (conta #4521) entrou em contato pelo suporte relatando:\n\n"Desde a atualização do dia 08/05, o módulo de pagamento está rejeitando cartões Elo. Testamos com 3 cartões diferentes e todos foram recusados com código 051."\n\nJá abri o ticket #SUP-2847 no Zendesk. Histórico de pagamentos do cliente mostra que 40% das transações são via Elo.\n\nPrecisamos de uma correção urgente. @Carlos, pode verificar?\n\nJuliana`,
    date: 'ter',
    read: true,
    starred: false,
    folder: 'inbox',
    tags: ['Suporte', 'Urgente'],
  },
  {
    id: '6',
    from: 'Ricardo Neto',
    initials: 'RN',
    subject: 'Atualização do relatório mensal — Abril',
    preview: 'Crescimento de 23% no MRR em relação a março. Churn abaixo de 2%.',
    body: `Prezados,\n\nSegue o relatório mensal de abril:\n\n📈 MRR: R$ 187.450 (+23% vs março)\n📉 Churn: 1,8% (meta: <2%)\n👥 Novos clientes: 34\n💰 LTV médio: R$ 4.200\n\nDestaques:\n- Campanha de retenção reduziu churn em 0,4pp\n- Upsell para plano Premium aumentou ticket médio\n- Região Sul cresceu 41% em novos clientes\n\nRelação completa no dashboard de métricas (link interno).\n\nRicardo`,
    date: 'seg',
    read: true,
    starred: false,
    folder: 'inbox',
    tags: ['Financeiro'],
    attachments: ['relatorio-abril-2026.pdf'],
  },
]

const folders = [
  { id: 'inbox',  label: 'Caixa de entrada', icon: Inbox,    count: 2 },
  { id: 'sent',   label: 'Enviados',          icon: Send,     count: 0 },
  { id: 'drafts', label: 'Rascunhos',         icon: FileText, count: 3 },
  { id: 'trash',  label: 'Lixeira',           icon: Trash2,   count: 0 },
]

const tagColors: Record<string, string> = {
  Design:     'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Urgente:    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  Infra:      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Jurídico:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Time:       'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Suporte:    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Financeiro: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
}

// ─── Mail app ────────────────────────────────────────────────────────────────

function MailApp() {
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [selectedId, setSelectedId] = useState<string | null>('1')
  const [search, setSearch] = useState('')

  const filtered = emails.filter(
    (e) => e.folder === activeFolder &&
      (e.from.toLowerCase().includes(search.toLowerCase()) ||
       e.subject.toLowerCase().includes(search.toLowerCase()))
  )
  const selected = emails.find((e) => e.id === selectedId) ?? null

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="w-52 shrink-0 flex flex-col border-r border-border bg-sidebar">
          {/* Logo */}
          <div className="px-4 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-md bg-primary flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-primary-foreground">Ei</span>
              </div>
              <span className="text-sm font-semibold text-sidebar-foreground">Mail</span>
            </div>
            <Button variant="ghost" size="icon" className="size-7">
              <Pencil className="size-3.5" />
            </Button>
          </div>

          {/* Folders */}
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {folders.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => { setActiveFolder(id); setSelectedId(null) }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 h-8 rounded-md text-sm transition-colors text-left',
                  activeFolder === id
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="flex-1 truncate">{label}</span>
                {count > 0 && (
                  <span className={cn(
                    'text-[11px] font-semibold min-w-[18px] text-center',
                    activeFolder === id ? 'text-primary-foreground/80' : 'text-muted-foreground',
                  )}>
                    {count}
                  </span>
                )}
              </button>
            ))}

            <Separator className="my-2" />

            <p className="px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Etiquetas</p>
            {Object.keys(tagColors).map((tag) => (
              <button
                key={tag}
                className="w-full flex items-center gap-2.5 px-3 h-7 rounded-md text-xs text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-left"
              >
                <Tag className="size-3 shrink-0 text-muted-foreground" />
                {tag}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Email list ──────────────────────────────────────────── */}
        <div className="w-80 shrink-0 flex flex-col border-r border-border">
          {/* List header */}
          <div className="shrink-0 px-4 py-3 border-b border-border space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                {folders.find((f) => f.id === activeFolder)?.label}
              </h2>
              <Button variant="ghost" size="icon" className="size-7">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
              <Input
                className="pl-8 h-7 text-xs"
                placeholder="Buscar e-mails..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="todos" className="flex-1 flex flex-col min-h-0">
            <TabsList className="shrink-0 h-8 mx-3 mt-2 mb-0">
              <TabsTrigger value="todos" className="text-xs flex-1">Todos</TabsTrigger>
              <TabsTrigger value="nao-lidos" className="text-xs flex-1">Não lidos</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="flex-1 overflow-y-auto m-0 mt-1">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">Nenhum e-mail</div>
              ) : filtered.map((email) => (
                <button
                  key={email.id}
                  onClick={() => setSelectedId(email.id)}
                  className={cn(
                    'w-full text-left px-4 py-3 border-b border-border/50 transition-colors hover:bg-muted/40',
                    selectedId === email.id && 'bg-muted',
                    !email.read && 'bg-primary/5 hover:bg-primary/10',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="size-8 shrink-0 mt-0.5">
                      <AvatarFallback className="text-[11px] font-semibold">{email.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={cn(
                          'text-sm truncate',
                          email.read ? 'text-foreground' : 'text-foreground font-semibold',
                        )}>
                          {email.from}
                        </span>
                        <span className="text-[11px] text-muted-foreground shrink-0 ml-2">{email.date}</span>
                      </div>
                      <p className={cn(
                        'text-xs truncate',
                        email.read ? 'text-muted-foreground' : 'text-foreground font-medium',
                      )}>
                        {email.subject}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{email.preview}</p>
                      {email.tags.length > 0 && (
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {email.tags.map((tag) => (
                            <span key={tag} className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium', tagColors[tag])}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {!email.read && (
                      <div className="size-2 rounded-full bg-primary shrink-0 mt-1.5" />
                    )}
                  </div>
                </button>
              ))}
            </TabsContent>

            <TabsContent value="nao-lidos" className="flex-1 overflow-y-auto m-0 mt-1">
              {filtered.filter((e) => !e.read).map((email) => (
                <button
                  key={email.id}
                  onClick={() => setSelectedId(email.id)}
                  className={cn(
                    'w-full text-left px-4 py-3 border-b border-border/50 transition-colors hover:bg-muted/40 bg-primary/5',
                    selectedId === email.id && 'bg-muted',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="size-8 shrink-0 mt-0.5">
                      <AvatarFallback className="text-[11px] font-semibold">{email.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-semibold text-foreground truncate">{email.from}</span>
                        <span className="text-[11px] text-muted-foreground shrink-0 ml-2">{email.date}</span>
                      </div>
                      <p className="text-xs text-foreground font-medium truncate">{email.subject}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{email.preview}</p>
                    </div>
                    <div className="size-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  </div>
                </button>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Email detail ────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {selected ? (
            <>
              {/* Toolbar */}
              <div className="shrink-0 h-12 flex items-center border-b border-border px-4 gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Archive className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Arquivar</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Trash className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Excluir</TooltipContent>
                </Tooltip>

                <Separator orientation="vertical" className="h-5 mx-1" />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Reply className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Responder</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <ReplyAll className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Responder a todos</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Forward className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Encaminhar</TooltipContent>
                </Tooltip>

                <div className="ml-auto flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Email content */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto px-8 py-6 space-y-6">
                  {/* Header */}
                  <div className="space-y-4">
                    <h1 className="text-xl font-semibold text-foreground leading-tight">
                      {selected.subject}
                    </h1>

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="size-9 shrink-0">
                          <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
                            {selected.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">{selected.from}</p>
                            <span className="text-xs text-muted-foreground">{selected.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <p className="text-xs text-muted-foreground">para mim</p>
                            <ChevronDown className="size-3 text-muted-foreground" />
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {selected.tags.map((tag) => (
                          <span key={tag} className={cn('text-xs px-2 py-0.5 rounded-md font-medium', tagColors[tag])}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Body */}
                  <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {selected.body}
                  </div>

                  {/* Attachments */}
                  {selected.attachments && selected.attachments.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {selected.attachments.length} anexo{selected.attachments.length > 1 ? 's' : ''}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selected.attachments.map((att) => (
                            <div
                              key={att}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm hover:bg-muted transition-colors cursor-pointer"
                            >
                              <Paperclip className="size-3.5 text-muted-foreground shrink-0" />
                              <span className="text-foreground font-medium">{att}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Reply box */}
                  <div className="border border-border rounded-xl p-4 space-y-3 bg-card">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">Responder a {selected.from}</p>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 text-xs px-2 gap-1">
                          <Reply className="size-3" /> Responder
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 text-xs px-2 gap-1">
                          <Forward className="size-3" /> Encaminhar
                        </Button>
                      </div>
                    </div>
                    <textarea
                      className="w-full h-20 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none"
                      placeholder="Escreva sua resposta..."
                    />
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="icon" className="size-7">
                        <Paperclip className="size-3.5" />
                      </Button>
                      <Button size="sm">Enviar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <Inbox className="size-12 text-muted-foreground/30 mb-4" />
              <h3 className="font-semibold text-foreground">Selecione um e-mail</h3>
              <p className="text-sm text-muted-foreground mt-1">Escolha um e-mail da lista para visualizar</p>
            </div>
          )}
        </div>

      </div>
    </TooltipProvider>
  )
}

export const Default: Story = {
  render: () => <MailApp />,
}
