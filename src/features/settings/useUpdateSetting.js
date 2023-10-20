import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  // to connect createEditCabin to react-query
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    // mutationFn can only receive one artugment. Use object to combaine arguments
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting has been successfully updated');
      // Table will be re-render
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    // error meesage comes from createCabin
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
}
