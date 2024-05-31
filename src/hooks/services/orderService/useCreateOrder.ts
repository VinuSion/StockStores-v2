import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useToast } from '@hooks/useToast'
import { request } from '@utils/RequestGenerator'
import { ORDERS_ENDPOINT, Order } from '@utils/types/order.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'
import { paymentFormSchema, PaymentFormData } from '@utils/zod-schemas/payment-schema'
import { Store } from '@utils/types/store.types'

import { useOrderDetails } from '@services/orderService/useOrderDetails'
import { useUserStore, useShippingAddressStore } from '@/store'

const useCreateOrder = (store: Store) => {
  const [createOrderError, setCreateOrderError] = useState<string | null>(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { orderItems, itemsPrice, shippingPrice, totalPrice } = useOrderDetails()
  const { userData } = useUserStore()
  const { shippingAddresses } = useShippingAddressStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PaymentFormData) => {
      return request<Order>({
        url: `${ORDERS_ENDPOINT}/create`,
        method: 'POST',
        data: {
          userId: userData?._id,
          storeId: store?._id,
          storeSlug: store?.storeSlug,
          storeName: store?.storeName,
          storeImageURL: store?.storeImageURL,
          orderItems: orderItems,
          shippingAddress: {
            fullName: shippingAddresses[0]?.fullName,
            address: shippingAddresses[0]?.address,
            city: shippingAddresses[0]?.city,
            department: shippingAddresses[0]?.department,
            contactPhoneNumber: shippingAddresses[0]?.contactPhoneNumber,
          },
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          totalPrice: totalPrice,
          paymentMethod: data.paymentMethod,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`orders-from-user-${userData?._id}`],
      })
      navigate("/orders")
      toast({
        title: '📦 ¡Pedido Creado Exitosamente!',
        description: `Has creado un nuevo pedido en "${store?.storeName}". Notificaremos al vendedor de tu solicitud. ¡Gracias por tu compra!`,
      })
    },
    onError: (error) =>
      setCreateOrderError(error?.message || API_ERROR_DEFAULT_MESSAGE),
  })

  const onSubmit: SubmitHandler<PaymentFormData> = (data: PaymentFormData) => {
    setCreateOrderError(null)
    mutate(data)
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    isPending,
    createOrderError,
  }
}

export { useCreateOrder }