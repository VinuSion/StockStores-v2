import { useGetSellerStores } from '@services/storeService/useGetSellerStores'
import { SellerStoresProps } from '@utils/types/user.types'
import { SellerStoreCard } from '@modules/auth/stores/SellerStoreCard'

const SellerStores: React.FC<SellerStoresProps> = ({ sellerId }) => {
  const { isLoading, isError, data, error } = useGetSellerStores(sellerId)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  return (
    <>
      {data?.map((store, index) => (
        <SellerStoreCard key={index} store={store} />
      ))}
    </>
  )
}

export { SellerStores }
