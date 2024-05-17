import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'

import { Feedback } from '@ui/feedback'
import { Button } from '@forms/button'
import { Checkbox } from '@forms/checkbox'
import { Input } from '@forms/input'
import { Label } from '@forms/label'
import { ForgotPassword } from '@modules/landing/ForgotPassword'

import { useLogin } from '@hooks/services/userService/useLogin'

const Login = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const { register, handleSubmit, errors, isPending, loginError } = useLogin()

  return (
    <div className="align-center-row gap-3 w-auto h-auto">
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid w-full gap-1.5 mb-5">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            type="email"
            id="email"
            placeholder="Correo electrónico"
            {...register('email')}
          />
          {errors.email && (
            <Feedback variant="error" message={errors.email.message} />
          )}
        </div>

        <div className="grid w-full gap-1.5 mb-5">
          <Label htmlFor="password">Contraseña</Label>
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
          {loginError && <Feedback variant="error" message={loginError} />}
        </div>

        <div className="flex items-center w-full gap-1.5 mb-2">
          <Checkbox id="sesion" />
          <Label
            htmlFor="sesion"
            className="text-xs sm:text-base cursor-pointer"
          >
            Mantener iniciada mi sesión
          </Label>
        </div>

        <Button
          className="my-3 w-full"
          type="submit"
          isLoading={isPending}
          icon={<LogIn className="svg-size" />}
        >
          Login
        </Button>
      </form>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs sm:text-sm">
          ¿No tienes cuenta?
          <Link className="text-primary ml-1 hover:underline" to="/signup">
            Crear cuenta
          </Link>
        </span>
        <span className="text-xs sm:text-sm">
          ¿Olvidaste la Contraseña?
          <ForgotPassword />
        </span>
      </div>
    </div>
  )
}

export default Login
