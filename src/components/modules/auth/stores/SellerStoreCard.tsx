import { Link } from 'react-router-dom'
import { Store as StoreIcon, Home, Phone, Cog } from 'lucide-react'

import { Button } from '@forms/button'
import { IStoreProps } from '@utils/types/store.types'
import { formatPhoneNumber } from '@utils/stringMethods'
import { FALLBACK_IMAGE } from '@utils/constants/errorMessages'

const SellerStoreCard: React.FC<IStoreProps> = ({ store }) => {
  return (
    <div className="border-2 p-4 flex flex-col rounded-md">
      <div className="grid grid-cols-1 gap-3 lg:gap-5 lg:grid-cols-2">
        <img
          className="rounded-md object-cover aspect-video"
          src={store?.storeImageURL || FALLBACK_IMAGE}
          alt={`${store?.storeName} store photo`}
        />
        <div className="w-full flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 w-full">
              <StoreIcon className="svg-size" />
              <h3 className="text-xl font-bold text-wrap">
                {store?.storeName || 'Tienda - Sin Nombre'}
              </h3>
            </div>
            <div className="flex items-center gap-2 py-1 px-2 border-2 rounded-md w-full">
              <Home className="h-4 w-4" />
              <span>{`${store?.storeAddress?.address}` || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 py-1 px-2 border-2 rounded-md w-full">
              <Phone className="h-4 w-4" />
              <span>
                +57 {`${formatPhoneNumber(store?.storePhoneNumber)}` || 'N/A'}
              </span>
            </div>
          </div>
          <Link to={`/manage/${store?.storeSlug}`}>
            <Button className="w-full" icon={<Cog className="svg-size" />}>
              Gestionar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export { SellerStoreCard }
