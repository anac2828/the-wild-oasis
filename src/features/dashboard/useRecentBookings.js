import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  // Gets the number of days from the URL
  const [searchParams] = useSearchParams();
  // "!" indecates that if searchParams is null.
  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  //will subtract the dates and into an ISO date
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    // Has two bookings keys because the 'bookings' key is being used when user goes to "Bookings" side bar tab. New data will be fetched if the numDays changes.
    queryKey: ['bookings', `last-${numDays}`],
  });

  return { isLoading, bookings };
}
