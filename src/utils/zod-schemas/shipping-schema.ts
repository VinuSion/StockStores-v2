import { z } from 'zod'

// CREATE & UPDATE SHIPPING ADDRESS SCHEMA
export const shippingFormSchema = z.object({
  address: z
    .string()
    .min(1, 'Este campo es requerido')
    .refine((value) => !/[$@*^%!+={\[}\];:"'`]/.test(value), {
      message: 'La dirección contiene caracteres inválidos',
    }),
  contactPhoneNumber: z
    .string()
    .min(1, 'Este campo es requerido')
    .refine((value) => /^[0-9+\s()-]+$/.test(value), {
      message: 'Número de teléfono inválido',
    }),
})

export type ShippingFormData = z.infer<typeof shippingFormSchema>