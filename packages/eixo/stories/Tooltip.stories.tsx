import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const meta: Meta<typeof Tooltip> = {
  title: 'Componentes/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Adicionar cliente</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
