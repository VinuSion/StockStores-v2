import { Pencil, Trash2, Layers, Shapes } from 'lucide-react'

import { Badge } from '@ui/badge'
import { Button } from '@forms/button'

import { IProductProps } from '@utils/types/product.types'
import { formatPrice } from '@utils/numberMethods'
import { FALLBACK_IMAGE } from '@utils/constants/errorMessages'

const ProductManagementCard: React.FC<IProductProps> = ({ product }) => {
  return (
    <div className="flex flex-col xl:flex-row justify-between gap-2 xl:gap-3 p-3 border-2 rounded-md shadow-lg h-full">
      <img
        className="rounded-md object-cover aspect-video w-full xl:w-1/3"
        src={product?.leadImageURL || FALLBACK_IMAGE}
        alt={`${product?.productName} product photo`}
      />
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full">
          <h3 className="text-xl font-bold">
            {product?.productName || 'Producto - Sin Nombre'}
          </h3>
          {product?.isFeatured && <Badge>Destacado</Badge>}
        </div>
        <div className="flex flex-wrap gap-2">
          <p className="text-xl font-bold bg-accent px-3 py-1 w-fit rounded-md">
            ${formatPrice(product?.productPrice)}
            <span className="font-normal text-sm mx-1">COP</span>
          </p>
          <span className="flex items-center rounded-md font-semibold text-lg px-4 bg-primary text-white">
            <Layers className="svg-size mr-1" />
            {product?.stockAmount}
          </span>
        </div>
        <div className="flex">
          <p className="text-sm">{product?.productDescription}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge icon={<Shapes className="h-4 w-4 mr-1"/>}>{product?.productCategory}</Badge>
          {product?.productBrand && (
            <Badge variant="outline">{product?.productBrand}</Badge>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-3 mb-3 w-full xl:mt-0 xl:w-1/3">
        <Button
          variant="outline"
          size="icon"
          icon={<Pencil className="svg-size" />}
          className="w-full"
        />
        <Button
          variant="destructive"
          size="icon"
          icon={<Trash2 className="svg-size" />}
          className="w-full"
        />
      </div>
    </div>
  )
}

export { ProductManagementCard }
