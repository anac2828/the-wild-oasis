import { useQueryClient, useMutation } from '@tanstack/react-query';

import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useCheckout() {
  const queryClient = useQueryClient();

  //Mutate (checkin) is the mutationFn that will receive the bookinId
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: 'checked-out' }),

    //   Data comes from the updateBooking function
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking #${data.id} successfully checked out`);
      // use queryClient so updated data will be re-fetched
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error('There was an error while checking out'),
  });

  return { checkout, isCheckingOut };
}

export default useCheckout;
