import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@forms/button'
import { Input } from '@forms/input'
import { Label } from '@forms/label'
import useLogin from '@hooks/services/userService/useLogin'

const Login = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const { register, handleSubmit, errors, isPending, loginError } = useLogin()

  return (
    <div className="align-center-row gap-3">
      <form onSubmit={handleSubmit}>
        <div>
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
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div>
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
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        {loginError && <div className="text-red-500">{loginError}</div>}
        <Button type="submit" isLoading={isPending}>
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login
