/* eslint-disable no-unused-vars */
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

import { useSettings } from "./useSettings";
// import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {

  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting()
  // const { mutate: updateSetting, isLoading: isUpdating } = useUpdateSetting();

  // return <Spinner />;
  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          disabled={isUpdating}
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestPerBooking')}
        />
      </FormRow>
      
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
