import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Calculator, Calendar, FileText, Settings, ShoppingBag, Users } from 'lucide-react'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandFooter,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Kbd, KbdGroup } from '@/components/ui/kbd'

const meta = {
  title: 'Componentes/Command',
  component: Command,
  parameters: { layout: 'centered' },
  tags: [],
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Command className="rounded-xl border shadow-md w-96">
      <CommandInput placeholder="Buscar no catálogo..." />
      <CommandList>
        <CommandEmpty />
        <CommandGroup heading="Catálogo">
          <CommandItem>
            <FileText />
            Pizza Margherita
            <CommandShortcut>R$ 42</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <ShoppingBag />
            Hambúrguer Smash
            <CommandShortcut>R$ 35</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navegação">
          <CommandItem>
            <Users />
            Agendamentos
          </CommandItem>
          <CommandItem>
            <Settings />
            Configurações
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <CommandFooter>
        <span className="flex items-center gap-1">
          <KbdGroup><Kbd>↑</Kbd><Kbd>↓</Kbd></KbdGroup> navegar
        </span>
        <span className="flex items-center gap-1">
          <Kbd>↵</Kbd> selecionar
        </span>
        <span className="flex items-center gap-1">
          <Kbd>Esc</Kbd> fechar
        </span>
      </CommandFooter>
    </Command>
  ),
}

export const Palette: Story = {
  name: 'Command Palette (Dialog)',
  render: () => (
    <Dialog>
      <DialogTrigger render={
        <Button variant="outline" className="gap-2 w-48 justify-between text-muted-foreground">
          Buscar...
          <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
        </Button>
      } />
      <DialogContent className="p-0 max-w-md overflow-hidden">
        <Command>
          <CommandInput placeholder="O que você procura?" />
          <CommandList>
            <CommandEmpty />
            <CommandGroup heading="Ações rápidas">
              <CommandItem><FileText />Novo item no catálogo</CommandItem>
              <CommandItem><Calculator />Ver relatório financeiro</CommandItem>
              <CommandItem><Calendar />Agendar promoção</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navegar para">
              <CommandItem><ShoppingBag />Agendamentos</CommandItem>
              <CommandItem><Users />Clientes</CommandItem>
              <CommandItem><Settings />Configurações</CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandFooter>
            <span className="flex items-center gap-1"><KbdGroup><Kbd>↑</Kbd><Kbd>↓</Kbd></KbdGroup> navegar</span>
            <span className="flex items-center gap-1"><Kbd>↵</Kbd> ir</span>
            <span className="flex items-center gap-1"><Kbd>Esc</Kbd> fechar</span>
          </CommandFooter>
        </Command>
      </DialogContent>
    </Dialog>
  ),
}
