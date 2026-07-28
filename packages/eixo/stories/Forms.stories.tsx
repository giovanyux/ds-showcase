import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const meta: Meta = {
  title: 'Showcases/Forms',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ─── Login ───────────────────────────────────────────────────────────────────

function LoginForm() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !pass) { setError(true); return }
    setError(false)
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="size-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">Ei</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Bem-vindo de volta</h1>
            <p className="text-sm text-muted-foreground">Entre com sua conta para continuar</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>E-mail ou senha incorretos. Tente novamente.</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error}
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <button type="button" className="text-xs text-primary hover:underline">Esqueceu a senha?</button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  aria-invalid={error}
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Lembrar por 30 dias
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="size-4 animate-spin mr-2" />}
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">ou continue com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button">
              <svg className="size-4 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
            <Button variant="outline" type="button">
              <svg className="size-4 mr-2 fill-foreground" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <a href="#" className="text-primary font-medium hover:underline">Criar conta</a>
          </p>
        </div>
      </div>

      {/* Right — illustration */}
      <div className="hidden lg:flex flex-1 flex-col bg-primary p-12 text-primary-foreground">
        <div className="flex items-center gap-2 mb-auto">
          <div className="size-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-xs font-bold">Ei</span>
          </div>
          <span className="font-semibold">Eixo</span>
        </div>

        <div className="space-y-4">
          <blockquote className="text-xl font-medium leading-relaxed">
            "O Eixo transformou como gerenciamos nosso negócio. Mais agendamentos, menos confusão."
          </blockquote>
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border-2 border-primary-foreground/30">
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-sm">JO</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">João Oliveira</p>
              <p className="text-primary-foreground/70 text-xs">Dono, Cantina do João</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 mt-8">
          <div className="h-1 w-8 bg-primary-foreground rounded-full" />
          <div className="h-1 w-3 bg-primary-foreground/40 rounded-full" />
          <div className="h-1 w-3 bg-primary-foreground/40 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// ─── Signup ──────────────────────────────────────────────────────────────────

function SignupForm() {
  const [showPass, setShowPass] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmar: '', termos: false })

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => { const n = { ...e }; delete n[field]; return n })
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.nome.trim()) e.nome = 'Nome é obrigatório'
    if (!form.email.includes('@')) e.email = 'E-mail inválido'
    if (form.senha.length < 8) e.senha = 'Senha deve ter ao menos 8 caracteres'
    if (form.senha !== form.confirmar) e.confirmar = 'Senhas não coincidem'
    if (!form.termos) e.termos = 'Aceite os termos para continuar'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-sm">
          <div className="flex justify-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Conta criada!</h2>
          <p className="text-muted-foreground text-sm">Enviamos um e-mail de confirmação para <strong>{form.email}</strong>. Verifique sua caixa de entrada.</p>
          <Button className="w-full" onClick={() => setSubmitted(false)}>Voltar ao login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="size-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">Ei</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Criar sua conta</CardTitle>
          <CardDescription>Comece gratuitamente. Sem cartão de crédito.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                placeholder="Maria Silva"
                value={form.nome}
                onChange={(e) => set('nome', e.target.value)}
                aria-invalid={!!errors.nome}
              />
              {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-email">E-mail</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="maria@exemplo.com"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="signup-senha">Senha</Label>
                <div className="relative">
                  <Input
                    id="signup-senha"
                    type={showPass ? 'text' : 'password'}
                    placeholder="8+ caracteres"
                    value={form.senha}
                    onChange={(e) => set('senha', e.target.value)}
                    aria-invalid={!!errors.senha}
                    className="pr-9"
                  />
                  <button
                    type="button"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPass((v) => !v)}
                  >
                    {showPass ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  </button>
                </div>
                {errors.senha && <p className="text-xs text-destructive">{errors.senha}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmar">Confirmar</Label>
                <Input
                  id="confirmar"
                  type="password"
                  placeholder="Repita a senha"
                  value={form.confirmar}
                  onChange={(e) => set('confirmar', e.target.value)}
                  aria-invalid={!!errors.confirmar}
                />
                {errors.confirmar && <p className="text-xs text-destructive">{errors.confirmar}</p>}
              </div>
            </div>

            {form.senha && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Força da senha</p>
                <div className="flex gap-1">
                  {[25, 50, 75, 100].map((pct) => (
                    <div
                      key={pct}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        form.senha.length >= (pct / 25) * 2
                          ? pct <= 25 ? 'bg-destructive'
                            : pct <= 50 ? 'bg-amber-500'
                            : pct <= 75 ? 'bg-amber-400'
                            : 'bg-emerald-500'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="termos"
                  checked={form.termos as boolean}
                  onCheckedChange={(checked) => set('termos', !!checked)}
                  className="mt-0.5"
                />
                <label htmlFor="termos" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  Concordo com os{' '}
                  <a href="#" className="text-primary hover:underline">Termos de Uso</a>
                  {' '}e a{' '}
                  <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
                </label>
              </div>
              {errors.termos && <p className="text-xs text-destructive">{errors.termos}</p>}
            </div>

            <Button type="submit" className="w-full">Criar conta grátis</Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3 pt-0">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou</span>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <a href="#" className="text-primary font-medium hover:underline">Entrar</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Login: Story = {
  render: () => <LoginForm />,
}

export const Cadastro: Story = {
  render: () => <SignupForm />,
}

export const LoginComErro: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="size-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">Ei</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Bem-vindo de volta</h1>
          </div>
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertDescription>E-mail ou senha incorretos. Verifique e tente novamente.</AlertDescription>
          </Alert>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="err-email">E-mail</Label>
              <Input id="err-email" type="email" defaultValue="usuario@email.com" aria-invalid />
              <p className="text-xs text-destructive">E-mail não encontrado</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="err-pass">Senha</Label>
              <Input id="err-pass" type="password" defaultValue="senha123" aria-invalid />
              <p className="text-xs text-destructive">Senha incorreta</p>
            </div>
            <Button className="w-full" variant="destructive" disabled>Entrar</Button>
          </div>
        </div>
      </div>
    )
  },
}
