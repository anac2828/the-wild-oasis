import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
import Uploader from '../data/Uploader';

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  /* Will span the side bar from top to bottom on the left side of the page */
  grid-row: 1 / -1;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />

      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;
