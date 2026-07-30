import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertCircle, Terminal } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const meta: Meta<typeof Alert> = {
  title: 'Componentes/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Atualização disponível</AlertTitle>
      <AlertDescription>Execute o comando de deploy pra publicar a versão mais recente.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erro ao salvar</AlertTitle>
      <AlertDescription>Não foi possível conectar ao servidor. Tente novamente.</AlertDescription>
    </Alert>
  ),
}
