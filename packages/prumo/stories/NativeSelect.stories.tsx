import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from '@/components/ui/native-select'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/NativeSelect',
  component: NativeSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['default', 'sm'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NativeSelect aria-label="Categoria">
      <NativeSelectOption value="">Selecione...</NativeSelectOption>
      <NativeSelectOption value="entradas">Entradas</NativeSelectOption>
      <NativeSelectOption value="serviços">Serviços principais</NativeSelectOption>
      <NativeSelectOption value="bebidas">Bebidas</NativeSelectOption>
    </NativeSelect>
  ),
}

export const ComLabel: Story = {
  name: 'Com label',
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="cat-select">Categoria</Label>
      <NativeSelect id="cat-select">
        <NativeSelectOption value="">Selecione...</NativeSelectOption>
        <NativeSelectOption value="entradas">Entradas</NativeSelectOption>
        <NativeSelectOption value="serviços">Serviços principais</NativeSelectOption>
        <NativeSelectOption value="bebidas">Bebidas</NativeSelectOption>
        <NativeSelectOption value="extras">Extras</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
}

export const ComOptGroup: Story = {
  name: 'Com grupos de opções',
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="menu-select">Item do catálogo</Label>
      <NativeSelect id="menu-select" className="w-56">
        <NativeSelectOption value="">Selecione um item...</NativeSelectOption>
        <NativeSelectOptGroup label="Entradas">
          <NativeSelectOption value="bruschetta">Bruschetta</NativeSelectOption>
          <NativeSelectOption value="carpaccio">Carpaccio</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Serviços principais">
          <NativeSelectOption value="pizza">Pizza Margherita</NativeSelectOption>
          <NativeSelectOption value="hamburguer">Hambúrguer Smash</NativeSelectOption>
          <NativeSelectOption value="salmao">Salmão Grelhado</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Bebidas">
          <NativeSelectOption value="coca">Coca-Cola 350ml</NativeSelectOption>
          <NativeSelectOption value="suco">Suco Natural</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  ),
}

export const Pequeno: Story = {
  name: 'Tamanho pequeno (sm)',
  render: () => (
    <NativeSelect size="sm" aria-label="Período">
      <NativeSelectOption value="hoje">Hoje</NativeSelectOption>
      <NativeSelectOption value="semana">Esta semana</NativeSelectOption>
      <NativeSelectOption value="mes">Este mês</NativeSelectOption>
    </NativeSelect>
  ),
}

export const Desabilitado: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="dis-select">Categoria (desabilitado)</Label>
      <NativeSelect id="dis-select" disabled aria-label="Categoria desabilitada">
        <NativeSelectOption value="serviços">Serviços principais</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
}

export const ComErro: Story = {
  name: 'Com erro de validação',
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="err-select">Forma de pagamento</Label>
      <NativeSelect id="err-select" aria-invalid="true" aria-describedby="err-msg">
        <NativeSelectOption value="">Selecione...</NativeSelectOption>
        <NativeSelectOption value="pix">Pix</NativeSelectOption>
        <NativeSelectOption value="credito">Cartão de crédito</NativeSelectOption>
        <NativeSelectOption value="dinheiro">Dinheiro</NativeSelectOption>
      </NativeSelect>
      <p id="err-msg" className="text-xs text-destructive">Selecione uma forma de pagamento.</p>
    </div>
  ),
}
