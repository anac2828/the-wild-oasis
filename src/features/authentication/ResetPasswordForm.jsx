import { useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRowVertical from '../../ui/FormRowVertical'
import Input from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import { useResetPass } from './useResetPass'

function ResetPasswordForm() {
  const [email, setEmail] = useState('')

  const { resetPass, isLoading } = useResetPass()

  function handleSubmit(e) {
    e.preventDefault()

    if (!email) return

    resetPass(email, {
      // Clears input fields after the form is submitted
      onSettled: () => {
        setEmail('')
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* EMAIL INPUT */}
      <FormRowVertical label='Email address'>
        <Input
          type='email'
          id='email'
          // Allows the browser to fill previously enter data
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>

      {/* BUTTON */}
      <FormRowVertical>
        <Button size='large'>
          {isLoading ? <SpinnerMini /> : 'Send reset link'}
        </Button>
      </FormRowVertical>
    </Form>
  )
}

export default ResetPasswordForm
