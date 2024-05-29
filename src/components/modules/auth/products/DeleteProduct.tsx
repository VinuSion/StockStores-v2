import { CircleX, Trash2 } from 'lucide-react'

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
import { IProductProps } from '@utils/types/product.types'

import { useDeleteProduct } from '@services/productService/useDeleteProduct'

const DeleteProduct: React.FC<IProductProps> = ({ product }) => {
  const { deleteProduct, isPending } = useDeleteProduct(product)

  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible-ring disabled:cursor-not-allowed disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/80 focus-visible:ring-destructive h-10 w-full xl:max-w-10">
        <Trash2 className="svg-size" />
        <span className="flex xl:hidden">Eliminar</span>
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full rounded-md">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-left flex flex-row items-center gap-1.5">
            <Trash2 className="svg-size" />
            ¿Eliminar {product?.productName}?
          </DialogTitle>
          <DialogDescription className="text-left text-xs sm:text-sm">
            Esta es una acción irreversible. Al continuar, este producto será
            eliminado de tu tienda.
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
            onClick={() => deleteProduct()}
            isLoading={isPending}
            icon={<Trash2 className="svg-size" />}
          >
            Eliminar Producto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteProduct }
