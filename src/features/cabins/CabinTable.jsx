import { useCabins } from './useCabins'
import { useSearchParams } from 'react-router-dom'
//
import CabinRow from './CabinRow'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import Empty from '../../ui/Empty'

// ** COMPONENT DISPLAYS IN THE /cabins page
function CabinTable() {
  // Fetches cabins from supabase using react-query
  const { isLoading, cabins } = useCabins()
  // Get state from URL
  const [searchParams] = useSearchParams()

  // Display spinner is data is loading
  if (isLoading) return <Spinner />
  // Display Empty component if there are no cabins in the database
  if (!cabins.length) return <Empty resourceName='Cabins' />

  //****** FILTER CABINS (Client side) ****** //
  // Gets the value from the URL which is set by the filter component in the CabintableOperations
  // http://localhost:5173/cabins?discount=no-discount -filterValue get return 'no-discount', 'discount'; 'all' will be the default value to avoid errors
  const filterValue = searchParams.get('discount') || 'all'
  let filteredCabins

  if (filterValue === 'all') filteredCabins = cabins // show all cabins
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0) // show cabins with no discount
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0) // show cabins with a discount

  //******  SORT (Client side) ******** //
  const sortBy = searchParams.get('sortBy') || 'startDate-asc'
  // Distructure array returned by .split() ['startDate', 'asc']
  const [field, direction] = sortBy.split('-')

  // Use modifier to sort by asc (1) or desc (-1)
  const modifier = direction === 'asc' ? 1 : -1
  // a and b is a cabin object
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  )

  return (
    // Table needs to be wrapped in menus component to keep track of which modal window will be opened.
    // Menus provides the context value to its children
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
          // Will map through the data in the Table.jsx and render a row
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  )
}

export default CabinTable
