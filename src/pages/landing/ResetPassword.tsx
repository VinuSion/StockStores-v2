import { useState } from 'react'
import { Eye, EyeOff, KeySquare } from 'lucide-react'

import { Feedback } from '@ui/feedback'
import { SVGFullLogo } from '@ui/svg-logo'
import { Button } from '@forms/button'
import { Input } from '@forms/input'
import { Label } from '@forms/label'

import { useResetPassword } from '@services/userService/useResetPassword'

const ResetPassword: React.FC = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    isRedirecting,
    resetPasswordError,
    successMessage,
  } = useResetPassword()

  return (
    <div className="align-center-row min-h-screen mx-3">
      <div className="w-full sm:w-[28rem] p-5 sm:p-8 border-2 rounded-md shadow-xl">
        <div className="align-center mb-3">
          <SVGFullLogo className="h-16" primaryAccent />
        </div>

        <div className="align-between">
          <h1 className="font-bold text-lg">Cambiar Contraseña</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 w-full">
          <div className="grid w-full gap-1.5 mb-5">
            <Label htmlFor="password">Nueva Contraseña</Label>
            <div className="flex flex-row gap-2">
              <Input
                type={passwordShown ? 'text' : 'password'}
                id="password"
                placeholder="Contraseña"
                {...register('password')}
              />
              <Button
                size="icon"
                variant="outline"
                type="button"
                className="w-12"
                icon={
                  passwordShown ? (
                    <Eye className="svg-size" />
                  ) : (
                    <EyeOff className="svg-size" />
                  )
                }
                onClick={() => setPasswordShown(!passwordShown)}
              />
            </div>
            {errors.password && (
              <Feedback variant="error" message={errors.password.message} />
            )}
          </div>

          <div className="grid w-full gap-1.5 mb-5">
            <Label htmlFor="repeatPassword">Confirmar Nueva Contraseña</Label>
            <Input
              type="password"
              id="repeatPassword"
              placeholder="Confirmar Contraseña"
              {...register('repeatPassword')}
            />
            {errors.repeatPassword && (
              <Feedback
                variant="error"
                message={errors.repeatPassword.message}
              />
            )}
            {resetPasswordError && (
              <Feedback variant="error" message={resetPasswordError} />
            )}
            {successMessage && (
              <Feedback variant="success" message={successMessage} />
            )}
          </div>

          <Button
            className="my-3 w-full"
            type="submit"
            isLoading={isPending || isRedirecting}
            icon={<KeySquare className="svg-size" />}
          >
            Cambiar Contraseña
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
