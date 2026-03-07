import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm'
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Account() {
  return (
    <>
      <Heading as='h1'>Update your account</Heading>

      {/* UPDATE USER PROFILE */}
      <Row>
        <Heading as='h3'>Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      {/* UPDATE USER PASSWORD */}
      <Row>
        <Heading as='h3'>Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  )
}

export default Account
