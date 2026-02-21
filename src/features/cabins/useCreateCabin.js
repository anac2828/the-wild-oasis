import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

// ** USED IN THE CreateCabinForm.jsx
export function useCreateCabin() {
  // Access to state
  const queryClient = useQueryClient()

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin, //Called by createCabin function
    onSuccess: () => {
      toast.success('New cabin successfully created')
      // Table will be re-render when the data is refetched
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    // error meesage comes from createEditCabin API function
    onError: (err) => toast.error(err.message),
  })

  return { createCabin, isCreating }
}
