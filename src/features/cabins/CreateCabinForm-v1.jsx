import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
//
import { createCabin } from '../../services/apiCabins';
//
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

function CreateCabinForm() {
  //  Form data handling hook when form is submitted
  const { register, reset, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;

  // Gives access to state
  const queryClient = useQueryClient();

  // Runs createCabin API funtion to create new cabin on Supabase
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created.');
      // Table will be re-render
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      // Clears form fields
      reset();
    },
    // Error meesage comes from createCabin
    onError: (err) => toast.error(err.message),
  });

  // Data will be passed from the handleSubmit function
  function onSubmit(data) {
    // Fields need to match the fields in supabase.
    mutate({ ...data, image: data.image[0] });
  }

  // eslint-disable-next-line no-unused-vars
  function onError(errors) {
    // For testing only
    // console.log(errors);
  }

  return (
    // If there is an invalid input the onError function will run
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          // Returns the value of the input when form is submitted
          {...register('name', {
            // Error message
            required: 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow label={'Max Capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          // Returns the value of the input when form is submitted
          {...register('maxCapacity', {
            // Error message
            required: 'This field is required.',
            min: { value: 1, message: 'Capacity should be at least 1.' },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This field is required.',
            min: { value: 1, message: 'Price should be at least 1.' },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isCreating}
          {...register('discount', {
            required: 'This field is required.',
            // Custom validation function that gets the value from the field
            validate: (value) => {
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                'Discount should be less than regular price.'
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
          disabled={isCreating}
          defaultValue=''
          {...register('description', {
            required: 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', { required: 'This field is required.' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
