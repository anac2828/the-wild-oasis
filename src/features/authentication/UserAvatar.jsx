import styled from 'styled-components'
import { useUser } from './useUser'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../../ui/ButtonIcon'

const StyledUserAvatar = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`

const Button = styled.button`
  display: flex;
  gap: 1.4rem;
  align-items: center;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
`

// ** COMPONENT **
function UserAvatar() {
  const { user } = useUser()
  const navigate = useNavigate()

  // avatar by default is saved as an empty string during the signup process. See apiAuth.js. User needs to update their profile /account to add an avatar image.
  const { fullName, avatar } = user.user_metadata

  return (
    <StyledUserAvatar>
      <Button onClick={() => navigate('/account')}>
        <Avatar
          src={avatar || 'default-user.jpg'}
          alt={`Avatar of ${fullName}`}
        />
        <span>{fullName}</span>
      </Button>
    </StyledUserAvatar>
  )
}

export default UserAvatar
