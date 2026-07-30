import type { Meta, StoryObj } from '@storybook/react-vite'
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

const meta: Meta<typeof Dialog> = {
  title: 'Componentes/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Altere suas informações e salve quando terminar.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Confirmacao: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Excluir conta</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tem certeza?</DialogTitle>
          <DialogDescription>Essa ação não pode ser desfeita. Todos os dados serão perdidos.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant="destructive">Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
