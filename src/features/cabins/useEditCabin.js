import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();

  // to connect createEditCabin to react-query
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // mutationFn can only receive one artugment. Use object to combaine arguments
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
