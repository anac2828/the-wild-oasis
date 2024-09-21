import { useForm } from 'react-hook-form';
//
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';
//
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

// Close onCloseModal is the close function that comes from the Modal Context component
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  // Props received from CabinRow
  const { id: editId, ...editValues } = cabinToEdit;
  // Returns true if there is an editId
  const isEditSession = Boolean(editId);
  const isWorking = isCreating || isEditing;

  // Form data handling hook when form is submitted
  const { register, reset, handleSubmit, getValues, formState } = useForm({
    // To prefill form fields only when editing a cabin
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    // Check if image has the Supabase URL or a FileList object. If the cabin is being edited, data.image will be a string else a file
    // Form fields need to match the fields in supabase. Replace data.image[0] with image: data.image[0]
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          // onSuccess gets access to the data returned by the createCabin function. We call onSuccess here because the reset() function is a useForm function that could not be used on the useCreateCabin hook.
          onSuccess: () => {
            reset();
            onCloseModal?.(); //Closes modal after it is edited
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          // onSuccess gets access to the data returned by the createCabin function. We call onSuccess here because the reset() function is a useForm function that could not be used on the useCreateCabin hook.
          onSuccess: () => {
            reset();
            onCloseModal?.(); //Closes modal after it is created
          },
        }
      );
  }

  return (
    // Type prop is to style the form if it inside a modal.
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          // returns the value of the input when form is submitted
          {...register('name', {
            // error message
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            // custom validate function
            validate: (value) => {
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                'Discount should be less than regular price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='text'
          id='description'
          disabled={isWorking}
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
          onClick={() => onCloseModal?.()} // Will only work if the onCloseModal exists
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Save cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
