import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Drawer> = {
  title: 'Componentes/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Novo agendamento</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Novo agendamento</DrawerTitle>
            <DrawerDescription>
              Escolha o horário e a profissional para a cliente Mariana Costa.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Confirmar agendamento</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
}
