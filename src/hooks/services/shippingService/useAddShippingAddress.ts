import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useToast } from '@hooks/useToast'
import { request } from '@utils/RequestGenerator'
import { SHIPPING_ENDPOINT, ShippingAddress } from '@utils/types/shipping.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'
import { shippingFormSchema, ShippingFormData } from '@utils/zod-schemas/shipping-schema'

import { useUserStore } from '@/store'

const useAddShippingAddress = () => {
  const [addShippingAddressError, setAddShippingAddressError] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { userData } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingFormSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ShippingFormData) => {
      return request<ShippingAddress>({
        url: `${SHIPPING_ENDPOINT}/create`,
        method: 'POST',
        data: {
          userId: userData?._id,
          fullName: `${userData?.firstName} ${userData?.lastName}`,
          address: data.address,
          city: 'Barranquilla',
          department: 'Atlantico',
          contactPhoneNumber: data.contactPhoneNumber,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`shipping-address-${userData?._id}`],
      })
      toast({
        title: '✅ Dirección de Envío Agregada',
        description: 'Has agregado una nueva dirección de envío con éxito.',
      })
    },
    onError: (error) =>
      setAddShippingAddressError(error?.message || API_ERROR_DEFAULT_MESSAGE),
  })

  const onSubmit: SubmitHandler<ShippingFormData> = (data: ShippingFormData) => {
    setAddShippingAddressError(null)
    mutate(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    addShippingAddressError,
  }
}

export { useAddShippingAddress }

