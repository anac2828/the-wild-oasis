import { useCabins } from './useCabins';
import { useSearchParams } from 'react-router-dom';
//
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';

function CabinTable() {
  // Fetches cabins from supabase using react-query
  const { isLoading, cabins } = useCabins();
  // Get state from URL
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName='Cabins' />;

  //****** FILTER CABINS ****** //
  // Gets the value from the URL which is store by the filter component in the CabintableOperations
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins; // show all cabins
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0); // show cabins with no discount
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0); // show cabins with a discount

  //******  SORT ******** //
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  // renames the array fields retured by split()
  const [field, direction] = sortBy.split('-');

  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    // Table needs to be wrapped in menus component to keep track of which modal window will be opened.
    <Menus>
      <Table $columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {/* makes Table.Body component cleaner  */}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
