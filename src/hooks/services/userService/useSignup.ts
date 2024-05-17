import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { request } from '@utils/RequestGenerator'
import { USERS_ENDPOINT, User } from '@utils/types/user.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'
import { normalizeName } from '@utils/stringMethods'
import {
  signupFormSchema,
  SignupFormData,
} from '@utils/zod-schemas/auth-schema'

const useSignup = () => {
  const [signupError, setSignupError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignupFormData) => {
      return request<User>({
        url: `${USERS_ENDPOINT}/signup`,
        method: 'POST',
        data: {
          firstName: normalizeName(data.firstName.trim()),
          lastName: normalizeName(data.lastName.trim()),
          email: data.email,
          password: data.password,
        },
      })
    },
    onSuccess: () => navigate('/login'),
    onError: (error) =>
      setSignupError(error?.message || API_ERROR_DEFAULT_MESSAGE),
  })

  const onSubmit: SubmitHandler<SignupFormData> = (data: SignupFormData) => {
    setSignupError(null)
    mutate(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    signupError,
  }
}

export { useSignup }
