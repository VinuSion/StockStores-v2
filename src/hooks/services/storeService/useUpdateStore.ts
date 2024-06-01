import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useToast } from '@hooks/useToast'
import { request } from '@utils/RequestGenerator'
import { STORES_ENDPOINT, Store } from '@utils/types/store.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'
import { storeFormSchema, StoreFormData } from '@utils/zod-schemas/store-schema'

const useUpdateStore = (store: Store) => {
  const [updateStoreError, setUpdateStoreError] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeName: store?.storeName,
      storeAddress: store?.storeAddress?.address,
      storePhoneNumber: store?.storePhoneNumber,
      storeDescription: store?.storeDescription || '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: StoreFormData) => {
      return request<Store>({
        url: `${STORES_ENDPOINT}/update/${store._id}`,
        method: 'PUT',
        data: {
          storeName: data.storeName,
          storeDescription: data.storeDescription || '',
          storePhoneNumber: data.storePhoneNumber,
          storeAddress: {
            address: data.storeAddress,
            city: store?.storeAddress?.city,
            department: store?.storeAddress?.department,
          },
          storeImageURL: store?.storeImageURL,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`store-${store?.storeSlug}`],
      })
      toast({
        title: '🔄 Tienda Actualizada Exitosamente',
        description: 'Los datos de tu tienda han sido actualizados con éxito.',
      })
    },
    onError: (error) =>
      setUpdateStoreError(error?.message || API_ERROR_DEFAULT_MESSAGE),
  })

  const onSubmit: SubmitHandler<StoreFormData> = (data: StoreFormData) => {
    setUpdateStoreError(null)
    mutate(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    updateStoreError,
  }
}

export { useUpdateStore }
