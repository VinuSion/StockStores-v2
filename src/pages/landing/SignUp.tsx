import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, UserRound } from 'lucide-react'

import { Feedback } from '@ui/feedback'
import { Button } from '@forms/button'
import { Checkbox } from '@forms/checkbox'
import { Input } from '@forms/input'
import { Label } from '@forms/label'

import { useSignup } from '@hooks/services/userService/useSignup'

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const { register, handleSubmit, errors, isPending, signupError } = useSignup()

  return (
    <div className="align-center-row gap-3 w-auto h-auto">
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex flex-row gap-3 mb-5">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="firstName">Nombre</Label>
            <Input
              type="text"
              id="firstName"
              placeholder="Nombre"
              {...register('firstName')}
            />
            {errors.firstName && (
              <Feedback variant="error" message={errors.firstName.message} />
            )}
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              type="text"
              id="lastName"
              placeholder="Apellido"
              {...register('lastName')}
            />
            {errors.lastName && (
              <Feedback variant="error" message={errors.lastName.message} />
            )}
          </div>
        </div>

        <div className="grid w-full gap-1.5 mb-5">
          <Label htmlFor="email">Correo electronico</Label>
          <Input
            type="email"
            id="email"
            placeholder="Correo electronico"
            {...register('email')}
          />
          {errors.email && !signupError && (
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
              onClick={() => setPasswordShown(!passwordShown)}
            >
              {passwordShown ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </Button>
          </div>
          {errors.password && (
            <Feedback variant="error" message={errors.password.message} />
          )}
        </div>

        <div className="grid w-full gap-1.5 mb-5">
          <Label htmlFor="repeatPassword">Confirmar Contraseña</Label>
          <Input
            type="password"
            id="repeatPassword"
            placeholder="Confirmar Contraseña"
            {...register('repeatPassword')}
          />
          {errors.repeatPassword && (
            <Feedback variant="error" message={errors.repeatPassword.message} />
          )}
          {signupError && <Feedback variant="error" message={signupError} />}
        </div>

        <div className="flex items-center w-full gap-1.5 mb-2">
          <Checkbox id="terms" />
          <Label
            htmlFor="terms"
            className="text-xs sm:text-base cursor-pointer"
          >
            Aceptar terminos y condiciones
          </Label>
        </div>

        <Button
          className="my-3 w-full"
          type="submit"
          isLoading={isPending}
          icon={<UserRound className="svg-size" />}
        >
          Crear Cuenta
        </Button>

        <div className="text-xs sm:text-base">
          ¿Ya estás en StockStores?
          <Link
            className="text-primary ml-1 hover:underline text-xs sm:text-base"
            to="/login"
          >
            Iniciar sesión
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
