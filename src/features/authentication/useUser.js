import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../services/apiAuth'

// WILL CHECK IF THERE IS USER LOGGED IN AND RETURN USER DATA
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' }
}
