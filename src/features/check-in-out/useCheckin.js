import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //mutate (checkin) is the mutationFn that will receive the bookinId
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    // CAN ONLY RECEIVE ONE ARGUMENT
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, { status: 'checked-in', isPaid: true, ...breakfast }),

    //   data comes from the updateBooking function
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      // use queryClient so updated data will be re-fetched
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: () => toast.error('There was an error while checking in'),
  });

  return { checkin, isCheckingIn };
}

export default useCheckin;
