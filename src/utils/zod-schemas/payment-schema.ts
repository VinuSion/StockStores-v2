import { z } from 'zod'

// ADD PAYMENT METHOD SCHEMA
export const paymentFormSchema = z.object({
  paymentMethod: z
    .string({
      required_error: 'Elije un metodo de Pago',
    })
    .refine(
      (value) => {
        return value && value !== 'Seleccione un Metodo de Pago'
      },
      {
        message: 'Elije un metodo de Pago',
      }
    ),
})

export type PaymentFormData = z.infer<typeof paymentFormSchema>
