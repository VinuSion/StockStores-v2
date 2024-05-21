import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, UserPlus } from 'lucide-react'

import { Feedback } from '@ui/feedback'
import { SVGFullLogo } from '@ui/svg-logo'
import { Button } from '@forms/button'
import { Checkbox } from '@forms/checkbox'
import { Input } from '@forms/input'
import { Label } from '@forms/label'

import { useSignup } from '@services/userService/useSignup'

const SignUp: React.FC = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const { register, handleSubmit, errors, isPending, signupError } = useSignup()

  return (
    <div className="align-center-row min-h-screen mx-3">
      <div className="w-full sm:w-[30rem] p-5 sm:p-8 border-2 rounded-md shadow-xl">
        <div className="align-center mb-3">
          <SVGFullLogo className="h-16" primaryAccent />
        </div>

        <div className="align-between">
          <h1 className="font-bold text-lg">Crear Cuenta</h1>
          <Link to="/">
            <Button
              size="icon"
              variant="outline"
              type="button"
              icon={<ArrowLeft className="svg-size" />}
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 w-full">
          <div className="flex flex-row gap-3 mb-1.5">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="Nombre"
                {...register('firstName')}
              />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                type="text"
                id="lastName"
                placeholder="Apellido"
                {...register('lastName')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {errors.firstName && (
              <Feedback variant="error" message={errors.firstName.message} />
            )}
            {errors.lastName && (
              <Feedback variant="error" message={errors.lastName.message} />
            )}
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
            <Label htmlFor="repeatPassword">Confirmar Contraseña</Label>
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
            {signupError && <Feedback variant="error" message={signupError} />}
          </div>

          <div className="flex items-center w-full gap-1.5 mb-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="cursor-pointer">
              Aceptar terminos y condiciones
            </Label>
          </div>

          <Button
            className="my-3 w-full"
            type="submit"
            isLoading={isPending}
            icon={<UserPlus className="svg-size" />}
          >
            Crear Cuenta
          </Button>

          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-xs sm:text-sm">
              ¿Ya estás en StockStores?
              <Link className="text-primary ml-1 hover:underline" to="/login">
                Iniciar sesión
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
