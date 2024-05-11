import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { BASE_STORES_ENDPOINT, StoreData } from '@utils/types/store.types'


const useGetAllStores = () => {
  const { isLoading, isError, data, error } = useQuery<StoreData[], Error>({
    queryKey: ['all-stores'],
    queryFn: () =>
      request<StoreData[]>({
        url: `${BASE_STORES_ENDPOINT}`,
        method: 'GET',
      }),
  });

  return { isLoading, isError, data, error };
};

export default useGetAllStores;