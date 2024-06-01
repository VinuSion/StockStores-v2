import { z } from 'zod'

// LOGIN SCHEMA
export const loginFormSchema = z.object({
  email: z.string().min(1, 'Este campo es requerido'),
  password: z.string().min(1, 'Este campo es requerido'),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

// SIGNUP SCHEMA
export const signupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: 'Mínimo 3 caracteres' })
      .max(20, { message: 'Maximo 20 caracteres' })
      .refine(
        (value) =>
          /^\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*(?:\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*){0,3}$/.test(
            value
          ),
        {
          message: 'Solo letras en el Nombre',
        }
      ),
    lastName: z
      .string()
      .min(3, { message: 'Mínimo 3 caracteres' })
      .max(20, { message: 'Maximo 20 caracteres' })
      .refine(
        (value) =>
          /^\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*(?:\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*){0,3}$/.test(
            value
          ),
        {
          message: 'Solo letras en el Apellido',
        }
      ),
    email: z.string().email({ message: 'Correo electronico invalido' }),
    password: z
      .string()
      .min(8, 'Contraseña debe tener minimo 8 caracteres')
      .refine(
        (password) => {
          return /[A-Z]/.test(password)
        },
        {
          message: 'Contraseña debe contener al menos una letra mayúscula',
        }
      )
      .refine(
        (password) => {
          return /\d/.test(password)
        },
        {
          message: 'Contraseña debe contener al menos un número',
        }
      )
      .refine(
        (password) => {
          return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)
        },
        {
          message: 'Contraseña debe incluir al menos un carácter especial',
        }
      ),
    repeatPassword: z
      .string()
      .min(8, { message: 'Las contraseñas no coinciden' })
      .max(20),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Las contraseñas no coinciden',
  })

export type SignupFormData = z.infer<typeof signupFormSchema>

// FORGOT PASSWORD SCHEMA
export const forgotFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Este campo es requerido')
    .email({ message: 'Correo electronico invalido' }),
})

export type ForgotFormData = z.infer<typeof forgotFormSchema>

// RESET PASSWORD SCHEMA
export const resetFormSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Contraseña debe tener minimo 8 caracteres')
      .refine(
        (password) => {
          return /[A-Z]/.test(password)
        },
        {
          message: 'Contraseña debe contener al menos una letra mayúscula',
        }
      )
      .refine(
        (password) => {
          return /\d/.test(password)
        },
        {
          message: 'Contraseña debe contener al menos un número',
        }
      )
      .refine(
        (password) => {
          return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)
        },
        {
          message: 'Contraseña debe incluir al menos un carácter especial',
        }
      ),
    repeatPassword: z
      .string()
      .min(8, { message: 'Las contraseñas no coinciden' })
      .max(20),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Las contraseñas no coinciden',
  })

export type ResetFormData = z.infer<typeof resetFormSchema>
