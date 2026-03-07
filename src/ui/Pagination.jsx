import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { PAGE_SIZE } from '../utils/constants'

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.disabled ? ' var(--color-grey-300)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`

// ** COMPONENT **
function Pagination({ count }) {
  // http://localhost:5173/bookings?page=2
  const [searchParams, setSearchParams] = useSearchParams()
  // If there is no page value than currentPage will be 1.
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'))

  /** Count comes from the BooktingTable.jsx
   @param count number of bookings 
   @param PAGE_SIZE (10) number of results in each page  
   @param PAGE_SIZE (10) number of results in each page  
   @param pageCount number of pages to display the bookings */
  const pageCount = Math.ceil(count / PAGE_SIZE)

  //* HANDLERS
  // Updates pagination UI but will not cause a data fetch, that happens in the useBookings() hook.
  const nextPage = () => {
    // If not on last page add 1 to the currentPage
    const next = currentPage === pageCount ? currentPage : currentPage + 1
    // Update URL page params
    searchParams.set('page', next)
    // Update searchParams state
    setSearchParams(searchParams)
  }

  const PreviousPage = () => {
    // If not on first page subtract 1 from the currentPage
    const previous = currentPage === 1 ? currentPage : currentPage - 1
    // Update URL page params
    searchParams.set('page', previous)
    // Update searchParams state
    setSearchParams(searchParams)
  }

  // If page count is 0 dont's desplay the Pagination component
  if (pageCount <= 1) return null

  return (
    <StyledPagination>
      <P>
        {/* Will start at 1 */}
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {/* If on last page show count (total results) else currentPage * PAGE_SIZE */}
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        {/* Total number of results */}
        of <span>{count}</span> results
      </P>

      {/* Next and Previous page buttons */}
      <Buttons>
        <PaginationButton onClick={PreviousPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}

export default Pagination
