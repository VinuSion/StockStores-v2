import { Link } from 'react-router-dom'
import { ShoppingBasket } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/breadcrumb'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { ListAllStoreProducts } from '@modules/auth/products/ListAllStoreProducts'

import { useGetAllStoreProducts } from '@services/productService/useGetAllStoreProducts'

const StoreProducts: React.FC = () => {
  const { storeSlug, isLoading, isError, data, error } = useGetAllStoreProducts()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  return (
    <section className="my-5">
      <div className="flex flex-col gap-5 px-4 md:px-8 py-5 mb-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link
                to="/stores"
                className="transition-colors hover:text-foreground"
              >
                Tiendas
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                to={`/stores/${storeSlug}`}
                className="transition-colors hover:text-foreground"
              >
                {data?.storeName}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Productos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="flex gap-2 items-center text-2xl md:text-3xl font-extrabold">
          <ShoppingBasket />
          Productos - {data?.storeName}
        </h1>
      </div>
      <div className="align-center-row grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 md:gap-10 w-full px-4 md:px-8">
        <ListAllStoreProducts />
      </div>
    </section>
  )
}

export default AuthLayout(StoreProducts)
