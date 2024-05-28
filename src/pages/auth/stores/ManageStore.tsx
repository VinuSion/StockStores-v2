import { Link } from 'react-router-dom'
import { Home, Phone, PackageOpen } from 'lucide-react'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/breadcrumb'
import { Badge } from '@ui/badge'
import { Separator } from '@ui/separator'
import { Button } from '@forms/button'
import { UpdateStore } from '@modules/auth/stores/UpdateStore'
import { DeleteStore } from '@modules/auth/stores/DeleteStore'

import { formatPhoneNumber } from '@utils/stringMethods'
import { FALLBACK_IMAGE } from '@utils/constants/errorMessages'

import { useGetStore } from '@services/storeService/useGetStore'

const ManageStore: React.FC = () => {
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
              <Link
                to="/dashboard"
                className="transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Gestionar - {data?.storeName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-wrap items-center gap-2 w-full pb-3">
          <h1 className="text-2xl md:text-3xl font-bold">
            Gestionar - {data?.storeName}
          </h1>
        </div>
        <div className="w-full">
          <img
            className="rounded-md object-cover aspect-video outline outline-primary outline-offset-4 shadow-lg mb-3"
            src={data?.storeImageURL || FALLBACK_IMAGE}
            alt={`${data?.storeName} product photo`}
          />
        </div>
        <div className="w-full rounded-md border-2 p-3 flex flex-col gap-3 h-fit shadow-lg">
          <div className="w-full flex bg-accent rounded-md p-4">
            <p className="flex items-center gap-2 w-full text-xl lg:text-2xl">
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
              <span className="font-semibold">{data?.sellerFirstName}</span>
              <span className="font-semibold">{data?.sellerLastName}</span>
              <span className="text-lg lg:text-xl text-primary font-semibold">
                (Tu)
              </span>
            </p>
          </div>
          {data?.storeDescription && (
            <div className="flex w-full my-3">
              <p>{data?.storeDescription}</p>
            </div>
          )}
          <div className="flex flex-row flex-wrap items-center gap-2">
            <span className="font-semibold">Direccion:</span>
            <Badge
              className="py-2"
              variant="outline"
              icon={<Home className="h-4 w-4 mr-1" />}
            >
              {data?.storeAddress?.address}
            </Badge>
            <Badge className="py-2">
              {data?.storeAddress?.city}, {data?.storeAddress?.department}
            </Badge>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold">Telefono:</span>
            <Badge
              className="py-2"
              variant="outline"
              icon={<Phone className="h-4 w-4 mr-1" />}
            >
              <span>
                +57 {`${formatPhoneNumber(data?.storePhoneNumber!)}` || 'N/A'}
              </span>
            </Badge>
          </div>
          <Separator className="my-2" />
          <Link to={`/manage/${storeSlug}/products`}>
            <Button
              className="w-full sm:w-1/3"
              icon={<PackageOpen className="svg-size" />}
            >
              Gestionar Productos
            </Button>
          </Link>
        </div>
        <Separator className="my-2" />
        <UpdateStore store={data!} />
        <Separator className="my-2" />
        <DeleteStore store={data!} />
      </div>
    </section>
  )
}

export default AuthLayout(ManageStore)
