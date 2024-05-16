import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { Feedback } from '@ui/feedback'
import { Button } from '@forms/button'
import { Input } from '@forms/input'
import { Label } from '@forms/label'
import { useLogin } from '@hooks/services/userService/useLogin'

const Login = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const { register, handleSubmit, errors, isPending, loginError } = useLogin()

  return (
    <div className="align-center-row gap-3">
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-5">
          <Label htmlFor="email" className="text-tertiary">
            Correo electrónico
          </Label>
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

        <div className="mb-5">
          <Label htmlFor="password" className="text-tertiary">
            Contraseña
          </Label>
          <div className="flex flex-row space-x-2">
            <Input
              type={passwordShown ? 'text' : 'password'}
              id="password"
              placeholder="Contraseña"
              {...register('password')}
            />
            <Button
              size="icon"
              type="button"
              className="transition duration-300 hover:shadow-md focus:shadow-md"
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

        {loginError && <Feedback variant="error" message={loginError} />}

        <Button type="submit" isLoading={isPending}>
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login
