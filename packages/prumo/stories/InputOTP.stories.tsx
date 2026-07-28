import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'

// InputOTP requer children; usamos render em cada story para controle total.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Componentes/InputOTP',
  component: InputOTP,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <InputOTP maxLength={6} aria-label="Código de verificação">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSeparator />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const ComLabel: Story = {
  name: 'Com label — verificação de e-mail',
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <Label htmlFor="otp-email">Código de verificação</Label>
      <p className="text-sm text-muted-foreground">Enviamos um código para seu e-mail.</p>
      <InputOTP id="otp-email" maxLength={6} aria-label="Código de verificação de e-mail">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSeparator />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
}

export const QuatroDigitos: Story = {
  name: '4 dígitos',
  render: () => (
    <InputOTP maxLength={4} aria-label="Código de 4 dígitos">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
}
