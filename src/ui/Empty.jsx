import styled from 'styled-components'
import Heading from './Heading'

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function Empty({ error }) {
  console.log(error)
  return (
    <Box>
      <Heading as='h2'>{error.message}</Heading>
    </Box>
  )

  // return <p>No {resourceName} could be found.</p>
}

export default Empty
