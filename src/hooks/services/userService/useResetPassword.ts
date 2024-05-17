import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { request } from '@utils/RequestGenerator'
import { USERS_ENDPOINT, User } from '@utils/types/user.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'
import { resetFormSchema, ResetFormData } from '@utils/zod-schemas/auth-schema'

const useResetPassword = () => {
  const navigate = useNavigate()
  const { token } = useParams()

  const [isRedirecting, setIsRedirecting] = useState<boolean>(false)
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetFormSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ResetFormData) => {
      return request<User>({
        url: `${USERS_ENDPOINT}/reset-password`,
        method: 'POST',
        data: {
          password: data.password,
          token,
        },
      })
    },
    onSuccess: () => {
      setSuccessMessage('Contraseña cambiada exitosamente, redirigiendo a login...')
      setIsRedirecting(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    },
    onError: (error) =>
      setResetPasswordError(error?.message || API_ERROR_DEFAULT_MESSAGE),
  })

  const onSubmit: SubmitHandler<ResetFormData> = (data: ResetFormData) => {
    setResetPasswordError(null)
    mutate(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    isRedirecting,
    resetPasswordError,
    successMessage,
  }
}

export { useResetPassword }
