import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@hooks/useToast'
import { request } from '@utils/RequestGenerator'
import { PRODUCTS_ENDPOINT, Product } from '@utils/types/product.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'

const useDeleteProduct = (product: Product) => {
  const { storeSlug } = useParams<{ storeSlug: string }>()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { mutate: deleteProduct, isPending } = useMutation({
    mutationFn: () => {
      return request<Product>({
        url: `${PRODUCTS_ENDPOINT}/delete/${product._id}`,
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`all-products-from-store-${storeSlug}`],
      })
      toast({
        title: '🔴 Producto Eliminado',
        description: `El Producto "${product?.productName}" ha sido eliminado exitosamente.`,
      })
    },
    onError: (error) =>
      toast({
        title: `❌ Error al Eliminar "${product?.productName}"`,
        description: `Error: ${error?.message || API_ERROR_DEFAULT_MESSAGE}`,
      })
  })

  return {
    deleteProduct,
    isPending
  }
}

export { useDeleteProduct }