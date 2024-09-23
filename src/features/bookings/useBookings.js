import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // **** SERVER SIDE FILTER **** //
  // Gets filter from URL that was saved on the URL by the Filter component.
  const filterValue = searchParams.get('status');

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  //: { field: 'totalPrice', value: 5000, method: 'gte' }; This will filter for the amount in the totalPrice column

  // **** SORT **** //
  const sortByValue = searchParams.get('sortBy') || 'startDate-desc'; //Gets the value of 'sortBy'
  const [field, direction] = sortByValue.split('-');
  const sortBy = { field, direction }; // {filed: startDate, direction: desc}

  //****  PAGINATION **** //

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // * GET BOOKINGS QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page], //Add filter, sortBy, and page so that data gets refetched
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //* PRE-FETCHING - So a spinner does not show when user goes from page to page
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // If not on last page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1], //Loads the next page data before user is there
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  // If not on first page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
