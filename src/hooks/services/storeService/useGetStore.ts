import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { STORES_ENDPOINT, Store } from '@utils/types/store.types'

const useGetStore = () => {
  const { storeSlug } = useParams<{ storeSlug: string }>()

  const { isLoading, isError, data, error } = useQuery<Store, Error>({
    queryKey: [`store-${storeSlug}`],
    queryFn: () =>
      request<Store>({
        url: `${STORES_ENDPOINT}/${storeSlug}`,
        method: 'GET',
      }),
  })

  return { storeSlug, isLoading, isError, data, error }
}

export { useGetStore }