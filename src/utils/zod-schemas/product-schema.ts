import { z } from 'zod'

// CREATE & UPDATE PRODUCT SCHEMA
export const productFormSchema = z.object({
  productName: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(25, { message: 'Máximo 25 caracteres' })
    .refine(
      (value) => /^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]*$/.test(value),
      {
        message: 'Solo letras o números en el Nombre',
      }
    ),
  productDescription: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(250, { message: 'Máximo 250 caracteres' }),
  productPrice: z
    .number()
    .min(100, { message: 'Precio mínimo es $100' })
    .max(1000000, { message: 'Precio máximo es $1.000.000' }),
  productBrand: z
    .string()
    .optional()
    .refine(
      (value) => value === undefined || /^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]*$/.test(value),
      {
        message: 'Solo letras o números',
      }
    ),
  productCategory: z
    .string({
      required_error: "Elije una categoría válida",
    })
    .refine((value) => {
      return value && value !== 'Seleccione una Categoria';
    }, {
      message: 'Elije una categoría válida',
    }),
  stockAmount: z
    .number()
    .min(1, { message: 'Stock mínimo es 1' })
    .max(1000, { message: 'Stock máximo es 1000' }),
  isFeatured: z.boolean(),
});

export type ProductFormData = z.infer<typeof productFormSchema>
