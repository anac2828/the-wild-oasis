import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

// * FETCHES SETTINGS FROM API
export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({ queryKey: ['settings'], queryFn: getSettings });

  return { isLoading, error, settings };
}
