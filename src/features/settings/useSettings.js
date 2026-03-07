import { useQuery } from '@tanstack/react-query'
import { getSettings } from '../../services/apiSettings'

// * FETCHES SETTINGS FROM API - There are no data mutations needed here, so we don't use the useMutation hook.
export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({ queryKey: ['settings'], queryFn: getSettings })

  return { isLoading, error, settings }
}
