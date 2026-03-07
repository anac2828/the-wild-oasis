import { useState } from 'react'
import { useLogin } from './useLogin'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRowVertical from '../../ui/FormRowVertical'
import Input from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import { Link } from 'react-router-dom'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useLogin()

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) return

    login(
      { email, password },
      {
        // Clears input fields after the form is submitted
        onSettled: () => {
          setEmail('')
          setPassword('')
        },
      },
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* EMAIL INPUT */}
      <FormRowVertical label='Email address'>
        <Input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      {/* PASSWORD INPUT */}
      <FormRowVertical label='Password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      {/* BUTTON */}
      <FormRowVertical>
        <Button size='large'>{isLoading ? <SpinnerMini /> : 'Login'}</Button>
      </FormRowVertical>
      <Link to='/reset-password'>Forgot password?</Link>
    </Form>
  )
}

export default LoginForm
