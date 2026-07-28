import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Sun, Moon, Bell, Search, Settings, Check, X, Info, AlertTriangle,
  ChevronDown, Palette, Type, Layout, ToggleLeft, Layers,
} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const meta: Meta = {
  title: 'Showcases/Playground',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ icon: Icon, title, children }: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  )
}

// ─── Color swatch ─────────────────────────────────────────────────────────────

function Swatch({ label, bg, text }: { label: string; bg: string; text?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`h-10 w-full rounded-md border border-border ${bg}`} />
      <span className={`text-xs ${text ?? 'text-muted-foreground'}`}>{label}</span>
    </div>
  )
}

// ─── Main playground ─────────────────────────────────────────────────────────

function PlaygroundPage() {
  const [sliderValue, setSliderValue] = useState([40])
  const [switchOn, setSwitchOn] = useState(false)
  const [checked, setChecked] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [radio, setRadio] = useState('option-a')

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-md bg-primary" />
              <span className="text-sm font-semibold">Design System · Playground</span>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <Bell className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notificações</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <Settings className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Configurações</TooltipContent>
              </Tooltip>
              <Avatar className="size-8">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">GJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl space-y-12 px-6 py-10">

          {/* ── Typography ──────────────────────────────────────────── */}
          <Section icon={Type} title="Typography">
            <div className="space-y-3">
              <p className="scroll-m-20 text-4xl font-extrabold tracking-tight">Heading 1 — Display</p>
              <p className="scroll-m-20 text-3xl font-bold tracking-tight">Heading 2 — Title</p>
              <p className="scroll-m-20 text-2xl font-semibold tracking-tight">Heading 3 — Subtitle</p>
              <p className="scroll-m-20 text-xl font-semibold">Heading 4 — Section</p>
              <p className="text-base leading-7">
                Body text — The quick brown fox jumps over the lazy dog. Used for paragraphs and longer reading content.
              </p>
              <p className="text-sm text-muted-foreground">
                Small / Muted — Secondary descriptions, captions, helper text, and metadata.
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                Label / Overline — Category headers and labels
              </p>
              <code className="text-sm font-mono bg-muted px-2 py-1 rounded-md">
                Monospace — code, ids, tokens
              </code>
            </div>
          </Section>

          <Separator />

          {/* ── Colors ──────────────────────────────────────────────── */}
          <Section icon={Palette} title="Color Tokens">
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
              <Swatch label="background" bg="bg-background" />
              <Swatch label="foreground" bg="bg-foreground" text="text-background" />
              <Swatch label="card" bg="bg-card border" />
              <Swatch label="muted" bg="bg-muted" />
              <Swatch label="primary" bg="bg-primary" />
              <Swatch label="secondary" bg="bg-secondary" />
              <Swatch label="accent" bg="bg-accent" />
              <Swatch label="destructive" bg="bg-destructive" />
              <Swatch label="border" bg="bg-border" />
              <Swatch label="input" bg="bg-input" />
              <Swatch label="ring" bg="bg-ring" />
              <Swatch label="sidebar" bg="bg-sidebar" />
              <Swatch label="chart-1" bg="bg-chart-1" />
              <Swatch label="chart-2" bg="bg-chart-2" />
              <Swatch label="chart-3" bg="bg-chart-3" />
              <Swatch label="chart-4" bg="bg-chart-4" />
            </div>
          </Section>

          <Separator />

          {/* ── Buttons ─────────────────────────────────────────────── */}
          <Section icon={Layout} title="Buttons">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">Large</Button>
                <Button size="default">Default</Button>
                <Button size="sm">Small</Button>
                <Button size="icon"><Search className="size-4" /></Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled outline</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="gap-2"><Check className="size-4" /> Com ícone esquerda</Button>
                <Button variant="outline" className="gap-2">Com ícone direita <ChevronDown className="size-4" /></Button>
              </div>
            </div>
          </Section>

          <Separator />

          {/* ── Badges ──────────────────────────────────────────────── */}
          <Section icon={Layers} title="Badges">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </Section>

          <Separator />

          {/* ── Inputs ──────────────────────────────────────────────── */}
          <Section icon={Layout} title="Form Controls">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left column */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="pg-name">Nome completo</Label>
                  <Input id="pg-name" placeholder="Giovany Junior" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pg-email">E-mail</Label>
                  <Input id="pg-email" type="email" placeholder="giovany@example.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pg-search">Pesquisa</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input id="pg-search" className="pl-9" placeholder="Pesquisar..." />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pg-bio">Bio</Label>
                  <Textarea id="pg-bio" placeholder="Fale um pouco sobre você..." rows={3} />
                </div>
                <div className="space-y-1.5">
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="dev">Desenvolvimento</SelectItem>
                      <SelectItem value="produto">Produto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input disabled placeholder="Input desabilitado" />
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Checkboxes</Label>
                  <div className="space-y-2">
                    {['Opção A', 'Opção B', 'Opção C'].map((opt, i) => (
                      <div key={opt} className="flex items-center gap-2">
                        <Checkbox
                          id={`pg-cb-${i}`}
                          checked={i === 0 ? checked : i === 1}
                          onCheckedChange={i === 0 ? (v) => setChecked(!!v) : undefined}
                        />
                        <Label htmlFor={`pg-cb-${i}`} className="cursor-pointer font-normal">{opt}</Label>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <Checkbox id="pg-cb-dis" disabled />
                      <Label htmlFor="pg-cb-dis" className="cursor-not-allowed font-normal text-muted-foreground">Desabilitado</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Radio Group</Label>
                  <RadioGroup value={radio} onValueChange={setRadio} className="space-y-2">
                    {['option-a', 'option-b', 'option-c'].map((opt) => (
                      <div key={opt} className="flex items-center gap-2">
                        <RadioGroupItem value={opt} id={`pg-r-${opt}`} />
                        <Label htmlFor={`pg-r-${opt}`} className="cursor-pointer font-normal capitalize">
                          {opt.replace('-', ' ')}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Switches</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Switch id="pg-sw" checked={switchOn} onCheckedChange={setSwitchOn} />
                      <Label htmlFor="pg-sw" className="cursor-pointer font-normal">
                        {switchOn ? 'Ativado' : 'Desativado'}
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch disabled />
                      <Label className="text-muted-foreground font-normal">Desabilitado</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Slider — {sliderValue[0]}%</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </Section>

          <Separator />

          {/* ── Cards ───────────────────────────────────────────────── */}
          <Section icon={Layout} title="Cards">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Card Padrão</CardTitle>
                  <CardDescription>Descrição secundária do card.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Conteúdo do card com texto informativo.</p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm">Confirmar</Button>
                  <Button size="sm" variant="outline">Cancelar</Button>
                </CardFooter>
              </Card>

              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-primary">Card Destaque</CardTitle>
                    <Badge>Novo</Badge>
                  </div>
                  <CardDescription>Variação com cores primárias.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Usado para destacar conteúdo importante.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">Explorar</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progresso</CardTitle>
                  <CardDescription>Indicadores de carregamento.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Concluído</span><span>72%</span>
                    </div>
                    <Progress value={72} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Pendente</span><span>35%</span>
                    </div>
                    <Progress value={35} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Crítico</span><span>8%</span>
                    </div>
                    <Progress value={8} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Separator />

          {/* ── Alerts ──────────────────────────────────────────────── */}
          <Section icon={Info} title="Alerts">
            <div className="space-y-3">
              <Alert>
                <Info className="size-4" />
                <AlertTitle>Informação</AlertTitle>
                <AlertDescription>Uma mensagem informativa para o usuário.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <X className="size-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>Algo deu errado. Por favor tente novamente.</AlertDescription>
              </Alert>
            </div>
          </Section>

          <Separator />

          {/* ── Tabs ────────────────────────────────────────────────── */}
          <Section icon={Layers} title="Tabs">
            <Tabs defaultValue="conta">
              <TabsList>
                <TabsTrigger value="conta">Conta</TabsTrigger>
                <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
              </TabsList>
              <TabsContent value="conta" className="mt-4">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-1.5">
                      <Label>Nome de exibição</Label>
                      <Input defaultValue="Giovany Junior" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Handle</Label>
                      <Input defaultValue="@giovanyjunior" />
                    </div>
                    <Button size="sm">Salvar alterações</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="seguranca" className="mt-4">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-1.5">
                      <Label>Senha atual</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Nova senha</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <Button size="sm">Atualizar senha</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notificacoes" className="mt-4">
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    {['E-mails de marketing', 'Alertas de segurança', 'Atualizações do produto'].map((item) => (
                      <div key={item} className="flex items-center justify-between">
                        <Label className="font-normal">{item}</Label>
                        <Switch defaultChecked={item !== 'E-mails de marketing'} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Section>

          <Separator />

          {/* ── Overlays ────────────────────────────────────────────── */}
          <Section icon={Layers} title="Overlays & Dropdowns">
            <div className="flex flex-wrap items-center gap-3">
              {/* Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Abrir Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar ação</DialogTitle>
                    <DialogDescription>
                      Esta ação não pode ser desfeita. Tem certeza que deseja continuar?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancelar</Button>
                    <Button>Confirmar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Dropdown <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Tooltip variations */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon"><Info className="size-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip com informação extra</TooltipContent>
              </Tooltip>
            </div>
          </Section>

          <Separator />

          {/* ── Skeleton & Avatars ──────────────────────────────────── */}
          <Section icon={Layers} title="Skeleton & Avatars">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Skeleton</p>
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-24 w-full rounded-md" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20 rounded-md" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Avatars</p>
                <div className="flex items-center gap-2">
                  {['GJ', 'AB', 'MC', 'RX', 'TK'].map((initials, i) => (
                    <Avatar key={initials} className="size-10" style={{ marginLeft: i > 0 ? '-8px' : undefined }}>
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">{initials}</AvatarFallback>
                    </Avatar>
                  ))}
                  <span className="ml-3 text-sm text-muted-foreground">+12 mais</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  {['sm', 'md', 'lg'].map((s) => (
                    <Avatar key={s} className={s === 'sm' ? 'size-7' : s === 'lg' ? 'size-14' : 'size-10'}>
                      <AvatarFallback className="text-xs bg-muted text-muted-foreground">{s}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Separator />

          {/* ── Calendar ────────────────────────────────────────────── */}
          <Section icon={Layout} title="Calendar">
            <div className="flex justify-start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-border"
              />
            </div>
          </Section>

        </main>
      </div>
    </TooltipProvider>
  )
}

export const Default: Story = {
  render: () => <PlaygroundPage />,
}
