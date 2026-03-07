import { useState } from 'react'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useUser } from './useUser'
import { useUpdateUser } from './useUpdateUser'

// ** COMPONENT **
function UpdateUserDataForm() {
  // We don't need the "loading" state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser()
  const { updateUser, isUpdating } = useUpdateUser()
  // Local state
  const [fullName, setFullName] = useState(currentFullName)
  const [avatar, setAvatar] = useState(null)

  // HANDLERS
  function handleSubmit(e) {
    e.preventDefault()

    if (!fullName) return

    // API FUNCTION
    updateUser(
      { fullName, avatar },
      // resets the input fields
      {
        onSuccess: () => {
          setAvatar(null)
          // Input field that calls the function
          e.target.reset()
        },
      },
    )
  }

  function handleCancel() {
    // Change name back to currentFullName if user cancels updating the Fullname
    setFullName(currentFullName)
    setAvatar(null)
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* EMAIL ADDRESS */}
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>

      {/* FULLNAME */}
      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
          disabled={isUpdating}
          required
        />
      </FormRow>

      {/* AVATAR */}
      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      {/* BUTTONS */}
      <FormRow>
        <Button type='reset' $variation='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
