import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'

function useCheckin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  //checkin function used in CheckinBooking.jsx
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    // Use an object to pass in multiple args // updateBooking() API function
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    //   Data returned from the updateBooking function
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`)
      // Use queryClient so updated data will be re-fetched 'active: true' can be used instead of the the query key 'bookings'
      queryClient.invalidateQueries({ active: true })
      navigate('/')
    },

    onError: () => toast.error('There was an error while checking in'),
  })

  return { checkin, isCheckingIn }
}

export default useCheckin
