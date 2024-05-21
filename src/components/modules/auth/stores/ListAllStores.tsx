import { StoreCard } from '@modules/auth/stores/StoreCard'
import { useGetAllStores } from '@services/storeService/useGetAllStores'

const ListAllStores: React.FC = () => {
  const { isLoading, isError, data, error } = useGetAllStores()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  return (
    <>
      {data?.map((store, index) => (
        <StoreCard key={index} store={store} />
      ))}
    </>
  )
}

export { ListAllStores }
