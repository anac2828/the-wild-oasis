import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const StyledAppLayout = styled.div`
  display: grid;
  /* Two column grid - 26rem for the Sidebar and 1fr will expand the rest of the space availabel */
  grid-template-columns: 26rem 1fr;
  /* Two row grid - with auto with row will adjust to the size of the content */
  grid-template-rows: auto 1fr;
  height: 100vh;
`

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: grid;
  gap: 3.2rem;
`

function AppLayout() {
  return (
    <StyledAppLayout>
      {/* This components appear on all routes (pages) */}
      <Header />
      <Sidebar />
      {/* NESTED ROUTES */}
      <Main>
        <Container>
          {/* Nested routes from App.jsx will render here */}
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  )
}

export default AppLayout
