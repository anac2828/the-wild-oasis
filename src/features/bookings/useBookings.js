import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export function useBookings() {
  // Use for pre-fetching data
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  // We filter the data here rather than the apiBookings() to be able to use the useSearchParams() hook.

  // **** SERVER SIDE FILTER **** //
  // Get filter from URL saved by the Filter component. http://localhost:5173/bookings?status=checked-out
  const filterValue = searchParams.get('status')

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue }
  //: { field: 'totalPrice', value: 5000, method: 'gte' }; add the method field to return bookings greater than 5000

  // **** SORT **** //
  // http://localhost:5173/bookings?sortBy=startDate-asc
  const sortByQuery = searchParams.get('sortBy') || 'startDate-desc' //Gets the value of 'sortBy'
  const [field, direction] = sortByQuery.split('-') // ["startDate", "asc"]
  const sortBy = { field, direction } // {filed: startDate, direction: asc}

  //****  PAGINATION **** //
  // If there is no page query in the URL than page will be 1. Page value is need to fetch data
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  // * GET BOOKINGS DATA FROM API
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    //Add filter, sortBy, and page so that data gets refetched when user clicks a different option
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  })

  //* PRE-FETCHING - So a spinner does not show when user goes from page to page
  const pageCount = Math.ceil(count / PAGE_SIZE) //number of pages

  // If not on last page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1], //page + 1 loads the next page data before user is there
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })

  // If not on first page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })

  return { isLoading, error, bookings, count }
}
