import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useDeleteCabin() {
  // Access to the state
  const queryClient = useQueryClient()

  // useMutation - updates and deletes data. Mutate calls the mutationFn function
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi, //deletes cabin from supabase
    onSuccess: () => {
      toast.success('Cabin successfully deleted.')
      // Invalidates the cabin data so that when a cabin is deleted the data is imidately fetched again.
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (error) => toast.error(error.message), //error coming from the deleteCabinApi
  })

  return { isDeleting, deleteCabin }
}
