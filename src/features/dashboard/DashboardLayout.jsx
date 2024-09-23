import styled from 'styled-components';
import { useRecentBookings } from '../dashboard/useRecentBookings';
import { useRecentStays } from '../dashboard/useRecentStays';
import { useCabins } from '../cabins/useCabins';
import Stats from './Stats';
import Spinner from '../../ui/Spinner';
import SalesChart from './SalesChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const { cabins } = useCabins();
  if (isLoadingBookings || isLoadingStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today&lsquo;s activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
