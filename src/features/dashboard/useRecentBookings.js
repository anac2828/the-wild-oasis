import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBookingsAfterDate } from '../../services/apiBookings'

export function useRecentBookings() {
  // Gets the number of days to filter by from the URL - http://localhost:5173/dashboard?last=7
  const [searchParams] = useSearchParams()
  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))

  //Subtract numDays from the current day to give you the date in the past based on the numDays filter
  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    // Has two bookings keys because the 'bookings' key is being used when user goes to "Bookings" side bar tab. New data will be fetched if the numDays changes.
    queryKey: ['bookings', `last-${numDays}`],
  })

  return { isLoading, bookings }
}
