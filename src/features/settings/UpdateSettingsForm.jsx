import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSetting'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'

function UpdateSettingsForm() {
  // At the beginning settigs will be undefined because they have not loaded yet. Set settings to empty object to prevent errors.
  const {
    isLoading,
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    } = {},
  } = useSettings()
  const { isUpdating, updateSetting } = useUpdateSetting()

  // RETUN SPINNDER WHILE DATA LOADS
  if (isLoading) return <Spinner />

  // EVENT HANDLER

  function handleUpdate(e) {
    e.preventDefault()
    const { value, defaultValue, id } = e.target
    if (!value || value === defaultValue) return
    updateSetting({ [id]: value })
  }

  const inputProps = [
    {
      id: 'minBookingLength',
      defaultValue: minBookingLength,
      label: 'Minimum nights/booking',
    },
    {
      id: 'maxBookingLength',
      defaultValue: maxBookingLength,
      label: 'Maximum nights/booking',
    },
    {
      id: 'maxGuestsPerBooking',
      defaultValue: maxGuestsPerBooking,
      label: 'Maximum guests/booking',
    },
    {
      id: 'breakfastPrice',
      defaultValue: breakfastPrice,
      label: 'Breakfast price',
    },
  ]

  return (
    <Form>
      {inputProps.map((prop) => (
        <FormRow label={prop.label} key={prop.label}>
          <Input
            type='number'
            id={prop.id}
            defaultValue={prop.defaultValue}
            // disabled={isUpdating}
            onBlur={handleUpdate}
          />
        </FormRow>
      ))}
    </Form>
  )
}

export default UpdateSettingsForm
