import { useForm } from 'react-hook-form'
//
import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'
//
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'

// ** COMPONENT
// Close onCloseModal is the close function that comes from the Modal Context component
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // * useFORM HOOKD
  // Props received from CabinRow
  const { id: editId, ...editValues } = cabinToEdit
  // Returns true if there is an editId
  const isEditSession = Boolean(editId)

  // register() links the input fields to the useForm hook, reset() will clear the form fields, getValue() returns the value if a field
  const { register, reset, handleSubmit, getValues, formState } = useForm({
    // To prefill form fields only when editing a cabin
    defaultValues: isEditSession ? editValues : {},
  })

  const { errors } = formState

  // * API FUNCTIONS
  const { isCreating, createCabin } = useCreateCabin()
  const { isEditing, editCabin } = useEditCabin()
  // use isInProgress to disable Input and button
  const isInProgress = isCreating || isEditing

  // * EVENT HANDELER
  function onSubmit(data) {
    // data = data from Form fields
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    console.log(data.image)
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          // onSuccess gets access to the data returned by the editCabin function.
          onSuccess: () => {
            reset() // reset() is a react-hook-form function accessible where the useForm hook is used.
            onCloseModal?.() //Closes modal after it is edited
          },
        },
      )
    else
      createCabin(
        { ...data, image },
        {
          // onSuccess gets access to the data returned by the createCabin function. We call onSuccess here because the reset() function is a useForm function that could not be used on the useCreateCabin hook.
          onSuccess: () => {
            reset()
            onCloseModal?.() //Closes modal after it is created
          },
        },
      )
  }

  //! Might have to add an error function to onSubmit below

  return (
    // FormRow displays the label, error message, and takes the input component as a child
    // Input is just a styled input component
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'} // Type prop is to style the form if it inside a modal.
    >
      {/* NAME  */}
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isInProgress}
          // returns the value of the input when form is submitted
          {...register('name', {
            // error message
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* NUMBER OF PEOPLE PER CABIN */}
      <FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isInProgress}
          {...register('maxCapacity', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* CABIN PRICE */}
      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isInProgress}
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* DISCOUNT */}
      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isInProgress}
          {...register('discount', {
            required: 'This field is required',
            // custom validate function
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>
      {/* CABIN DESCRIPTION TEXT AREAD */}
      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='text'
          id='description'
          disabled={isInProgress}
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* IMAGE UPLOAD */}
      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            // If isEditSession Will not be required if cabin is being edited
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      {/* BUTTONS */}
      <FormRow>
        <Button
          $variation='secondary'
          type='reset' // HTML attribute
          onClick={() => onCloseModal?.()} // Will call onClaoseModal() if the onCloseModal exists
        >
          Cancel
        </Button>
        <Button disabled={isInProgress}>
          {isEditSession ? 'Save cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
