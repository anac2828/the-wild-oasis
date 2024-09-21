import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
  // Access to the state "query"
  const queryClient = useQueryClient();

  // useMutation returns isLoading and the mutate function, which will call the deleteCabinAPI function. The cabinId will be passed on where the function is used.
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully deleted.');
      // will re-render cabinTable when a cabin is deleted
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
}
