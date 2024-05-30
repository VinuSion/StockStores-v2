import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { request } from '@utils/RequestGenerator'
import { SHIPPING_ENDPOINT, ShippingAddress } from '@utils/types/shipping.types'

import { useUserStore, useShippingAddressStore  } from "@/store"

const useGetShippingAddress = () => {
  const { userData } = useUserStore()
  const { addAllAddresses } = useShippingAddressStore()

  const { isLoading, isError, data, error } = useQuery<ShippingAddress[], Error>({
    queryKey: [`shipping-address-${userData?._id}`],
    queryFn: () =>
      request<ShippingAddress[]>({
        url: `${SHIPPING_ENDPOINT}/${userData?._id}`,
        method: 'GET',
      }),
  })

  useEffect(() => {
    if (data && data.length > 0) {
      addAllAddresses(data)
    }
  }, [data, addAllAddresses])

  return { isLoading, isError, data, error }
}

export { useGetShippingAddress }