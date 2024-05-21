import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { STORES_ENDPOINT, Store } from '@utils/types/store.types'
import { useParams } from 'react-router-dom'

const useGetStore = () => {
  const { storeSlug } = useParams()

  const { isLoading, isError, data, error } = useQuery<Store, Error>({
    queryKey: [`store-${storeSlug}`],
    queryFn: () =>
      request<Store>({
        url: `${STORES_ENDPOINT}/${storeSlug}`,
        method: 'GET',
      }),
  })

  return { isLoading, isError, data, error }
}

export { useGetStore }