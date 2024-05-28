import { SquarePen } from 'lucide-react'

import { Feedback } from '@ui/feedback'
import { Button } from '@forms/button'
import { Input } from '@forms/input'
import { Textarea } from '@forms/textarea'
import { Label } from '@forms/label'
import { IStoreProps } from '@utils/types/store.types'

import { useUpdateStore } from '@services/storeService/useUpdateStore'

const UpdateStore: React.FC<IStoreProps> = ({ store }) => {
  const { register, handleSubmit, errors, isPending, updateStoreError } =
    useUpdateStore(store)

  return (
    <>
      <div className="flex items-center mb-3">
        <SquarePen className="h-6 w-6 mr-2" />
        <h2 className="text-2xl md:text-3xl font-extrabold">
          Cambiar Datos de Tienda
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid w-full gap-1.5 mb-5">
          <Label htmlFor="storeName">Nombre</Label>
          <Input
            type="text"
            id="storeName"
            placeholder="Nombre de la Tienda"
            {...register('storeName')}
          />
          {errors.storeName && (
            <Feedback variant="error" message={errors.storeName.message} />
          )}
        </div>
        <div className="grid w-full gap-1.5 mb-5">
          <Label htmlFor="storeAddress">Direccion</Label>
          <Input
            type="text"
            id="storeAddress"
            placeholder="Direccion del Negocio"
            {...register('storeAddress')}
          />
          {errors.storeAddress && (
            <Feedback variant="error" message={errors.storeAddress.message} />
          )}
        </div>
        <div className="grid w-full gap-1.5 mb-5">
          <Label htmlFor="storePhoneNumber">Telefono</Label>
          <Input
            type="text"
            id="storePhoneNumber"
            placeholder="Telefono de Contacto"
            {...register('storePhoneNumber')}
          />
          {errors.storePhoneNumber && (
            <Feedback
              variant="error"
              message={errors.storePhoneNumber.message}
            />
          )}
        </div>
        <div className="grid w-full gap-1.5 mb-5">
          <Label htmlFor="storeDescription">
            Descripcion <span className="text-xs text-primary">(Opcional)</span>
          </Label>
          <Textarea
            id="storeDescription"
            rows={5}
            className="resize-none"
            placeholder="Describe tu tienda..."
            {...register('storeDescription')}
          />
          {errors.storeDescription && (
            <Feedback
              variant="error"
              message={errors.storeDescription.message}
            />
          )}
          {updateStoreError && (
            <Feedback variant="error" message={updateStoreError} />
          )}
        </div>
        <Button
          className="my-3 w-full md:w-1/3"
          type="submit"
          isLoading={isPending}
          icon={<SquarePen className="svg-size" />}
        >
          Actualizar Tienda
        </Button>
      </form>
    </>
  )
}

export { UpdateStore }
