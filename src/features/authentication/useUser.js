import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

// WILL CHECK IS THERE IS USER LOGGED IN
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { isLoading, isAuthenticated: user?.role === 'authenticated' };
}
