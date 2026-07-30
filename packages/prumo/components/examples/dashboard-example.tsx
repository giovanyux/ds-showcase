import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle, Terminal, CheckCircle2, Info, Loader2,
  Store, ShoppingCart, Utensils, Users, Settings, Bell, Search, Filter, Plus, Edit3, Trash2, LogOut, Calendar, CreditCard, MapPin, Clock, ChevronRight, MoreHorizontal, Share2, HelpCircle, Star, ImagePlus, ChevronDownIcon, Package
} from "lucide-react";
import {
  Dialog, DialogContent, DialogTrigger, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover";

const UI_COMPONENTS = [
  "accordion", "alert-dialog", "alert", "aspect-ratio", "avatar", "badge", "breadcrumb", "button-group",
  "button", "calendar", "card", "carousel", "chart", "checkbox", "collapsible", "combobox", "command",
  "context-menu", "dialog", "drawer", "dropdown-menu", "empty", "field", "hover-card", "input-group",
  "input-otp", "input", "kbd", "label", "menubar", "native-select", "navigation-menu", "pagination",
  "popover", "progress", "radio-group", "resizable", "scroll-area", "select", "separator", "sheet",
  "sidebar", "skeleton", "slider", "sonner", "spinner", "switch", "table", "tabs", "textarea",
  "toggle-group", "toggle", "tooltip"
];

const NAV_MODULES = [
  {
    id: 'agendamentos',
    icon: ShoppingCart,
    label: 'Agendamentos',
    items: [
      { label: 'Em andamento', icon: Clock, active: true },
      { label: 'Concluídos', icon: CheckCircle2, active: false },
      { label: 'Histórico', icon: Calendar, active: false },
    ]
  },
  {
    id: 'catalogo',
    icon: Utensils,
    label: 'Catálogo',
    items: [
      { label: 'Produtos', icon: Package, active: false },
      { label: 'Categorias', icon: Filter, active: false },
      { label: 'Promoções', icon: Star, active: false },
    ]
  },
  {
    id: 'config',
    icon: Settings,
    label: 'Configurações',
    items: [
      { label: 'Perfil', icon: Users, active: false },
      { label: 'Pagamento', icon: CreditCard, active: false },
      { label: 'Localização', icon: MapPin, active: false },
    ]
  },
];

const MULTI_SELECT_OPTIONS = [
  { id: "opt1", label: "Item A" },
  { id: "opt2", label: "Item B" },
  { id: "opt3", label: "Item C" },
  { id: "opt4", label: "Item D" },
];

export function DashboardExample() {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={{
        "--sidebar-width": "16rem",
        "--sidebar-width-icon": "70px",
      } as React.CSSProperties}
    >
      <DashboardContent />
    </SidebarProvider>
  );
}

function DashboardContent() {
  return (
    <>
      {/* ── SIDEBAR (SHADCN) ── */}
      <Sidebar collapsible="icon" className="bg-card border-r border-border">
        <SidebarHeader className="h-16 flex flex-row items-center gap-3 px-4 border-b border-border/50 shrink-0">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
            <Store className="size-6 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground truncate group-data-[collapsible=icon]:hidden">
            Dashboard
          </span>
        </SidebarHeader>

        <SidebarContent className="bg-card">
          <SidebarMenu className="gap-1 p-2">
            {NAV_MODULES.map((module) => (
              <SidebarMenuItem key={module.id}>
                <Collapsible defaultOpen={module.id === 'agendamentos'} className="group/collapsible w-full">
                  <CollapsibleTrigger className="flex w-full items-center gap-2 h-10 rounded-xl px-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
                    <module.icon className="size-5 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">{module.label}</span>
                    <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                    <SidebarMenuSub className="ml-4 border-l border-border/50 pl-2 gap-0.5 mt-0.5">
                      {module.items.map((item) => (
                        <SidebarMenuSubItem key={item.label}>
                          <SidebarMenuSubButton
                            isActive={item.active}
                            className={cn(
                              "h-9 rounded-lg text-sm",
                              item.active
                                ? "text-primary bg-primary/10 hover:bg-primary/10 hover:text-primary"
                                : "text-muted-foreground hover:text-primary hover:bg-muted"
                            )}
                          >
                            <item.icon className="size-4" />
                            <span>{item.label}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="pb-8 flex flex-col items-center gap-6 bg-card border-t border-border/50">
          <button aria-label="Notificações" className="p-3 text-muted-foreground hover:text-primary transition-colors relative">
            <Bell className="size-5" />
            <span className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full border-2 border-card" />
          </button>
          <Avatar className="size-10 border-2 border-transparent hover:border-primary transition-all cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>GJ</AvatarFallback>
          </Avatar>
        </SidebarFooter>
      </Sidebar>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <SidebarInset className="overflow-auto bg-background">
        <div className="px-6 py-8 md:px-12 md:py-10 space-y-16">
          {/* ── HEADER ── */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="size-10 rounded-xl bg-card border border-border shadow-sm hover:bg-muted transition-colors" />
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Design System</h1>
              </div>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                  Ambiente de validação visual dos tokens e componentes.
                  Foco em <span className="text-primary font-medium">acessibilidade WCAG</span> e <span className="text-primary font-medium">estética premium</span>.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button className="hidden sm:flex rounded-xl shadow-lg shadow-primary/20">Publicar DS</Button>
              </div>
            </header>

        {/* ── 1. CORES E TIPOGRAFIA ── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <div className="w-2 h-6 bg-primary rounded-full" />
              Paleta Semântica (Tokens Reais)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Primary", token: "var(--primary)", text: "#AE4526", contrast: "5.48:1 ✅", fg: "white" },
                { label: "Secondary", token: "var(--secondary)", text: "Slate 100", contrast: "UI Element", fg: "var(--secondary-foreground)" },
                { label: "Destructive", token: "var(--destructive)", text: "Red 600", contrast: "6.54:1 ✅", fg: "white" },
                { label: "Success", token: "var(--success)", text: "Emerald 700", contrast: "6.87:1 ✅", fg: "white" },
                { label: "Warning", token: "var(--warning)", text: "Amber 600", contrast: "Safe Read", fg: "black" },
                { label: "Info", token: "var(--info)", text: "#186A99", contrast: "5.90:1 ✅", fg: "white" },
                { label: "Muted", token: "var(--muted)", text: "Low Priority", contrast: "UI", fg: "var(--muted-foreground)" },
                { label: "Accent", token: "var(--accent)", text: "Hover/Active", contrast: "UI", fg: "var(--accent-foreground)" },
              ].map((c) => (
                <div key={c.label} className="group relative bg-card p-3 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
                  <div className="w-full h-24 rounded-xl mb-3 flex items-center justify-center text-xs font-bold uppercase tracking-widest"
                       style={{ backgroundColor: c.token, color: c.fg }}>
                    {c.label}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{c.label}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-medium">{c.contrast}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <div className="w-2 h-6 bg-primary rounded-full" />
              Tipografia: Inter
            </h2>
            <div className="bg-card p-6 rounded-2xl border border-border space-y-4 shadow-sm">
              <p className="text-4xl font-bold tracking-tighter text-foreground">Bold 700</p>
              <p className="text-3xl font-semibold tracking-tight text-foreground">Semibold 600</p>
              <p className="text-2xl font-medium text-foreground">Medium 500</p>
              <p className="text-xl font-normal text-muted-foreground">Regular 400</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Inter é uma fonte desenhada especificamente para interfaces.
                Altíssima legibilidade em tamanhos pequenos.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. ICONOGRAFIA ── */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-2 h-6 bg-primary rounded-full" />
            Iconografia (Lucide Icons)
          </h2>
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-8">
              {[
                { Icon: Store, label: "Loja" },
                { Icon: ShoppingCart, label: "Agendamento" },
                { Icon: Utensils, label: "Catálogo" },
                { Icon: Users, label: "Clientes" },
                { Icon: Settings, label: "Ajustes" },
                { Icon: Bell, label: "Notificação" },
                { Icon: Search, label: "Busca" },
                { Icon: Filter, label: "Filtro" },
                { Icon: Plus, label: "Adicionar" },
                { Icon: Edit3, label: "Editar" },
                { Icon: Trash2, label: "Excluir" },
                { Icon: LogOut, label: "Sair" },
                { Icon: Calendar, label: "Agenda" },
                { Icon: CreditCard, label: "Pagamento" },
                { Icon: MapPin, label: "Entrega" },
                { Icon: Clock, label: "Horário" },
                { Icon: ChevronRight, label: "Seta" },
                { Icon: MoreHorizontal, label: "Mais" },
                { Icon: Share2, label: "Partilhar" },
                { Icon: HelpCircle, label: "Suporte" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 group">
                  <div className="p-3 rounded-xl bg-muted border border-border group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                    <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. FEEDBACK E ESTADOS DE ERRO ── */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-2 h-6 bg-primary rounded-full" />
            Feedback e Estados de Erro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 shadow-sm shadow-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertTitle>Erro de Conexão</AlertTitle>
                <AlertDescription>
                  Não foi possível salvar as alterações. Verifique sua internet e tente novamente.
                </AlertDescription>
              </Alert>

              <Alert className="bg-emerald-50/50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/5 dark:border-emerald-500/20 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle className="text-emerald-800 dark:text-emerald-400">Sucesso!</AlertTitle>
                <AlertDescription className="text-emerald-700 dark:text-emerald-500/80">
                  O item &quot;Lorem Especial&quot; foi atualizado com sucesso.
                </AlertDescription>
              </Alert>

              <Alert className="bg-amber-50/50 border-amber-200 text-amber-600 dark:bg-amber-500/5 dark:border-amber-500/20 dark:text-amber-400">
                <Info className="h-4 w-4" />
                <AlertTitle className="text-amber-800 dark:text-amber-400">Atenção</AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-500/80">
                  O seu negócio fechará em 15 minutos. Agendamentos pendentes devem ser aceitos.
                </AlertDescription>
              </Alert>
            </div>

            <Card className="shadow-xl shadow-foreground/10 dark:shadow-none border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Loading e Skeleton</CardTitle>
                <CardDescription>Estados de carregamento do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-62.5" />
                    <Skeleton className="h-4 w-50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>Sincronizando fotos...</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} aria-label="Sincronizando fotos" className="h-2" />
                </div>
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando pagamento
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── 3. FORMULÁRIOS E INPUTS ── */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-2 h-6 bg-primary rounded-full" />
            Formulários e Controles
          </h2>
          <Card className="border-border shadow-sm">
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Inputs & Selects */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="i1">Input Normal</Label>
                  <Input id="i1" placeholder="Digite algo..." />
                </div>

                    <div className="space-y-2">
                      <Label>Select Simples</Label>
                      <Select defaultValue="domicilio">
                        <SelectTrigger aria-label="Select Simples">
                          <SelectValue placeholder="Escolha um método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="domicilio">Domicílio</SelectItem>
                          <SelectItem value="pickup">Retirada</SelectItem>
                          <SelectItem value="dinein">No Local</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Select Múltiplo</Label>
                      <Popover>
                        <PopoverTrigger render={
                          <Button variant="outline" className="w-full h-9 justify-between font-normal border-input">
                            <span className="text-muted-foreground">Selecionar itens...</span>
                            <ChevronDownIcon className="size-4 opacity-50" />
                          </Button>
                        } />
                        <PopoverContent className="w-(--anchor-width) p-2 bg-popover shadow-xl border-border">
                          <div className="space-y-1">
                            {MULTI_SELECT_OPTIONS.map((opt) => (
                              <div key={opt.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors group">
                                <Checkbox id={opt.id} />
                                <Label htmlFor={opt.id} className="text-sm font-medium cursor-pointer group-hover:text-primary transition-colors">{opt.label}</Label>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                <div className="space-y-2">
                  <Label htmlFor="i2" className="text-destructive">Input com Erro</Label>
                  <Input id="i2" className="border-destructive focus-visible:ring-destructive" defaultValue="Valor inválido" />
                  <p className="text-[11px] text-destructive font-medium">Este campo é obrigatório.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="i3" className="opacity-50">Input Desabilitado</Label>
                  <Input id="i3" disabled placeholder="Não editável" />
                </div>
              </div>

              {/* Selection */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Opções de Entrega</Label>
                  <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg border border-border">
                    <Checkbox id="c1" defaultChecked />
                    <Label htmlFor="c1" className="text-sm font-normal">Domicílio Próprio</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg">
                    <Checkbox id="c2" />
                    <Label htmlFor="c2" className="text-sm font-normal">Retirada no Balcão</Label>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Tempo de Preparo</Label>
                  <RadioGroup defaultValue="30">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="15" id="r1" />
                      <Label htmlFor="r1">15 min</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30" id="r2" />
                      <Label htmlFor="r2">30 min</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Complex Controls */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Área de cobertura (km)</Label>
                  <Slider defaultValue={[5]} max={20} step={1} aria-label="Área de cobertura (km)" className="py-4" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0km</span>
                    <span>10km</span>
                    <span>20km</span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between bg-primary/5 p-3 rounded-xl border border-primary/20">
                    <div className="space-y-0.5">
                      <Label htmlFor="modo-noturno" className="text-primary font-bold">Modo Noturno</Label>
                      <p className="text-[10px] text-primary/70 uppercase font-bold tracking-tight">Ativar automaticamente</p>
                    </div>
                    <Switch id="modo-noturno" defaultChecked />
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </section>

        {/* ── 4. BOTÕES E COMPONENTES DE INTERAÇÃO ── */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-2 h-6 bg-primary rounded-full" />
            Interação (Buttons & Variants)
          </h2>
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-10">

            {/* Linha de Variantes */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Variantes</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="ghost-primary">Ghost Primary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link Button</Button>
              </div>
            </div>

            {/* Linha de Tamanhos */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tamanhos</p>
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-2 items-center">
                  <Button size="xs">Extra Small</Button>
                  <span className="text-[10px] text-muted-foreground">xs (28px)</span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <Button size="sm">Small</Button>
                  <span className="text-[10px] text-muted-foreground">sm (32px)</span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <Button size="default">Default</Button>
                  <span className="text-[10px] text-muted-foreground">md (36px)</span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <Button size="lg">Large</Button>
                  <span className="text-[10px] text-muted-foreground">lg (44px)</span>
                </div>
              </div>
            </div>

            {/* Ícones e Estados */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ícones e Estados</p>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="icon-sm" variant="outline" aria-label="Terminal (tamanho pequeno)"><Terminal className="size-4" /></Button>
                <Button size="icon" variant="outline" aria-label="Terminal (tamanho padrão)"><Terminal className="size-4" /></Button>
                <Button size="icon-lg" variant="outline" aria-label="Terminal (tamanho grande)"><Terminal className="size-5" /></Button>
                <Button><CheckCircle2 className="mr-2 size-4" /> Com Ícone</Button>
                <Button variant="secondary" disabled>Desabilitado</Button>
                <Button variant="outline" className="group">
                  Hover Scale
                  <div className="ml-2 size-2 rounded-full bg-primary transition-all group-hover:scale-150" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Modal de Exemplo</p>
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button size="lg" className="w-full md:w-auto rounded-xl">
                        <Plus className="mr-2 size-4" /> Novo Item
                      </Button>
                    }
                  />
                  <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-popover border-none shadow-2xl ring-1 ring-border/50">
                    <Tabs defaultValue="info" className="w-full">
                      <div className="border-b border-border/50 bg-muted/50 px-6 pt-6">
                        <TabsList className="bg-transparent h-12 w-full justify-start gap-8 p-0">
                          <TabsTrigger value="info" className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:text-white data-[state=active]:shadow-none transition-all">
                            Informações
                          </TabsTrigger>
                          <TabsTrigger value="addons" className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:text-white data-[state=active]:shadow-none transition-all">
                            Complementos
                          </TabsTrigger>
                          <TabsTrigger value="availability" className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:text-white data-[state=active]:shadow-none transition-all">
                            Disponibilidade
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <div className="p-8 max-h-[85vh] overflow-y-auto custom-scrollbar bg-popover">
                        <TabsContent value="info" className="mt-0 space-y-8">
                          {/* Top Section: Image + Basic Info */}
                          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
                            <div className="space-y-4">
                              <div className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 bg-muted text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                <div className="p-4 rounded-full bg-card shadow-sm group-hover:scale-110 transition-transform">
                                  <ImagePlus className="size-8 text-primary" />
                                </div>
                                <div className="text-center px-4">
                                  <p className="text-xs font-bold text-foreground">Selecione uma imagem</p>
                                  <p className="text-[10px]">ou arraste e solte</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase text-muted-foreground">Nome do item *</Label>
                                <Input placeholder="Ex: Item Lorem Especial" className="h-11 rounded-xl" />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-xs font-bold uppercase text-muted-foreground">Categoria *</Label>
                                  <Select>
                                    <SelectTrigger className="h-11 rounded-xl w-full" aria-label="Categoria">
                                      <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="a">Categoria A</SelectItem>
                                      <SelectItem value="b">Categoria B</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex items-end justify-between p-3 rounded-xl border border-border bg-muted h-11">
                                  <span className="text-xs font-medium">Destaque</span>
                                  <Switch aria-label="Destaque" />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-xs font-bold uppercase text-muted-foreground">Preço de venda *</Label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">R$</span>
                                    <Input defaultValue="0,00" className="h-11 rounded-xl pl-10" />
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 pt-6">
                                  <Switch id="promo" />
                                  <Label htmlFor="promo" className="text-xs font-medium">Promocional</Label>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Description Section */}
                          <div className="space-y-4 pt-4 border-t border-border">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs font-bold uppercase text-muted-foreground">Descrição do item</Label>
                              <Button variant="ghost-primary" size="xs" className="h-8 rounded-lg border border-primary/20">
                                <Star className="mr-2 size-3 fill-primary" /> Melhorar descrição com IA
                              </Button>
                            </div>
                            <Textarea placeholder="Descreva os detalhes do produto..." className="min-h-32 rounded-2xl resize-none" />
                            <p className="text-[10px] text-muted-foreground">
                              Estilize a descrição com <span className="font-bold">negrito</span> (*texto*), <span className="italic">itálico</span> (_texto_) ou <span className="line-through">riscado</span> (~texto~).
                            </p>
                          </div>

                          {/* Advanced Section */}
                          <Collapsible className="space-y-4 pt-4 border-t border-border">
                            <CollapsibleTrigger className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground hover:text-primary transition-colors group w-full">
                              <ChevronRight className="size-4 transition-transform group-data-[state=open]:rotate-90" />
                              Configurações Avançadas
                              <div className="flex-1 h-px bg-border ml-2" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-6 pt-4">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label className="text-xs font-bold uppercase text-muted-foreground">Unidade de medida</Label>
                                  <Select defaultValue="un">
                                    <SelectTrigger className="h-10 rounded-xl w-full" aria-label="Unidade de medida">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="un">Unidade (un)</SelectItem>
                                      <SelectItem value="kg">Quilo (kg)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs font-bold uppercase text-muted-foreground">Destino de roteamento</Label>
                                  <Select defaultValue="a">
                                    <SelectTrigger className="h-10 rounded-xl w-full" aria-label="Destino de roteamento">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="a">Destino A</SelectItem>
                                      <SelectItem value="b">Destino B</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-4">
                                {[
                                  "Ativar controle de estoque",
                                  "Esconder campo de observações",
                                  "Esconder botões de quantidades"
                                ].map((opt) => (
                                  <div key={opt} className="flex items-center gap-3">
                                    <Switch aria-label={opt} />
                                    <span className="text-sm text-muted-foreground">{opt}</span>
                                  </div>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </TabsContent>
                      </div>
                    </Tabs>

                    <DialogFooter className="p-6 bg-muted/50 border-t border-border flex flex-row items-center justify-between sm:justify-between">
                      <DialogClose
                        render={
                          <Button variant="ghost" className="rounded-xl">Cancelar</Button>
                        }
                      />
                      <Button className="px-12 rounded-xl shadow-lg shadow-primary/25">SALVAR ITEM</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="products">Produtos</TabsTrigger>
                  <TabsTrigger value="settings">Ajustes</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4 border rounded-b-xl border-t-0 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold">Giovany Junior</p>
                      <p className="text-xs text-muted-foreground">Administrador</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aqui você verá os principais indicadores do seu negócio hoje.
                    Vendas, novos clientes e tempo médio de entrega.
                  </p>
                </TabsContent>
              </Tabs>

              <Accordion className="w-full">
                <AccordionItem value="item-1" className="border-border">
                  <AccordionTrigger className="text-sm font-bold hover:no-underline">Como funciona a cobrança?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    A cobrança é feita mensalmente, com uma taxa fixa de 5% sobre o valor processado.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-border">
                  <AccordionTrigger className="text-sm font-bold hover:no-underline">Posso pausar a loja?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Sim, você pode usar o Switch de status no topo da página para pausar
                    o recebimento de agendamentos instantaneamente.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── 5. INVENTÁRIO DE COMPONENTES ── */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-2 h-6 bg-primary rounded-full" />
            Inventário de Componentes ({UI_COMPONENTS.length})
          </h2>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <p className="text-sm text-muted-foreground mb-6">
              Todos os componentes shadcn instalados no diretório <code className="text-primary font-bold">components/ui</code>.
            </p>
            <div className="flex flex-wrap gap-2">
              {UI_COMPONENTS.map((comp) => (
                <Badge
                  key={comp}
                  variant="outline"
                  className="bg-muted border-border text-muted-foreground capitalize px-3 py-1"
                >
                  {comp.replace(/-/g, " ")}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. GESTÃO DE ITENS (DATA TABLE) ── */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <div className="w-2 h-6 bg-primary rounded-full" />
              Gestão de Itens
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Buscar item..." className="h-9 pl-9 rounded-lg" />
              </div>
              <Button size="sm" className="rounded-lg">
                <Package className="mr-2 size-4" /> Novo Item
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden transition-all duration-300">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-20">Foto</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: 1, name: "Item Lorem", category: "Categoria A", price: "45,90", status: "Ativo", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop" },
                  { id: 2, name: "Item Ipsum", category: "Categoria B", price: "32,00", status: "Ativo", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop" },
                  { id: 3, name: "Item Dolor", category: "Categoria C", price: "12,50", status: "Indisponível", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&h=100&fit=crop" },
                  { id: 4, name: "Item Sit", category: "Categoria D", price: "18,00", status: "Ativo", img: "https://images.unsplash.com/photo-1573016608244-7d5f097f7426?w=100&h=100&fit=crop" },
                ].map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.img} alt="" width={40} height={40} className="size-10 rounded-lg object-cover border border-border shadow-sm" />
                    </TableCell>
                    <TableCell className="font-bold text-foreground">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded-md">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-muted-foreground">R$ {product.price}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === "Ativo" ? "success" : "destructive"}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="size-8 rounded-lg" aria-label={`Editar ${product.name}`}>
                          <Edit3 className="size-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:text-destructive" aria-label={`Excluir ${product.name}`}>
                          <Trash2 className="size-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* ── 7. EMPTY STATE (ESTADO VAZIO) ── */}
        <section className="bg-card/50 border-2 border-dashed border-border rounded-3xl p-16 text-center space-y-6">
          <div className="relative mx-auto size-24 bg-muted rounded-full flex items-center justify-center">
            <Package className="size-10 text-muted-foreground" />
            <div className="absolute -bottom-1 -right-1 size-8 bg-card rounded-full flex items-center justify-center border border-border shadow-sm">
              <Search className="size-4 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Nenhum item encontrado</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Não encontramos nenhum item com esses filtros. Tente ajustar sua busca ou limpar os filtros.
            </p>
          </div>
          <Button variant="outline" className="rounded-xl border-border">
            Limpar todos os filtros
          </Button>
        </section>

        {/* ── FOOTER ── */}
        <footer className="text-center pb-12 space-y-2 border-t border-border pt-8">
          <div className="flex justify-center gap-2">
            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Next.js 16</Badge>
            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tailwind v4</Badge>
            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Shadcn/UI</Badge>
          </div>
          <p className="text-xs text-muted-foreground">Prumo — Design System</p>
        </footer>
        </div>
      </SidebarInset>
    </>
  );
}
