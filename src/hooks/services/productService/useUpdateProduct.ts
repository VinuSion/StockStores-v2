import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useToast } from '@hooks/useToast'
import { request } from '@utils/RequestGenerator'
import { PRODUCTS_ENDPOINT, Product } from '@utils/types/product.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'
import {
  productFormSchema,
  ProductFormData,
} from '@/utils/zod-schemas/product-schema'

const useUpdateProduct = (product: Product) => {
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [updateProductError, setUpdateProductError] = useState<string | null>(null)
  const { storeSlug } = useParams<{ storeSlug: string }>()

  const queryClient = useQueryClient()
  const { toast } = useToast()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: product?.productName,
      productDescription: product?.productDescription,
      productPrice: product?.productPrice,
      productBrand: product?.productBrand || '',
      productCategory: product?.productCategory,
      stockAmount: product?.stockAmount,
      isFeatured: product?.isFeatured,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductFormData) => {
      return request<Product>({
        url: `${PRODUCTS_ENDPOINT}/update/${product._id}`,
        method: 'PUT',
        data: {
          productName: data.productName,
          productDescription: data.productDescription,
          productPrice: data.productPrice,
          productBrand: data.productBrand || '',
          productCategory:data.productCategory,
          stockAmount: data.stockAmount,
          isFeatured: data.isFeatured,
        },
      })
    },
    onSuccess: () => {
      setFormOpen(false)
      queryClient.invalidateQueries({
        queryKey: [`all-products-from-store-${storeSlug}`],
      })
      toast({
        title: '🔄 Producto Actualizado Exitosamente',
        description: 'Los datos de este producto han sido actualizados con éxito.',
      })
    },
    onError: (error) =>
      setUpdateProductError(error?.message || API_ERROR_DEFAULT_MESSAGE),
  })

  const onSubmit: SubmitHandler<ProductFormData> = (data: ProductFormData) => {
    setUpdateProductError(null)
    mutate(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setFormOpen,
    formOpen,
    control,
    errors,
    isPending,
    updateProductError,
  }
}

export { useUpdateProduct }