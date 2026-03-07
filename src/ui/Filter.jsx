import { useSearchParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`

const FilterButton = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`

// ** FILTER COMPONENT **
// Filter component can be anywhere beacuase we are not using useState, but we are saving the state in the URL
// Filter props come from the CabinTableOperations
function Filter({ filterField, options }) {
  // Saves data to URL
  const [searchParams, setSearchParams] = useSearchParams()
  // gets the value ('discount', 'no-discount') of filterField ('discount') to set the active styles and disabled option; options.at(0).value = all
  const currentFilter = searchParams.get(filterField) || options.at(0).value

  // HANDLER
  function handleClick(value) {
    // Update state in URL filterField/value = 'discount=no-discount'
    searchParams.set(filterField, value)
    // Reset page number when a new filter option is clicked to avoid bugs
    if (searchParams.get('page')) searchParams.set('page', 1)
    // Updates state with value of searchParams
    setSearchParams(searchParams)
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClick(option.value)} //updates URL params to get currentFilter
          key={option.value}
          $active={option.value === currentFilter} // applies active style options above
          disabled={option.value === currentFilter} // disabled if currently selected
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  )
}

export default Filter
