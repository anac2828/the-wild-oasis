import styled from 'styled-components'
import { useRecentBookings } from '../dashboard/useRecentBookings'
import { useRecentStays } from '../dashboard/useRecentStays'
import { useCabins } from '../cabins/useCabins'
import Stats from './Stats'
import Spinner from '../../ui/Spinner'
import SalesChart from './SalesChart'
import DurationChart from './DurationChart'
import TodayActivity from '../check-in-out/TodayActivity'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

function DashboardLayout() {
  // Recent bookings
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings()
  // Bookings with a check-in or check-out status (actual stays and not just a booking)
  const {
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays()
  const { cabins, isLoading: isLoadingCabins } = useCabins()

  // LOADING SPINNDER
  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />

  return (
    <StyledDashboardLayout>
      {/* CARDS WITH INFO FOR EACH OF THE ITEMS BELOW */}
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      {/* ACTIVITY FOR THE DAY - Check in or check out guest */}
      <TodayActivity />
      {/* PIE CHART - BOOKING LENGTH BY DAYS */}
      <DurationChart confirmedStays={confirmedStays} />
      {/* LINE GRAPH - TOTAL PROFIT FROM BOOKINGS */}
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
