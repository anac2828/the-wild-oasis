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
  // to get acced to form data when it is submitted
  const { register, reset, handleSubmit, getValues, formState } = useForm();
  const errors = formState.errors;

  // for the table component to re-render when a new cabin is added with form
  const queryClient = useQueryClient();

  // to connect createCabin to react-query
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
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

  function onSubmit(data) {
    // fields need to match the fields in supabase. Replace data.image[0] with image: data.image.at(0)
    mutate({ ...data, image: data.image[0] });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          // returns the value of the input when form is submitted
          {...register('name', {
            // error message
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          {...register('image', { required: 'This field is required' })}
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
