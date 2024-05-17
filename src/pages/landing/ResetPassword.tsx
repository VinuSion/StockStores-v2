import { useState } from 'react'
import { Eye, EyeOff, KeySquare } from 'lucide-react'

import { Feedback } from '@ui/feedback'
import { Button } from '@forms/button'
import { Input } from '@forms/input'
import { Label } from '@forms/label'

import { useResetPassword } from '@hooks/services/userService/useResetPassword'

const ResetPassword = () => {
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
    <div className="align-center-row gap-3 w-auto h-auto">
      <form onSubmit={handleSubmit} className="mt-5">
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
              type="button"
              className="transition duration-300 hover:shadow-md focus:shadow-md w-12"
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
            <Feedback variant="error" message={errors.repeatPassword.message} />
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
  )
}

export default ResetPassword
