import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  // Fetches cabins from supabase using react-query
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
