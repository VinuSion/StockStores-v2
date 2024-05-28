import { PackagePlus } from 'lucide-react'

import { SVGLogo } from '@ui/svg-logo'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog'
import { Feedback } from '@ui/feedback'
import { Separator } from '@ui/separator'
import { Button } from '@forms/button'
import { Input } from '@forms/input'
import { Textarea } from '@forms/textarea'
import { Label } from '@forms/label'

import { useCreateStore } from '@services/storeService/useCreateStore'

const CreateStore: React.FC = () => {
  const { register, handleSubmit, setFormOpen, formOpen, errors, isPending, createStoreError } = useCreateStore()

  return (
    <div className="my-5 flex flex-col gap-5 w-full px-4 md:px-8">
      <Separator className="my-3 px-4 md:px-8" />
      <p className="text-xs md:text-sm text-muted-foreground max-w-[50rem]">
        En StockStores, tienes la posibilidad de crear tantas tiendas como
        desees. Si es tu primera vez como vendedor, crea tu primera tienda;
        nosotros te acompañaremos en todo el proceso para asegurarnos de que
        tengas una experiencia exitosa!
      </p>
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogTrigger className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible-ring disabled:cursor-not-allowed disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-4 py-2 w-full md:w-fit">
          <SVGLogo className="svg-size" />
          Nueva Tienda
        </DialogTrigger>
        <DialogContent className="w-11/12 sm:w-full rounded-md">
          <DialogHeader className="gap-1.5">
            <DialogTitle className="text-left flex flex-row items-center gap-1.5">
              <SVGLogo className="svg-size" />
              Nueva Tienda
            </DialogTitle>
            <DialogDescription className="text-left text-xs sm:text-sm">
              Llena el formulario debajo para crear una nueva tienda. Si es tu
              primera vez, te guiaremos paso a paso después de la creación.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-3 w-full">
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
                <Feedback
                  variant="error"
                  message={errors.storeAddress.message}
                />
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
                Descripcion{' '}
                <span className="text-xs text-primary">(Opcional)</span>
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
              {createStoreError && (
                <Feedback variant="error" message={createStoreError} />
              )}
            </div>
            <Button
              className="my-3 w-full"
              type="submit"
              isLoading={isPending}
              icon={<PackagePlus className="svg-size" />}
            >
              Crear Tienda
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { CreateStore }
