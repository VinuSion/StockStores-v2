import { z } from 'zod'

// LOGIN SCHEMA
export const loginFormSchema = z.object({
  email: z.string().min(1, 'Este campo es requerido'),
  password: z.string().min(1, 'Este campo es requerido'),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

// SIGNUP SCHEMA