import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { request } from '@utils/RequestGenerator'
import { USERS_ENDPOINT, User } from '@utils/types/user.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'
import { loginFormSchema, LoginFormData } from '@utils/zod-schemas/auth-schema'
import { useUserStore } from '@/store'

const useLogin = () => {
  const [loginError, setLoginError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setUserData } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => {
      return request<User>({
        url: `${USERS_ENDPOINT}/login`,
        method: 'POST',
        data: data,
      })
    },
    onSuccess: (userData: User) => {
      setUserData(userData)
      userData?.isSeller ? navigate('/dashboard') : navigate('/stores')
    },
    onError: (error) => setLoginError(error?.message || API_ERROR_DEFAULT_MESSAGE)
  })

  const onSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    setLoginError(null)
    mutate(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    loginError,
  }
}

export { useLogin }
