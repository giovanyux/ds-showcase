import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Eye, EyeOff, Loader2, CheckCircle2, Shield, Lock,
  Smartphone, RotateCcw, ArrowLeft, Chrome, GitFork,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const meta: Meta = {
  title: 'Showcases/Authentication',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" type="button" className="gap-2">
        <svg className="size-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
      </Button>
      <Button variant="outline" type="button" className="gap-2">
        <GitFork className="size-4 fill-foreground stroke-0" />
        GitHub
      </Button>
    </div>
  )
}

function DividerOr() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center"><Separator /></div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">ou continue com</span>
      </div>
    </div>
  )
}

// ─── 1. Login simples ────────────────────────────────────────────────────────

function LoginSimples() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-2">
            <div className="size-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">Ei</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>Entre com seu e-mail e senha</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email-s">E-mail</Label>
            <Input id="email-s" type="email" placeholder="seu@email.com" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="pass-s">Senha</Label>
              <a href="#" className="text-xs text-primary hover:underline">Esqueceu?</a>
            </div>
            <div className="relative">
              <Input id="pass-s" type={show ? 'text' : 'password'} placeholder="••••••••" className="pr-9" />
              <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="rem-s" />
            <label htmlFor="rem-s" className="text-sm text-muted-foreground cursor-pointer">Lembrar por 30 dias</label>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3 pt-0">
          <Button className="w-full" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500) }} disabled={loading}>
            {loading && <Loader2 className="size-4 animate-spin mr-2" />}
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Sem conta? <a href="#" className="text-primary font-medium hover:underline">Cadastrar</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

// ─── 2. Login fullscreen com social + imagem ─────────────────────────────────

function LoginFullscreen() {
  const [show, setShow] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Bem-vindo de volta</h1>
            <p className="text-muted-foreground">Entre na sua conta para continuar</p>
          </div>

          <SocialButtons />
          <DividerOr />

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email-f">E-mail</Label>
              <Input id="email-f" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="pass-f">Senha</Label>
                <a href="#" className="text-xs text-primary hover:underline">Esqueceu a senha?</a>
              </div>
              <div className="relative">
                <Input id="pass-f" type={show ? 'text' : 'password'} placeholder="••••••••" className="pr-9" />
                <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <Button className="w-full">Entrar</Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Não tem conta?{' '}
            <a href="#" className="text-primary font-medium hover:underline">Criar conta grátis</a>
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden lg:flex w-[480px] shrink-0 flex-col bg-primary text-primary-foreground p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 size-72 rounded-full bg-primary-foreground -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 size-48 rounded-full bg-primary-foreground translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative flex items-center gap-2 mb-auto">
          <div className="size-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-xs font-bold">Ei</span>
          </div>
          <span className="font-semibold">Eixo</span>
        </div>

        <div className="relative space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: '12.400+', l: 'Negócios' },
              { v: 'R$ 2,1B', l: 'Processados' },
              { v: '99,9%',   l: 'Uptime' },
              { v: '4,9★',   l: 'Avaliação' },
            ].map(({ v, l }) => (
              <div key={l} className="bg-primary-foreground/10 rounded-xl p-4">
                <p className="text-2xl font-bold">{v}</p>
                <p className="text-sm text-primary-foreground/70 mt-0.5">{l}</p>
              </div>
            ))}
          </div>

          <blockquote className="space-y-3">
            <p className="text-lg leading-relaxed font-medium">
              "O melhor investimento que fizemos para o negócio. Retorno em menos de 2 meses."
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="size-9 border-2 border-primary-foreground/30">
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-sm">RB</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">Roberto Bastos</p>
                <p className="text-primary-foreground/70 text-xs">Dono, Churrascaria Dom Marcos</p>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  )
}

// ─── 3. Verificação de 2 fatores ─────────────────────────────────────────────

function TwoFactor() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)

  function handleInput(i: number, val: string) {
    if (!/^\d?$/.test(val)) return
    const next = [...code]
    next[i] = val
    setCode(next)
    if (val && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus()
    }
  }

  function handleVerify() {
    if (code.join('').length !== 6) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setVerified(true) }, 1200)
  }

  if (verified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-xs">
          <div className="flex justify-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-foreground">Verificado!</h2>
          <p className="text-sm text-muted-foreground">Autenticação concluída. Redirecionando...</p>
          <Button className="w-full" onClick={() => setVerified(false)}>Voltar ao início</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-2">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="size-6 text-primary" />
            </div>
          </div>
          <CardTitle>Verificação em 2 etapas</CardTitle>
          <CardDescription>
            Digite o código de 6 dígitos enviado para{' '}
            <span className="text-foreground font-medium">••••••@email.com</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OTP inputs */}
          <div className="flex gap-2 justify-center">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !digit && i > 0) {
                    document.getElementById(`otp-${i - 1}`)?.focus()
                  }
                }}
                className="size-11 text-center text-lg font-semibold rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            ))}
          </div>

          {/* Methods */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Smartphone className="size-3.5" />
              Reenviar SMS
            </button>
            <span>·</span>
            <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <RotateCcw className="size-3.5" />
              Código de backup
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3 pt-0">
          <Button className="w-full" onClick={handleVerify} disabled={loading || code.join('').length < 6}>
            {loading && <Loader2 className="size-4 animate-spin mr-2" />}
            {loading ? 'Verificando...' : 'Confirmar'}
          </Button>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-3.5" />
            Voltar ao login
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}

// ─── 4. Recuperação de senha ─────────────────────────────────────────────────

function RecuperarSenha() {
  const [step, setStep] = useState<'email' | 'sent' | 'nova'>('email')
  const [show, setShow] = useState(false)

  if (step === 'sent') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-5 max-w-sm w-full">
          <div className="flex justify-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">E-mail enviado!</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Enviamos as instruções para <strong>exemplo@email.com</strong>. Verifique sua caixa de entrada.
            </p>
          </div>
          <Button variant="outline" className="w-full gap-2" onClick={() => setStep('nova')}>
            Já tenho o link — continuar
          </Button>
          <button className="text-sm text-muted-foreground hover:text-foreground">
            Não recebi o e-mail
          </button>
        </div>
      </div>
    )
  }

  if (step === 'nova') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <div className="size-10 rounded-xl bg-primary flex items-center justify-center">
                <Lock className="size-5 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-center">Nova senha</CardTitle>
            <CardDescription className="text-center">Escolha uma senha forte de pelo menos 8 caracteres</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="new-pass">Nova senha</Label>
              <div className="relative">
                <Input id="new-pass" type={show ? 'text' : 'password'} placeholder="••••••••" className="pr-9" />
                <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-pass">Confirmar senha</Label>
              <Input id="confirm-pass" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">Requisitos:</p>
              {['Mínimo 8 caracteres', 'Uma letra maiúscula', 'Um número'].map((r) => (
                <div key={r} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-3.5 text-primary" />
                  {r}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full" onClick={() => setStep('email')}>Redefinir senha</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-2">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="size-5 text-primary" />
            </div>
          </div>
          <CardTitle>Esqueceu a senha?</CardTitle>
          <CardDescription>Digite seu e-mail e enviaremos um link de redefinição</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="reset-email">E-mail</Label>
            <Input id="reset-email" type="email" placeholder="seu@email.com" />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3 pt-0">
          <Button className="w-full" onClick={() => setStep('sent')}>Enviar link</Button>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-3.5" />
            Voltar ao login
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const LoginSimple: Story = {
  name: 'Login Simples',
  render: () => <LoginSimples />,
}

export const LoginComSocial: Story = {
  name: 'Login com Social + Imagem',
  render: () => <LoginFullscreen />,
}

export const DoisFatores: Story = {
  name: 'Verificação 2FA',
  render: () => <TwoFactor />,
}

export const RecuperacaoSenha: Story = {
  name: 'Recuperação de Senha',
  render: () => <RecuperarSenha />,
}
