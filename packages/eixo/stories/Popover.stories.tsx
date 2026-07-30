import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const meta: Meta<typeof Popover> = {
  title: 'Componentes/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Dimensões</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensões</h4>
            <p className="text-sm text-muted-foreground">Defina as dimensões do painel.</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Largura</Label>
            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Altura</Label>
            <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
