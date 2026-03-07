import { useSearchParams } from 'react-router-dom'
import Select from './Select'

// ** COMPONENT **
// Component used in CabinTableOperations.jsx
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams()
  //sortBy will return the value (name-asc) of 'sortBy'. If page is realoaded it will have the sortBy value or ""
  const sortByValue = searchParams.get('sortBy') || ''

  function handleChange(e) {
    //Updates URL with the value of the selected option
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams) //Updates searchParams state
  }

  // Type prop is for styling
  return (
    <Select
      sortByValue={sortByValue}
      options={options}
      type='white'
      onChange={handleChange}
    />
  )
}

export default SortBy
