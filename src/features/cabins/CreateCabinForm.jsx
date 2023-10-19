import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
//
import { createEditCabin } from '../../services/apiCabins';
//
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

function CreateCabinForm({ cabinToEdit = {} }) {
  // received from CabinRow
  const { id: editId, ...editValues } = cabinToEdit;
  // True if there is an editId
  const isEditSession = Boolean(editId);

  // to get access to form data when it is submitted
  const { register, reset, handleSubmit, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const errors = formState.errors;

  // for the table component to re-render when a new cabin is added with form
  const queryClient = useQueryClient();

  // CREATE CABIN useMutation //
  // to connect createCabin to react-query
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      // Table will be re-render
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      // clears form fields
      reset();
    },
    // error meesage comes from createCabin
    onError: (err) => toast.error(err.message),
  });

  // to connect createCabin to react-query
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // mutationFn can only receive one artugment. Use object to combaine arguments
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin has been successfully edited');
      // Table will be re-render
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      // clears form fields
      reset();
    },
    // error meesage comes from createCabin
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // check if image has the supabase url or a FileList object
    // Form fields need to match the fields in supabase. Replace data.image[0] with image: data.image[0]
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image: image });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <FormRow label='Description for website' error={errors?.description?.message}>
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

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            // will not be required if cabin is being edited
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
