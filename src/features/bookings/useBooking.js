import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
  const { bookingId } = useParams(); //Get the id from the URL when a user navigates to a booking details page

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    // bookingId is needed so when the user goes to the checkin page the data will be re-fetched.
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    // React Query will not try to re-fetch data if it does not exist
    retry: false,
  });

  return { isLoading, booking, error };
}
