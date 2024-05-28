import { Link } from 'react-router-dom'
import {
  Store as StoreIcon,
  Home,
  Phone,
  SquareArrowOutUpRight,
} from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar'
import { Button } from '@forms/button'
import { formatPhoneNumber } from '@utils/stringMethods'
import { FALLBACK_IMAGE } from '@utils/constants/errorMessages'
import { IStoreProps } from '@utils/types/store.types'

const StoreCard: React.FC<IStoreProps> = ({ store }) => {
  return (
    <div className="flex flex-col justify-around gap-3 md:gap-4 p-3 border-2 rounded-md shadow-lg h-full">
      <img
        className="rounded-md object-cover aspect-video"
        src={store?.storeImageURL || FALLBACK_IMAGE}
        alt={`${store?.storeName} store photo`}
      />
      <div className="flex items-center gap-2 w-full">
        <StoreIcon className="svg-size" />
        <h3 className="text-xl font-bold">
          {store?.storeName || 'Tienda - Sin Nombre'}
        </h3>
      </div>
      <div className="flex items-center gap-2 py-1 px-2 bg-accent w-fit rounded-md">
        <Avatar className="border-2 h-6 w-6">
          <AvatarImage
            src={store?.sellerPictureURL}
            alt={`${store?.sellerFirstName}_${store?.sellerLastName}_profile_picture`}
          />
          <AvatarFallback className="font-bold text-sm">
            {store?.sellerFirstName?.charAt(0)}
            {store?.sellerLastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="font-bold text-primary">
          {store?.sellerFirstName} {store?.sellerLastName}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 py-1 px-2 border-2 rounded-md w-full">
          <Home className="h-4 w-4" />
          <span>{`${store?.storeAddress?.address}` || 'N/A'}</span>
        </div>

        <Link
          to={`tel:+57${store?.storePhoneNumber}`}
          className="transition-all duration-150 ease-in-out w-fit flex items-center gap-2 py-1 px-2 rounded-md bg-transparent active:bg-accent active:text-primary md:hover:bg-accent md:hover:text-primary"
        >
          <Phone className="h-4 w-4" />
          <span>
            +57 {`${formatPhoneNumber(store?.storePhoneNumber)}` || 'N/A'}
          </span>
        </Link>
      </div>
      <Link to={`/stores/${store?.storeSlug}`}>
        <Button
          className="w-full mb-3"
          icon={<SquareArrowOutUpRight className="svg-size" />}
        >
          Ver Tienda
        </Button>
      </Link>
    </div>
  )
}

export { StoreCard }
