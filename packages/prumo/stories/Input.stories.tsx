import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Search, Mail, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: [],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'tel'] },
  },
  args: { placeholder: 'Digite aqui...', className: 'w-72' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Campo de texto' },
}

export const ComLabel: Story = {
  name: 'Com label',
  render: () => (
    <div className="flex flex-col gap-2 w-72">
      <Label htmlFor="nome">Nome do negócio</Label>
      <Input id="nome" placeholder="Ex: Negócio Exemplo" />
    </div>
  ),
}

export const Email: Story = {
  args: { type: 'email', placeholder: 'contato@exemplo.com', 'aria-label': 'Endereço de e-mail' },
}

export const ComErro: Story = {
  name: 'Com erro',
  render: () => (
    <div className="flex flex-col gap-2 w-72">
      <Label htmlFor="email-erro">E-mail</Label>
      <Input id="email-erro" type="email" placeholder="seu@email.com" aria-invalid="true" defaultValue="email-invalido" />
      <p className="text-xs text-destructive">E-mail inválido.</p>
    </div>
  ),
}

export const Desabilitado: Story = {
  args: { disabled: true, placeholder: 'Campo desabilitado', defaultValue: 'Valor fixo', 'aria-label': 'Campo desabilitado' },
}

export const Busca: Story = {
  render: () => (
    <div className="relative w-72">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input aria-label="Buscar no catálogo" placeholder="Buscar catálogo..." className="pl-9" />
    </div>
  ),
}

export const Senha: Story = {
  render: function SenhaStory() {
    const [show, setShow] = useState(false)
    return (
      <div className="relative w-72">
        <Input aria-label="Senha" type={show ? 'text' : 'password'} placeholder="Sua senha" className="pr-9" />
        <button
          type="button"
          aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
          onClick={() => setShow(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    )
  },
}
