import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@hooks/useToast'
import { request } from '@utils/RequestGenerator'
import { STORES_ENDPOINT, Store } from '@utils/types/store.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'

const useDeleteStore = (store: Store) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { mutate: deleteStore, isPending } = useMutation({
    mutationFn: () => {
      return request<Store>({
        url: `${STORES_ENDPOINT}/delete/${store._id}`,
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`seller-stores-${store?.sellerId}`],
      })
      navigate("/dashboard")
      toast({
        title: '😔 Tienda Eliminada',
        description: 'La tienda y todos sus productos han sido eliminados exitosamente.',
      })
    },
    onError: (error) =>
      toast({
        title: `❌ Error al Eliminar "${store?.storeName}"`,
        description: `Error: ${error?.message || API_ERROR_DEFAULT_MESSAGE}`,
      })
  })

  return {
    deleteStore,
    isPending
  }
}

export { useDeleteStore }