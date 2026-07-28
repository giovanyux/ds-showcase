import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import {
  Lock, Mail, Phone, MapPin, DollarSign,
  Eye, EyeOff, Upload, ChevronRight, Check,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { InputGroup, InputGroupText, InputGroupInput } from '@/components/ui/input-group'
import { FieldSet, FieldLegend } from '@/components/ui/field'
import { NativeSelect } from '@/components/ui/native-select'
import { Spinner } from '@/components/ui/spinner'

// ─── Form: Login ─────────────────────────────────────────────────────────────

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setTimeout(() => { setLoading(false); setError(true) }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">P</div>
          <h1 className="text-xl font-semibold tracking-tight">Entrar no portal</h1>
          <p className="text-sm text-muted-foreground">Acesse sua conta do Prumo</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="size-4 shrink-0" />
                  E-mail ou senha incorretos.
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <InputGroup>
                  <InputGroupText><Mail className="size-3.5 text-muted-foreground" /></InputGroupText>
                  <InputGroupInput id="email" type="email" placeholder="seu@email.com" aria-invalid={error} />
                </InputGroup>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button type="button" className="text-xs text-primary hover:underline">Esqueci a senha</button>
                </div>
                <InputGroup>
                  <InputGroupText><Lock className="size-3.5 text-muted-foreground" /></InputGroupText>
                  <InputGroupInput id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" aria-invalid={error} />
                  <InputGroupText>
                    <button type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                      {showPassword ? <EyeOff className="size-3.5 text-muted-foreground" /> : <Eye className="size-3.5 text-muted-foreground" />}
                    </button>
                  </InputGroupText>
                </InputGroup>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="cursor-pointer font-normal text-sm">Manter conectado</Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Spinner className="text-primary-foreground" />Entrando...</> : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Novo por aqui?{' '}
          <button className="text-primary hover:underline font-medium">Criar conta grátis</button>
        </p>
      </div>
    </div>
  )
}

// ─── Form: Perfil do negócio ─────────────────────────────────────────────

function PerfilForm() {
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.SyntheticEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-section py-layout space-y-section">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Perfil do negócio</h1>
          <p className="mt-1 text-sm text-muted-foreground">Essas informações aparecem no seu catálogo público.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Foto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Foto e identidade</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-5">
              <Avatar size="lg">
                <AvatarFallback className="text-xl bg-primary/10 text-primary font-bold">PJ</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button type="button" variant="outline" size="sm">
                  <Upload />Enviar foto
                </Button>
                <p className="text-xs text-muted-foreground">PNG ou JPG. Máximo 2MB.</p>
              </div>
            </CardContent>
          </Card>

          {/* Dados principais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informações básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-component">
                <div className="space-y-1.5">
                  <Label htmlFor="nome">Nome do negócio</Label>
                  <Input id="nome" defaultValue="Loja Exemplo" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="categoria">Categoria</Label>
                  <NativeSelect id="categoria" defaultValue="a">
                    <option value="a">Categoria A</option>
                    <option value="b">Categoria B</option>
                    <option value="c">Categoria C</option>
                    <option value="d">Categoria D</option>
                  </NativeSelect>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Conte um pouco sobre o seu negócio..."
                  defaultValue="A melhor pizza artesanal da cidade, feita com ingredientes frescos e massa de fermentação natural."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">Aparece no topo do seu catálogo. Máximo 200 caracteres.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-component">
                <div className="space-y-1.5">
                  <Label htmlFor="telefone">Telefone</Label>
                  <InputGroup>
                    <InputGroupText><Phone className="size-3.5 text-muted-foreground" /></InputGroupText>
                    <InputGroupInput id="telefone" placeholder="(11) 99999-0000" defaultValue="(11) 98765-4321" />
                  </InputGroup>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email-rest">E-mail de contato</Label>
                  <InputGroup>
                    <InputGroupText><Mail className="size-3.5 text-muted-foreground" /></InputGroupText>
                    <InputGroupInput id="email-rest" type="email" defaultValue="joao@exemplo.com" />
                  </InputGroup>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="endereco">Endereço</Label>
                <InputGroup>
                  <InputGroupText><MapPin className="size-3.5 text-muted-foreground" /></InputGroupText>
                  <InputGroupInput id="endereco" defaultValue="Rua das Flores, 123 — São Paulo, SP" />
                </InputGroup>
              </div>
            </CardContent>
          </Card>

          {/* Horários */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Horário de funcionamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { dia: 'Segunda a sexta', horario: '11:00 – 23:00', ativo: true },
                { dia: 'Sábado', horario: '11:00 – 00:00', ativo: true },
                { dia: 'Domingo', horario: '12:00 – 22:00', ativo: false },
              ].map(({ dia, horario, ativo }) => (
                <div key={dia} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked={ativo} aria-label={`${dia} ativo`} />
                    <span className="text-sm font-medium">{dia}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{horario}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">Cancelar</Button>
            <Button type="submit">
              {saved ? <><Check className="size-4" />Salvo!</> : 'Salvar alterações'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Form: Novo item do catálogo ──────────────────────────────────────────────

function NovoItemForm() {
  const [step, setStep] = useState(1)
  const total = 3

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Novo item</h1>
            <p className="mt-1 text-sm text-muted-foreground">Passo {step} de {total}</p>
          </div>
          <Badge variant="secondary">{step === 1 ? 'Informações' : step === 2 ? 'Preço' : 'Disponibilidade'}</Badge>
        </div>

        <Progress value={(step / total) * 100} aria-label={`Passo ${step} de ${total}`} />

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informações do item</CardTitle>
              <CardDescription>Descreva o produto que você está adicionando.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="item-nome">Nome do item <span className="text-destructive">*</span></Label>
                <Input id="item-nome" placeholder="Ex: Pizza Margherita" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="item-cat">Categoria</Label>
                <NativeSelect id="item-cat">
                  <option>Pizzas tradicionais</option>
                  <option>Pizzas especiais</option>
                  <option>Bebidas</option>
                  <option>Extras</option>
                </NativeSelect>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="item-desc">Descrição</Label>
                <Textarea id="item-desc" placeholder="Ingredientes, modo de preparo, destaques..." rows={3} />
              </div>
              <div className="rounded-md border border-dashed border-border bg-muted/30 p-8 text-center">
                <Upload className="mx-auto mb-2 size-6 text-muted-foreground" />
                <p className="text-sm font-medium">Arraste uma foto ou clique para enviar</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG até 5MB</p>
                <Button type="button" variant="outline" size="sm" className="mt-3">Escolher arquivo</Button>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={() => setStep(2)}>Próximo <ChevronRight /></Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preço e tamanhos</CardTitle>
              <CardDescription>Configure o valor e os tamanhos disponíveis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <FieldSet>
                <FieldLegend>Tipo de venda</FieldLegend>
                <RadioGroup defaultValue="unico">
                  {[
                    { value: 'unico', label: 'Preço único', desc: 'Um preço para todos os agendamentos' },
                    { value: 'tamanhos', label: 'Por tamanho', desc: 'Pequeno, médio, grande etc.' },
                    { value: 'peso', label: 'Por peso/quantidade', desc: 'Preço por kg ou unidade' },
                  ].map(({ value, label, desc }) => (
                    <div key={value} className="flex items-start gap-3">
                      <RadioGroupItem value={value} id={`tipo-${value}`} className="mt-0.5" />
                      <div>
                        <Label htmlFor={`tipo-${value}`} className="cursor-pointer">{label}</Label>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </FieldSet>

              <Separator />

              <div className="space-y-1.5">
                <Label htmlFor="preco">Preço</Label>
                <InputGroup>
                  <InputGroupText><DollarSign className="size-3.5 text-muted-foreground" /></InputGroupText>
                  <InputGroupInput id="preco" placeholder="0,00" className="font-mono" />
                </InputGroup>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="preco-promo">Preço promocional <span className="text-xs text-muted-foreground">(opcional)</span></Label>
                <InputGroup>
                  <InputGroupText><DollarSign className="size-3.5 text-muted-foreground" /></InputGroupText>
                  <InputGroupInput id="preco-promo" placeholder="0,00" className="font-mono" />
                </InputGroup>
                <p className="text-xs text-muted-foreground">Deixe em branco para não exibir promoção.</p>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>Voltar</Button>
              <Button onClick={() => setStep(3)}>Próximo <ChevronRight /></Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Disponibilidade</CardTitle>
              <CardDescription>Controle quando e onde esse item aparece.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Disponível agora</p>
                  <p className="text-xs text-muted-foreground">Item visível no catálogo imediatamente.</p>
                </div>
                <Switch defaultChecked aria-label="Disponível agora" />
              </div>

              <Separator />

              <FieldSet>
                <FieldLegend>Disponível para</FieldLegend>
                {[
                  { id: 'domicilio', label: 'Domicílio', checked: true },
                  { id: 'retirada', label: 'Retirada no local', checked: true },
                  { id: 'presencial', label: 'Atendimento presencial', checked: false },
                ].map(({ id, label, checked }) => (
                  <div key={id} className="flex items-center gap-2">
                    <Checkbox id={id} defaultChecked={checked} />
                    <Label htmlFor={id} className="cursor-pointer font-normal">{label}</Label>
                  </div>
                ))}
              </FieldSet>

              <Separator />

              <div className="space-y-1.5">
                <Label htmlFor="estoque">Estoque disponível <span className="text-xs text-muted-foreground">(opcional)</span></Label>
                <InputGroup>
                  <InputGroupInput id="estoque" type="number" placeholder="Ilimitado" className="font-mono" />
                  <InputGroupText className="text-xs text-muted-foreground">un.</InputGroupText>
                </InputGroup>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="ghost" onClick={() => setStep(2)}>Voltar</Button>
              <Button>
                <Check />Salvar item
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

// ─── Form: Configurações ──────────────────────────────────────────────────────

function ConfiguracoesForm() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-section py-layout space-y-section">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerencie as preferências da sua conta.</p>
        </div>

        <Tabs defaultValue="notificacoes">
          <TabsList>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="plano">Plano</TabsTrigger>
          </TabsList>

          <TabsContent value="notificacoes" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Novos agendamentos</CardTitle>
                <CardDescription>Como você quer ser avisado quando chegar um agendamento.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { id: 'push', label: 'Notificação no app', desc: 'Som e vibração no celular', checked: true },
                  { id: 'email-agendamento', label: 'E-mail', desc: 'Resumo enviado para joao@exemplo.com', checked: false },
                  { id: 'whatsapp', label: 'WhatsApp', desc: 'Mensagem no número cadastrado', checked: true },
                ].map(({ id, label, desc, checked }) => (
                  <div key={id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Switch id={id} defaultChecked={checked} aria-label={label} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Relatórios</CardTitle>
                <CardDescription>Receba resumos periódicos do desempenho.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldSet>
                  <FieldLegend variant="label">Frequência do relatório</FieldLegend>
                  <RadioGroup defaultValue="semanal">
                    {['Diário', 'Semanal', 'Mensal', 'Nunca'].map(v => (
                      <div key={v} className="flex items-center gap-2">
                        <RadioGroupItem value={v.toLowerCase()} id={`rel-${v}`} />
                        <Label htmlFor={`rel-${v}`} className="cursor-pointer font-normal">{v}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FieldSet>
              </CardContent>
              <CardFooter className="justify-end">
                <Button size="sm">Salvar preferências</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Alterar senha</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="senha-atual">Senha atual</Label>
                  <Input id="senha-atual" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="senha-nova">Nova senha</Label>
                  <Input id="senha-nova" type="password" placeholder="••••••••" />
                  <p className="text-xs text-muted-foreground">Mínimo 8 caracteres, com letras e números.</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="senha-confirma">Confirmar nova senha</Label>
                  <Input id="senha-confirma" type="password" placeholder="••••••••" />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button size="sm">Atualizar senha</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Autenticação em dois fatores</CardTitle>
                <CardDescription>Adicione uma camada extra de segurança à sua conta.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Desativado</Badge>
                  <span className="text-sm text-muted-foreground">Recomendamos ativar para maior segurança.</span>
                </div>
                <Button variant="outline" size="sm">Ativar</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plano" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Plano atual</CardTitle>
                <CardDescription>Você está no plano <strong>Básico</strong>.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">Plano Básico</span>
                    <Badge variant="default">Ativo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">R$ 49/mês · Renova em 15 de maio</p>
                </div>
                {[
                  { label: 'Itens no catálogo', usado: 28, total: 50 },
                  { label: 'Agendamentos este mês', usado: 310, total: 500 },
                ].map(({ label, usado, total }) => (
                  <div key={label} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{usado} / {total}</span>
                    </div>
                    <Progress value={(usado / total) * 100} aria-label={label} />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Ver planos disponíveis</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Showcases/Forms',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Showcase de formulários do Prumo — login, perfil, cadastro de item e configurações.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Login: Story = {
  render: () => <LoginForm />,
}

export const LoginDark: Story = {
  name: 'Login — Dark',
  globals: { theme: 'dark' },
  render: () => <LoginForm />,
}

export const Perfil: Story = {
  name: 'Perfil do negócio',
  render: () => <PerfilForm />,
}

export const PerfilDark: Story = {
  name: 'Perfil — Dark',
  globals: { theme: 'dark' },
  render: () => <PerfilForm />,
}

export const NovoItem: Story = {
  name: 'Novo item (multi-step)',
  render: () => <NovoItemForm />,
}

export const NovoItemDark: Story = {
  name: 'Novo item — Dark',
  globals: { theme: 'dark' },
  render: () => <NovoItemForm />,
}

export const Configuracoes: Story = {
  name: 'Configurações',
  render: () => <ConfiguracoesForm />,
}

export const ConfiguracoesDark: Story = {
  name: 'Configurações — Dark',
  globals: { theme: 'dark' },
  render: () => <ConfiguracoesForm />,
}
