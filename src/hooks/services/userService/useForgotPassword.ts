import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { request } from '@utils/RequestGenerator'
import { USERS_ENDPOINT, User } from '@utils/types/user.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'
import {
  forgotFormSchema,
  ForgotFormData,
} from '@utils/zod-schemas/auth-schema'

const useForgotPassword = () => {
  const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isCountdownActive, setIsCountdownActive] = useState<boolean>(false)
  const [remainingTime, setRemainingTime] = useState<number>(600) // 10 minutes in seconds

  const startCountdown = () => {
    setIsCountdownActive(true)
    setRemainingTime(600) // Reset the countdown timer to 10 minutes
  }

  useEffect(() => {
    let timer: any
    if (isCountdownActive) {
      timer = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime((prevTime) => prevTime - 1)
        } else {
          clearInterval(timer)
          setIsCountdownActive(false)
          setSuccessMessage(null)
          reset({ email: '' })
        }
      }, 1000) // Updates every second
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [isCountdownActive, remainingTime])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotFormSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgotFormData) => {
      const response = request<User>({
        url: `${USERS_ENDPOINT}/forgot-password`,
        method: 'POST',
        data: data,
      })
      setSuccessMessage(`Hemos enviado el enlace a tu correo (${data?.email})`)
      return response
    },
    onSuccess: () => startCountdown(),
    onError: (error) =>
      setForgotPasswordError(error?.message || API_ERROR_DEFAULT_MESSAGE),
  })

  const onSubmit: SubmitHandler<ForgotFormData> = (data: ForgotFormData) => {
    setForgotPasswordError(null)
    mutate(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    successMessage,
    forgotPasswordError,
    remainingTime,
    isCountdownActive,
  }
}

export { useForgotPassword }
