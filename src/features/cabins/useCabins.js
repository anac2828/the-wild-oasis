import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'

export function useCabins() {
  // Fetches cabins from supabase using react-query
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // Data will be saved in the cache with queryKey name 'cabins' to have access to the data without fechting it from the API again.
    queryKey: ['cabins'],
    queryFn: getCabins, //API Fuction that fetches data from supabase
  })

  return { isLoading, cabins, error }
}
