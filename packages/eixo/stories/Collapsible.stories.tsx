import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronsUpDown } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Collapsible> = {
  title: 'Componentes/Collapsible',
  component: Collapsible,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">3 clientes na fila de espera</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon">
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md px-3 py-2 text-sm shadow-[var(--shadow-raised-sm)]">
        Camila Rocha
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md px-3 py-2 text-sm shadow-[var(--shadow-raised-sm)]">
          Beatriz Lima
        </div>
        <div className="rounded-md px-3 py-2 text-sm shadow-[var(--shadow-raised-sm)]">
          Fernanda Alves
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
