import styled from 'styled-components';
//
import { useCabins } from './useCabins';
//
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';

function CabinTable() {
  // fetches cabins from supabase using react-query
  const { isLoading, error, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
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
        data={cabins}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}

export default CabinTable;
