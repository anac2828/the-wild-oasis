import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

// ** CALLS CREATE API FUNCTION
export function useCreateCabin() {
  // Access to state
  const queryClient = useQueryClient();

  // to connect createEditCabin to react-query
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      // Table will be re-render
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    // error meesage comes from createCabin
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
