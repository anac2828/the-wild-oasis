import styled from 'styled-components'
import Logo from '../ui/Logo'
import Heading from '../ui/Heading'
import ResetPasswordForm from '../features/authentication/ResetPasswordForm'

const ResetPassLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`

function ResetPassword() {
  return (
    <ResetPassLayout>
      <Logo />
      <Heading as='h4'>Reset your password</Heading>
      <ResetPasswordForm />
    </ResetPassLayout>
  )
}

export default ResetPassword
