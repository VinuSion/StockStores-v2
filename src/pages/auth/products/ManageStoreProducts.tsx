import { Link } from 'react-router-dom'
import { PackageOpen } from 'lucide-react'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { CreateProduct } from '@modules/auth/products/CreateProduct'
import { ProductManagementCard } from '@modules/auth/products/ProductManagementCard'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/breadcrumb'

import { useGetAllStoreProducts } from '@services/productService/useGetAllStoreProducts'

const ManageStoreProducts: React.FC = () => {
  const { storeSlug, isLoading, isError, data, error } =
    useGetAllStoreProducts()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  return (
    <section className="my-5">
      <div className="flex flex-col gap-5 px-4 md:px-8 py-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link
                to="/dashboard"
                className="transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                to={`/manage/${storeSlug}`}
                className="transition-colors hover:text-foreground"
              >
                Gestionar - {data?.storeName}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Productos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="flex gap-2 items-center text-2xl md:text-3xl font-extrabold">
          <PackageOpen />
          Productos - {data?.storeName}
        </h1>
      </div>
      <CreateProduct />
      <div className="align-center-row grid grid-cols-1 xl:grid-cols-2 gap-5 w-full px-4 md:px-8">
        <>
          {data?.allProductsFromStore?.length === 0 ? (
            <div className="flex w-full">
              <p className="font-semibold text-lg text-primary">
                Esta tienda no tiene productos todavía.
              </p>
            </div>
          ) : (
            data?.allProductsFromStore?.map((product, index) => (
              <ProductManagementCard key={index} product={product} />
            ))
          )}
        </>
      </div>
    </section>
  )
}

export default AuthLayout(ManageStoreProducts)
