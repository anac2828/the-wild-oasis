import { getToday } from '../utils/helpers'
import supabase from './supabase'
import { PAGE_SIZE } from '../utils/constants'

// *** GET ALL BOOKINGS *** //
// filter, sortBy, page come from tge useBookings.js custom hook
export async function getBookings({ filter, sortBy, page }) {
  // cabins(name) Selects the name from the cabins table and guests(fullName, email) selects the name and email from the guests table. "cabins(*)" selects all fields in the cabins data.
  let query = supabase.from('bookings').select(
    'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email), isPaid',
    { count: 'exact' }, // This option instructs Supabase to return only the exact row count without returning any data. We use count in pagination
  )

  //* FILTER - query[filter.method] will be for example query.gte() if there is a method if not it will be query.eq()
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value)

  //* SORT
  //.order() @params:
  //            column_name: The name of the column you want to sort by
  //            ascending: A boolean value. Set to true for ascending order and false for descending order.
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    })

  //* PAGINATION - Returns results based on current page in the URL
  // .range() It allows you to specify a starting and ending point for the results, which is useful for pagination.
  // range(0, 9)	Returns rows 0 to 10 (first 10 rows). The value of "from" needs to start at 0 because the data returned is in array form.
  // PAGE_SIZE is the number of results per page
  if (page) {
    const from = (page - 1) * PAGE_SIZE // from page 1 - 1 * 10 = 0.
    const to = from + PAGE_SIZE - 1 // 0 + 10 - 1 = 9
    query = query.range(from, to) // Will give 10 results
  }

  //* FINAL DATA
  const { data, error, count } = await query

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded.')
  }

  return { data, count }
}

// *** GET ONE BOOKING *** //
export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new Error(`Booking number #${id} could not found.`)
  }

  return data
}

//** GET BOOKS AFTER A DATE - used for the dashboard */
// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date) //7 days / 30 days / 90 days
    .lte('created_at', getToday({ end: true }))

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

// ** GET ALL CHECKED IN BOOKINGS - Based on a date
// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date) //7 days / 30 days / 90 days
    .lte('startDate', getToday())

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

// ** ACTIVIY OF THE DAY - Check in or check out guests
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    // Match only rows which satisfy at least one of the filters.
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order('created_at')

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

// *** UPDATE BOOKING *** //
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }
  return data
}

// *** DELETE BOOKING *** //
export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Booking could not be deleted')
  }
  return data
}
