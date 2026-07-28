import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Settings, Trash2, Copy, Download } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Kbd, KbdGroup } from '@/components/ui/kbd'

const meta = {
  title: 'Componentes/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Configurações"><Settings /></Button>} />
      <TooltipContent>Configurações</TooltipContent>
    </Tooltip>
  ),
}

export const ComAtalho: Story = {
  name: 'Com atalho de teclado',
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Salvar</Button>} />
      <TooltipContent className="flex items-center gap-2">
        Salvar alterações
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  ),
}

export const BarraAcoes: Story = {
  name: 'Barra de ações com tooltips',
  render: () => (
    <div className="flex gap-1 p-2 bg-card border rounded-lg">
      {[
        { icon: Copy, label: 'Duplicar item', shortcut: ['⌘', 'D'] },
        { icon: Download, label: 'Exportar catálogo', shortcut: ['⌘', 'E'] },
        { icon: Trash2, label: 'Excluir', shortcut: ['⌫'] },
      ].map(({ icon: Icon, label, shortcut }) => (
        <Tooltip key={label}>
          <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label={label}><Icon /></Button>} />
          <TooltipContent className="flex items-center gap-2">
            {label}
            <KbdGroup>
              {shortcut.map(k => <Kbd key={k}>{k}</Kbd>)}
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}
