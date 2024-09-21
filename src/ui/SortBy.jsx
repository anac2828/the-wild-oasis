import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || ''; //If page is realoaded it will have the sortBy value or ""

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams); //saves state to URL so that CabinTable has access to it.
  }

  // Type prop is for styling
  return (
    <Select
      value={sortBy}
      options={options}
      type='white'
      onChange={handleChange}
    />
  );
}

export default SortBy;
