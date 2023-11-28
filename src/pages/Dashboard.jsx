import DashboardLayout from '../features/dashboard/DashboardLayout';
import DashboardFilter from '../features/dashboard/DashboardFilter';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Spinner from '../ui/Spinner';
import { useRecentBookings } from '../features/dashboard/useRecentBookings';
import { useRecentStays } from '../features/dashboard/useRecentStays';

function Dashboard() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoadingStays } = useRecentStays();

  if ((isLoadingBookings, isLoadingStays)) return <Spinner />;

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
