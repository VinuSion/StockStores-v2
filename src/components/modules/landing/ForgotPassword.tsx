import { Send, KeySquare } from 'lucide-react'

import { Feedback } from '@ui/feedback'
import { Button } from '@forms/button'
import { Input } from '@forms/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog'

import { formatTime } from '@utils/numberMethods'

import { useForgotPassword } from '@hooks/services/userService/useForgotPassword'

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    successMessage,
    forgotPasswordError,
    remainingTime,
    isCountdownActive,
  } = useForgotPassword()

  return (
    <Dialog>
      <DialogTrigger className="text-primary ml-1 hover:underline">
        Cambiar Contraseña
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full rounded-md">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-left flex flex-row items-center gap-1.5">
            <KeySquare className="svg-size" />
            Solicitar cambiar la contraseña
          </DialogTitle>
          <DialogDescription className="text-left text-xs sm:text-sm">
            Ingresa el correo electrónico que tienes asociado a tu cuenta.
            Nosotros nos encargamos de enviarte un enlace para cambiarlo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-1.5">
          <div className="flex flex-col gap-1.5">
            <div className="text-sm text-primary">
              {isCountdownActive && (
                <>
                  Tiempo restante: {Math.floor(remainingTime / 60)}:
                  {formatTime(remainingTime % 60)}
                </>
              )}
            </div>
            <div className="flex flex-row gap-2">
              <Input
                type="email"
                id="email"
                placeholder="Correo electrónico"
                disabled={isPending || isCountdownActive}
                {...register('email')}
              />
              <Button
                type="submit"
                isLoading={isPending || isCountdownActive}
                icon={<Send className="svg-size" />}
              >
                Enviar
              </Button>
            </div>
            {errors.email && (
              <Feedback variant="error" message={errors.email.message} />
            )}
            {forgotPasswordError && (
              <Feedback variant="error" message={forgotPasswordError} />
            )}
            {successMessage && (
              <Feedback variant="success" message={successMessage} />
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { ForgotPassword }
