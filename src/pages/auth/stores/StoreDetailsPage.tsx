import { Link } from 'react-router-dom'
import { Store, Contact, Phone, Home, ShoppingBasket } from 'lucide-react'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/breadcrumb'
import { Separator } from '@ui/separator'
import { Button } from '@forms/button'
import { formatPhoneNumber } from '@utils/stringMethods'

import { useGetStore } from '@services/storeService/useGetStore'

const StoreDetailsPage: React.FC = () => {
  const { storeSlug, isLoading, isError, data, error } = useGetStore()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  return (
    <section className="flex justify-center my-5 mx-4">
      <div className="flex flex-col gap-4 w-full max-w-[50rem] my-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/stores" className="transition-colors hover:text-foreground">Tiendas</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.storeName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center py-5">
          <Store className="h-6 w-6 mr-2" />
          <h1 className="text-2xl font-extrabold">{data?.storeName}</h1>
        </div>
        <img
          className="rounded-md object-cover aspect-video outline outline-primary outline-offset-4 shadow-lg"
          src={data?.storeImageURL || ''}
          alt={`${data?.storeName} store photo`}
        />
        <div className="flex items-center gap-2 mt-5 w-fit">
          <Avatar className="border-2">
            <AvatarImage
              src={data?.sellerPictureURL}
              alt={`${data?.sellerFirstName}_${data?.sellerLastName}_profile_picture`}
            />
            <AvatarFallback className="font-bold text-sm">
              {data?.sellerFirstName?.charAt(0)}
              {data?.sellerLastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-bold text-xl">
            {data?.sellerFirstName} {data?.sellerLastName}
          </span>
        </div>
        {data?.storeDescription && (
          <div className="w-full mt-2">
            <p>{data?.storeDescription}</p>
          </div>
        )}
        <Separator className="my-5" />
        <div className="flex items-center">
          <Contact className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-extrabold">Info. de Contacto</h2>
        </div>
        <div className="flex flex-col md:items-center md:flex-row gap-2 w-full">
          <span className="text-lg font-semibold">Direccion:</span>
          <div className="flex items-center gap-2 py-1 px-2 border-2 rounded-md w-fit">
            <Home className="h-4 w-4" />
            <span className="break-words">
              {`${data?.storeAddress?.address}` || 'N/A'}
            </span>
          </div>
          <span className="flex items-center py-1 px-2 bg-accent text-primary border-2 rounded-md w-fit">
            {`${data?.storeAddress?.city}, ${data?.storeAddress?.department}` ||
              ''}
          </span>
        </div>
        <div className="flex flex-col md:items-center md:flex-row gap-2 w-full">
          <span className="text-lg font-semibold">Telefono:</span>
          <Link
            to={`tel:+57${data?.storePhoneNumber}`}
            className="transition-all duration-150 ease-in-out w-fit flex items-center gap-2 py-1 px-2 rounded-md bg-transparent active:bg-accent active:text-primary md:hover:bg-accent md:hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            <span>
              +57 {`${formatPhoneNumber(data?.storePhoneNumber!)}` || 'N/A'}
            </span>
          </Link>
        </div>
        <Link to={`/stores/${storeSlug}/products`} className="mt-2">
          <Button
            className="w-full sm:w-fit"
            icon={<ShoppingBasket className="svg-size" />}
          >
            Ver Productos
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default AuthLayout(StoreDetailsPage)
