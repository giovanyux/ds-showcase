import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: [],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Abrir dialog</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar negócio</DialogTitle>
          <DialogDescription>Altere as informações do seu negócio.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome-dialog">Nome</Label>
            <Input id="nome-dialog" defaultValue="Negócio Exemplo" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="telefone-dialog">Telefone</Label>
            <Input id="telefone-dialog" defaultValue="(11) 99999-0000" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancelar</Button>} />
          <Button>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Confirmacao: Story = {
  name: 'Confirmação de ação',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive"><Trash2 />Excluir item</Button>} />
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Excluir item do catálogo?</DialogTitle>
          <DialogDescription>Esta ação não pode ser desfeita. O item será removido permanentemente.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancelar</Button>} />
          <Button variant="destructive">Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
