import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useToast } from '@hooks/useToast'
import { request } from '@utils/RequestGenerator'
import { STORES_ENDPOINT, Store } from '@utils/types/store.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'
import { storeFormSchema, StoreFormData } from '@utils/zod-schemas/store-schema'

import { useUserStore } from '@/store'

const useCreateStore = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [createStoreError, setCreateStoreError] = useState<string | null>(null)
  
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { userData } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeFormSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: StoreFormData) => {
      return request<Store>({
        url: `${STORES_ENDPOINT}/create`,
        method: 'POST',
        data: {
          sellerId: userData?._id,
          sellerFirstName: userData?.firstName,
          sellerLastName: userData?.lastName,
          sellerPictureURL: userData?.pictureURL,
          storeName: data.storeName,
          storeDescription: data.storeDescription || '',
          storePhoneNumber: data.storePhoneNumber,
          storeAddress: {
            address: data.storeAddress,
            city: 'Barranquilla',
            department: 'Atlantico',
          },
          storeImageURL: '',
        },
      })
    },
    onSuccess: () => {
      setFormOpen(false)
      queryClient.invalidateQueries({
        queryKey: [`seller-stores-${userData?._id}`],
      })
      toast({
        title: '🎉 Tienda Creada Exitosamente',
        description: 'Tu nueva tienda ha sido creada con éxito. ¡Felicidades!',
      })
      reset()
    },
    onError: (error) =>
      setCreateStoreError(error?.message || API_ERROR_DEFAULT_MESSAGE),
  })

  const onSubmit: SubmitHandler<StoreFormData> = (data: StoreFormData) => {
    setCreateStoreError(null)
    mutate(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setFormOpen,
    formOpen,
    errors,
    isPending,
    createStoreError,
  }
}

export { useCreateStore }
