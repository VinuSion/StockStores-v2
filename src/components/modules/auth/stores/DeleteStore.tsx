import { PackageX, OctagonAlert, CircleX, Trash2 } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@ui/dialog'
import { Button } from '@forms/button'
import { IStoreProps } from '@utils/types/store.types'

import { useDeleteStore } from '@services/storeService/useDeleteStore'

const DeleteStore: React.FC<IStoreProps> = ({ store }) => {
  const { deleteStore, isPending } = useDeleteStore(store)

  return (
    <div className="w-full rounded-md border-2 border-destructive gap-3 p-3 flex flex-col h-fit shadow-lg">
      <div className="flex items-center">
        <OctagonAlert className="h-6 w-6 mr-2 text-destructive" />
        <h2 className="text-2xl text-destructive md:text-3xl font-extrabold">
          Zona De Peligro
        </h2>
      </div>
      <div className="flex flex-col">
        <p className="text-sm w-full">
          <span className="font-semibold text-destructive">Advertencia:</span>{' '}
          Eliminar la tienda es una acción irreversible. Al proceder, se
          eliminarán permanentemente tanto la tienda como todos los productos
          que contiene. Por favor, asegúrate de que deseas continuar, ya que no
          podrás recuperar esta información una vez eliminada.
        </p>
      </div>
      <Dialog>
        <DialogTrigger className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible-ring disabled:cursor-not-allowed disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/80 focus-visible:ring-destructive h-10 px-4 py-2 my-3 w-full md:w-1/3">
          <PackageX className="svg-size" />
          Eliminar Tienda
        </DialogTrigger>
        <DialogContent className="w-11/12 sm:w-full rounded-md">
          <DialogHeader className="gap-1.5">
            <DialogTitle className="text-left flex flex-row items-center gap-1.5">
              <PackageX className="svg-size" />
              ¿Estas Seguro?
            </DialogTitle>
            <DialogDescription className="text-left text-xs sm:text-sm">
              ¿Eliminar la Tienda "{store?.storeName}"? Recuerda que esta es una
              acción irreversible. Al proceder, se eliminarán permanentemente
              tanto la tienda como todos los productos que contiene.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-1">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                icon={<CircleX className="svg-size" />}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={() => deleteStore()}
              isLoading={isPending}
              icon={<Trash2 className="svg-size" />}
            >
              Eliminar {store?.storeName}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { DeleteStore }
