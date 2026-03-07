import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useUpdateUser } from './useUpdateUser'

// ** COMPONENT **
function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm()
  const { errors } = formState

  const { updateUser, isUpdating } = useUpdateUser()

  // HANDLER
  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* NEW PASSWORD */}
      <FormRow
        label='New password (min 8 chars)'
        error={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          // HTML attribute that allows browsers to automatically fill in input fields based on previously entered values.
          autoComplete='current-password'
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      {/* CONFIRM NEW PASSWORD */}
      <FormRow
        label='Confirm password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            // checks if the confirm password is the same as the new password in the input above
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>

      {/* BUTTONS */}
      <FormRow>
        <Button onClick={reset} type='reset' $variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  )
}

export default UpdatePasswordForm
