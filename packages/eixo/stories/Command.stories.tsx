import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar, Smile, Calculator, User, CreditCard, Settings } from 'lucide-react'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

const meta: Meta<typeof Command> = {
  title: 'Componentes/Command',
  component: Command,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => (
    <Command className="w-96 rounded-lg">
      <CommandInput placeholder="Digite um comando ou busque..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Sugestões">
          <CommandItem><Calendar className="mr-2 h-4 w-4" /><span>Calendário</span></CommandItem>
          <CommandItem><Smile className="mr-2 h-4 w-4" /><span>Emoji</span></CommandItem>
          <CommandItem><Calculator className="mr-2 h-4 w-4" /><span>Calculadora</span></CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Configurações">
          <CommandItem>
            <User className="mr-2 h-4 w-4" /><span>Perfil</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" /><span>Cobrança</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" /><span>Configurações</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
