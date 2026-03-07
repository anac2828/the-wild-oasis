import DashboardLayout from '../features/dashboard/DashboardLayout'
import DashboardFilter from '../features/dashboard/DashboardFilter'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Dashboard() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Dashboard</Heading>
        {/* By 7 days - 30 days - 90 days */}
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  )
}

export default Dashboard
