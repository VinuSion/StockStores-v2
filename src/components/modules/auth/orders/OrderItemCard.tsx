import { X } from 'lucide-react'

import { FALLBACK_IMAGE } from '@utils/constants/errorMessages'
import { formatPrice } from '@utils/numberMethods'
import { IOrderItemProps } from '@utils/types/order.types'

const OrderItemCard: React.FC<IOrderItemProps> = ({ orderItem }) => {
  return (
    <div className="flex justify-between p-2 gap-3 rounded-md border-2 border-accent shadow-lg">
      <div className="flex gap-3">
        <img
          className="flex aspect-square object-cover h-fit max-h-20 rounded-md p-1 border-2 border-primary"
          src={`${orderItem?.productLeadImage || FALLBACK_IMAGE}`}
          alt={`${orderItem?.productName} photo`}
        />
      </div>
      <div className="flex justify-between gap-1 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <span className="flex text-md font-semibold">
              {orderItem?.productName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p>
              ${formatPrice(orderItem?.productPrice || 0)}
              <span className="text-primary font-normal text-xs mx-1">COP</span>
            </p>
            <div className="flex items-center gap-3 text-primary">
              <X className="h-4 w-4" />
              <p className="flex justify-center items-center font-bold bg-accent rounded-sm p-1 text-md h-5 w-8">
                {orderItem?.quantity}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center h-full">
          <p className="flex items-center gap-2 p-2 h-fit border-2 border-primary rounded-md bg-primary dark:bg-accent text-white font-bold text-md w-full">
            ${formatPrice(orderItem?.itemPrice || 0)}
            <span className="font-normal text-xs mx-1">COP</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export { OrderItemCard }
