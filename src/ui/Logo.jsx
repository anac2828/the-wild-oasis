import styled from 'styled-components'
import { useDarkMode } from '../context/DarkModeContext'
import { Link } from 'react-router-dom'

const StyledLogo = styled.div`
  text-align: center;
`

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`

function Logo() {
  const { isDarkMode } = useDarkMode()
  // Logo image is in the public folder
  const logo = isDarkMode ? '/logo-dark.png' : '/logo-light.png'
  return (
    <StyledLogo>
      <Link to={'/dashboard'}>
        <Img src={logo} alt='Logo' />
      </Link>
    </StyledLogo>
  )
}

export default Logo
