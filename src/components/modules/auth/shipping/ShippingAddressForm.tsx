import { MailPlus } from 'lucide-react'

import { Feedback } from '@ui/feedback'
import { Button } from '@forms/button'
import { Input } from '@forms/input'
import { Label } from '@forms/label'

import { useGetShippingAddress } from '@services/shippingService/useGetShippingAddress'
import { useAddShippingAddress } from '@services/shippingService/useAddShippingAddress'

const ShippingAddressForm: React.FC = () => {
  const { isLoading, isError, data, error } = useGetShippingAddress()
  const { register, handleSubmit, errors, isPending, addShippingAddressError } =
    useAddShippingAddress()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  if (data && data?.length === 0) {
    return (
      <div className="flex flex-col px-4">
        <div className="flex gap-2 items-center rounded-md my-3">
          <MailPlus className="svg-size" />
          <h3 className="text-md font-bold w-max">Crear Direccion de Envio</h3>
        </div>
        <span className="text-muted-foreground text-sm mb-3">
          Aun no tienes direccion de envio. Puedes crearlo con el formulario
          debajo.
        </span>
        <form onSubmit={handleSubmit} className="mt-3 w-full">
          <div className="grid w-full gap-1.5 mb-5">
            <Label htmlFor="address">Direccion de Residencia</Label>
            <Input
              type="text"
              id="address"
              placeholder="Direccion de tu Hogar"
              {...register('address')}
            />
            {errors.address && (
              <Feedback variant="error" message={errors.address.message} />
            )}
          </div>
          <div className="grid w-full gap-1.5 mb-5">
            <Label htmlFor="contactPhoneNumber">Telefono</Label>
            <Input
              type="text"
              id="contactPhoneNumber"
              placeholder="Telefono de Contacto"
              {...register('contactPhoneNumber')}
            />
            {errors.contactPhoneNumber && (
              <Feedback
                variant="error"
                message={errors.contactPhoneNumber.message}
              />
            )}
            {addShippingAddressError && (
              <Feedback variant="error" message={addShippingAddressError} />
            )}
          </div>
          <Button
            className="my-3 w-full"
            type="submit"
            isLoading={isPending}
            icon={<MailPlus className="svg-size" />}
          >
            Agregar Direccion
          </Button>
        </form>
      </div>
    )
  }
}

export { ShippingAddressForm }
