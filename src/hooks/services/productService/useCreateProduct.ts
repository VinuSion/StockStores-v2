import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useToast } from '@hooks/useToast'
import { request } from '@utils/RequestGenerator'
import { PRODUCTS_ENDPOINT, Product } from '@utils/types/product.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'
import { productFormSchema, ProductFormData } from '@/utils/zod-schemas/product-schema'

const useCreateProduct = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [createProductError, setCreateProductError] = useState<string | null>(null)
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
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductFormData) => {
      return request<Product>({
        url: `${PRODUCTS_ENDPOINT}/create/${storeSlug}`,
        method: 'POST',
        data: {
          productName: data.productName,
          productDescription: data.productDescription,
          productPrice: data.productPrice,
          productBrand: data.productBrand || '',
          productCategory: data.productCategory,
          stockAmount: data.stockAmount,
          leadImageURL: '',
          imagesCollectionURL: [],
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
        title: '🎉 Producto Creado Exitosamente',
        description: 'Acabas de crear un nuevo producto en tu tienda. ¡Felicidades!',
      })
    },
    onError: (error) =>
      setCreateProductError(error?.message || API_ERROR_DEFAULT_MESSAGE),
  })

  const onSubmit: SubmitHandler<ProductFormData> = (data: ProductFormData) => {
    setCreateProductError(null)
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
    createProductError,
  }
}

export { useCreateProduct }