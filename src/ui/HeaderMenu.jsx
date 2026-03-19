import { useNavigate } from 'react-router-dom'
import { HiOutlineUser } from 'react-icons/hi2'
import styled from 'styled-components'
import ButtonIcon from './ButtonIcon'
import DarkModeToggle from './DarkModeToggle'
import Logout from '../features/authentication/Logout'

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`

function HeaderMenu() {
  const navigate = useNavigate()
  return (
    <StyledHeaderMenu>
      <li>
        {/* USER PROFILE BUTTON */}
        {/* <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon> */}
      </li>
      {/* DARK MODE BUTTON */}
      <li>
        <DarkModeToggle />
      </li>
      {/* LOGOUT USER */}
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
