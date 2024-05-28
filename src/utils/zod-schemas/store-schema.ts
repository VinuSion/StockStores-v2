import { z } from 'zod'

// CREATE & UPDATE STORE SCHEMA
export const storeFormSchema = z.object({
  storeName: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(25, { message: 'Maximo 25 caracteres' })
    .refine(
      (value) =>
        /^\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*(?:\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*){0,3}$/.test(
          value
        ),
      {
        message: 'Solo letras en el Nombre',
      }
    ),
  storeAddress: z
    .string()
    .min(1, 'Este campo es requerido')
    .refine((value) => !/[$@*^%!+={\[}\];:"'`]/.test(value), {
      message: 'La dirección contiene caracteres inválidos',
    }),
  storePhoneNumber: z
    .string()
    .min(1, 'Este campo es requerido')
    .refine((value) => /^[0-9+\s()-]+$/.test(value), {
      message: 'Número de teléfono inválido',
    }),
  storeDescription: z
    .string()
    .max(250, { message: 'Maximo 250 caracteres' })
    .optional(),
})

export type StoreFormData = z.infer<typeof storeFormSchema>
