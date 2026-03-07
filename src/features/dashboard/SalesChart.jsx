import styled from 'styled-components'
import { useDarkMode } from '../../context/DarkModeContext'
import DashboardBox from './DashboardBox'
import Heading from '../../ui/Heading'
import {
  AreaChart,
  CartesianGrid,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { eachDayOfInterval, subDays, format, isSameDay } from 'date-fns'

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`

// ** COMPONENT **
function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode()

  // numDays - filter params in URL

  // Creates array of dates based on "current day" to the numDays selected by user
  const allDates = eachDayOfInterval({
    // (Today minus numDays)
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  })

  // Return booking data based on the date array above
  const data = allDates.map((date) => {
    return {
      // Displays in tooltip and XAxis
      label: format(date, 'MMM dd'),
      //Booking sales for the day
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      //Booking extra sales (breakfast) for the day
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    }
  })

  // GRAPH COLORS
  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      }

  return (
    <StyledSalesChart>
      <Heading as='h2'>
        Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;
        {format(allDates.at(-1), 'MMM dd yyyy')}
      </Heading>
      <ResponsiveContainer height={300} width='100%'>
        <AreaChart data={data}>
          {/* X AXIS (DATES) */}
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }} //Label color
            tickLine={{ stroke: colors.text }} //Line marker color
          />

          {/* Y AXIS (SALES) */}
          <YAxis
            unit='$'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          {/* WINDOW WHERE LINE GRAPH DISPLAYS */}
          {/* strokeDasharray - grid stroke dash gap */}
          <CartesianGrid strokeDasharray='4' />
          {/* When mouse hovers over chart */}
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          {/* SALES LINE CHART */}
          <Area
            // key that references the object in the data (see data object above)
            dataKey='totalSales'
            type='monotone'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name='Total Sales'
            unit='$'
          />
          {/* EXTRA SALES LINE CHART - (Breakfast) */}
          <Area
            dataKey='extrasSales'
            type='monotone'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name='Extras Sales'
            unit='$'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}

export default SalesChart
