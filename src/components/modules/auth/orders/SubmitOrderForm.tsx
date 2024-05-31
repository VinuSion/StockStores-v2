import { Controller } from 'react-hook-form'
import { DollarSign, Receipt } from 'lucide-react'

import { Feedback } from '@ui/feedback'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@forms/select'
import { Button } from '@forms/button'
import { IStoreProps } from '@utils/types/store.types'

import { useCreateOrder } from '@services/orderService/useCreateOrder'

const SubmitOrderForm: React.FC<IStoreProps> = ({ store }) => {
  const { handleSubmit, control, errors, isPending, createOrderError } = useCreateOrder(store)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <DollarSign className="svg-size" />
        <h4 className="text-lg font-bold w-max">Metodo de Pago</h4>
      </div>
      <form onSubmit={handleSubmit} className="mt-1 w-full">
        <div className="grid w-full gap-1.5">
          <Controller
            name="paymentMethod"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Seleccione un Metodo de Pago" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectItem value="Nequi">Nequi</SelectItem>
                    <SelectItem value="Bancolombia">Bancolombia</SelectItem>
                    <SelectItem value="Efectivo">Efectivo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.paymentMethod && (
            <Feedback variant="error" message={errors.paymentMethod.message} />
          )}
          {createOrderError && (
            <Feedback variant="error" message={createOrderError} />
          )}
        </div>
        <Button
          className="my-5 w-full sm:w-fit"
          type="submit"
          isLoading={isPending}
          icon={<Receipt className="svg-size" />}
        >
          Crear Pedido
        </Button>
      </form>
    </div>
  )
}

export { SubmitOrderForm }
