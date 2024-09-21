import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();

  //* CALLS THE EDIT CABIT API FUNCTION
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // MutationFn can only receive one artugment. Use destructure to extract more than one argument.
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin has been successfully edited');
      // Table will be re-render
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    // error meesage comes from createCabin
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
