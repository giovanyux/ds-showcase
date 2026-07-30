import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Card> = {
  title: 'Componentes/Card',
  component: Card,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Plano atual</CardTitle>
        <CardDescription>Resumo de uso do mês</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">72% do limite mensal utilizado.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Fazer upgrade</Button>
      </CardFooter>
    </Card>
  ),
}
