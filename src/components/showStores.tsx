import useGetAllStores from '@services/storeService/useGetAllStores'

const ShowStores = () => {
  const { isLoading, isError, data, error } = useGetAllStores()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>Bruh there's an error...({error!.message})</p>
  }

  return (
    <div>
      {data?.map((store, index) => (
        <div className="align-center-row" key={index}>
          <p>{index} - {store.storeName}</p>
          <p>{index} - {store.storeAddress.address}</p>
          <p>{index} - {store.storePhoneNumber}</p>
        </div>
      ))}
    </div>
  )
}

export { ShowStores }
