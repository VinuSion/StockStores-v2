import { useLocation } from 'react-router-dom'
import { ProductCard } from '@modules/auth/products/ProductCard'
import { useGetAllStoreProducts } from '@services/productService/useGetAllStoreProducts'

const ListAllStoreProducts: React.FC = () => {
  const location = useLocation();
  const { isLoading, isError, data, error } = useGetAllStoreProducts()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  return (
    <>
      {data?.allProductsFromStore?.map((product, index) => (
        <ProductCard key={index} product={product} pathname={location.pathname} />
      ))}
    </>
  )
}

export { ListAllStoreProducts }
