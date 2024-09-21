import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  // * CALLS updateSettings API
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting has been successfully updated');
      // Table will be re-render
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    // Error meesage comes from updateSettingApi
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
}
