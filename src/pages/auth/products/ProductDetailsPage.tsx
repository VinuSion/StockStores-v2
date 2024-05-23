import { Link } from 'react-router-dom'
import { BookMarked, ShoppingCart } from 'lucide-react'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/breadcrumb'
import { Badge } from '@ui/badge'
import { Separator } from '@ui/separator'
import { Rating } from '@ui/rating'
import { Button } from '@forms/button'

import { formatPrice } from '@utils/numberMethods'

import { useGetProduct } from '@services/productService/useGetProduct'

const ProductDetailsPage: React.FC = () => {
  const { isLoading, isError, data, error } = useGetProduct()

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
                to="/stores"
                className="transition-colors hover:text-foreground"
              >
                Tiendas
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                to={`/stores/${data?.storeSlug}`}
                className="transition-colors hover:text-foreground"
              >
                {data?.storeName}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                to={`/stores/${data?.storeSlug}/products`}
                className="transition-colors hover:text-foreground"
              >
                Productos
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.product?.productName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full px-4 md:px-8">
        <div className="flex flex-wrap items-center gap-2 w-full pb-3">
          <h1 className="text-2xl md:text-3xl font-bold">{data?.product?.productName}</h1>
          {data?.product?.isFeatured && <Badge>Destacado</Badge>}
        </div>
        <div className="my-3 flex flex-col gap-4 xl:my-5 xl:flex-row xl:gap-8">
          <div className="w-full xl:w-3/5">
            <img
              className="rounded-md object-cover aspect-video outline outline-primary outline-offset-4 shadow-lg"
              src={
                data?.product?.leadImageURL ||
                'https://github.com/VinuSion/StockStores-v2/assets/56313573/2b33a407-9214-4847-a75b-4e70808c6bae'
              }
              alt={`${data?.product?.productName} product photo`}
            />
          </div>
          <div className="w-full xl:w-2/5 rounded-md border-2 p-3 flex flex-col gap-5 h-fit">
            <div className="w-full flex justify-between bg-accent rounded-md p-4">
              <p className="w-full font-bold text-2xl">
                ${formatPrice(data?.product?.productPrice || 0)}
                <span className="font-normal text-sm mx-1">COP</span>
              </p>
              <Badge
                variant={
                  data?.product?.stockAmount || 0 > 0
                    ? 'default'
                    : 'destructive'
                }
              >
                {data?.product?.stockAmount || 0 > 0 ? 'Disponible' : 'Agotado'}
              </Badge>
            </div>
            <div className="flex gap-3 justify-between flex-col xl:flex-row">
              <div className="flex flex-wrap items-center gap-2 w-full">
                <Rating averageRating={data?.product?.averageRating || 0} />
                <span>{data?.product?.reviewsAmount || 0} reseñas</span>
              </div>
              {data?.product?.productBrand && (
                <div className="flex flex-row items-center xl:justify-end gap-2 w-full">
                  <span className="font-semibold">Marca:</span>
                  <Badge className="py-2" variant="secondary">
                    {data?.product?.productBrand}
                  </Badge>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="font-semibold">Categoria:</span>
              <Badge
                className="py-2"
                variant="outline"
                icon={<BookMarked className="h-4 w-4 mr-1" />}
              >
                {data?.product?.productCategory}
              </Badge>
            </div>
            <Separator className="my-2" />
            <div className="flex flex-col gap-1 w-full">
              <span className="font-semibold">Descripcion:</span>
              <p className="">{data?.product?.productDescription || 'N/A'}</p>
            </div>
            <Separator className="my-2" />
            <Button
              className="w-full mb-3"
              icon={<ShoppingCart className="svg-size" />}
            >
              Agregar Al Carrito
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthLayout(ProductDetailsPage)
