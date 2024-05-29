import { Controller } from 'react-hook-form'
import { Pencil, SquarePen } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog'
import { Feedback } from '@ui/feedback'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@forms/select'
import { Checkbox } from '@forms/checkbox'
import { Button } from '@forms/button'
import { Input } from '@forms/input'
import { Textarea } from '@forms/textarea'
import { Label } from '@forms/label'
import { productCategories } from '@utils/constants/productCategories'
import { IProductProps } from '@utils/types/product.types'

import { useUpdateProduct } from '@services/productService/useUpdateProduct'

const UpdateProduct: React.FC<IProductProps> = ({ product }) => {
  const {
    register,
    handleSubmit,
    setFormOpen,
    formOpen,
    control,
    errors,
    isPending,
    updateProductError,
  } = useUpdateProduct(product)

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogTrigger className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible-ring disabled:cursor-not-allowed disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-primary h-10 w-full xl:max-w-10">
        <Pencil className="svg-size" />
        <span className="flex xl:hidden">Modificar</span>
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full rounded-md">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-left flex flex-row items-center gap-1.5">
            <Pencil className="svg-size" />
            Modificar - {product?.productName}
          </DialogTitle>
          <DialogDescription className="text-left text-xs sm:text-sm">
            Llena el formulario debajo para modificar este producto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-3 w-full">
          <div className="flex w-full gap-1.5 mb-5">
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="isFeatured"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="isFeatured" className="cursor-pointer">
              Destacar Producto
            </Label>
          </div>
          <div className="grid w-full gap-1.5 mb-5">
            <Label htmlFor="productName">Nombre</Label>
            <Input
              type="text"
              id="productName"
              placeholder="Nombre del Producto"
              {...register('productName')}
            />
            {errors.productName && (
              <Feedback variant="error" message={errors.productName.message} />
            )}
          </div>

          <div className="flex flex-row gap-3 mb-1.5">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="productPrice">Precio</Label>
              <Input
                type="number"
                min={0}
                id="productPrice"
                placeholder="Precio del Producto"
                {...register('productPrice', {
                  setValueAs: (v) => (v === '' ? 0 : parseFloat(v)),
                })}
              />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="stockAmount">Stock</Label>
              <Input
                type="number"
                min={0}
                id="stockAmount"
                placeholder="Cantidad/Stock"
                {...register('stockAmount', {
                  setValueAs: (v) => (v === '' ? 0 : parseInt(v, 10)),
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {errors.productPrice && (
              <Feedback variant="error" message={errors.productPrice.message} />
            )}
            {errors.stockAmount && (
              <Feedback variant="error" message={errors.stockAmount.message} />
            )}
          </div>

          <div className="flex flex-row gap-3 mb-1.5">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="productCategory">Categoria</Label>
              <Controller
                name="productCategory"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="productCategory">
                      <SelectValue placeholder="Seleccione una Categoria" />
                    </SelectTrigger>
                    <SelectContent className="max-h-56">
                      <SelectGroup>
                        {productCategories.map((category) => (
                          <SelectItem key={category.id} value={category.value}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="productBrand">
                Marca <span className="text-xs text-primary">(Opcional)</span>
              </Label>
              <Input
                type="text"
                id="productBrand"
                placeholder="Marca/Fabricante"
                {...register('productBrand')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {errors.productCategory && (
              <Feedback
                variant="error"
                message={errors.productCategory.message}
              />
            )}
            {errors.productBrand && (
              <Feedback variant="error" message={errors.productBrand.message} />
            )}
          </div>

          <div className="grid w-full gap-1.5 mb-5">
            <Label htmlFor="productDescription">Descripcion</Label>
            <Textarea
              id="productDescription"
              rows={5}
              className="resize-none"
              placeholder="Describe el producto..."
              {...register('productDescription')}
            />
            {errors.productDescription && (
              <Feedback
                variant="error"
                message={errors.productDescription.message}
              />
            )}
            {updateProductError && (
              <Feedback variant="error" message={updateProductError} />
            )}
          </div>
          <Button
            className="my-3 w-full"
            type="submit"
            isLoading={isPending}
            icon={<SquarePen className="svg-size" />}
          >
            Modificar Producto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { UpdateProduct }
