import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateCurrentUser } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    // user is returned from the updateCurrentUser api function
    onSuccess: ({ user }) => {
      toast.success('User account successfully updated.')
      //Update cache with the updated user data so that avatar and name in the header component display updated user info
      queryClient.setQueryData(['user'], user)
    },
    onError: (err) => toast.error(err.message),
  })

  return { updateUser, isUpdating }
}
