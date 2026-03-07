import styled from 'styled-components'

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
`

// ** SELECT COMPONENT **
// use the ...props spread operator when you need multiple props. Component is used in SortBy.jsx
function Select({ options, sortByValue, onChange, ...props }) {
  // onChange is needed here to call the onChange function in SortBY.jsx
  return (
    <StyledSelect
      onChange={onChange}
      value={sortByValue} // Will keep the sortByValue selected when the page is reloaded
      {...props}
      name='sort by'
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  )
}

export default Select
