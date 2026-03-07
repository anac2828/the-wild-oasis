import { useMutation } from '@tanstack/react-query'
import { resetPassword as resetPassworApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useResetPass() {
  const { mutate: resetPass, isLoading } = useMutation({
    mutationFn: resetPassworApi,
    onSuccess: () => {
      toast.success('Please check your e-mail for a reset link.')
    },
  })
  return { resetPass, isLoading }
}
