import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Selecione a categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="entradas">Entradas</SelectItem>
        <SelectItem value="serviços">Serviços principais</SelectItem>
        <SelectItem value="bebidas">Bebidas</SelectItem>
        <SelectItem value="extras">Extras</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const ComLabel: Story = {
  name: 'Com label',
  render: () => (
    <div className="flex flex-col gap-2 w-56">
      <Label>Categoria do serviço</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Escolha..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="entradas">Entradas</SelectItem>
          <SelectItem value="serviços">Serviços principais</SelectItem>
          <SelectItem value="bebidas">Bebidas</SelectItem>
          <SelectItem value="extras">Extras</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const ComGrupos: Story = {
  name: 'Com grupos',
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Selecione..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Salgados</SelectLabel>
          <SelectItem value="pizza">Pizza</SelectItem>
          <SelectItem value="hamburger">Hambúrguer</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Bebidas</SelectLabel>
          <SelectItem value="suco">Suco natural</SelectItem>
          <SelectItem value="refrigerante">Refrigerante</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Desabilitado: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Indisponível" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="item">Item</SelectItem>
      </SelectContent>
    </Select>
  ),
}
