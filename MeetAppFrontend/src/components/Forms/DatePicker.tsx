import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import * as Form from '@radix-ui/react-form';

import 'react-datepicker/dist/react-datepicker.css';
import Label from './Label';

type Props = {
  name: string;
  placeholder: string;
  label?: string;
};

/** Probably should have went with Shadcn in retrospect, styling headless UI is much easier with tailwind. Also, radix is missing
 * multiselect and datepicker, so it already cost more time than it should have.
 */
export default function DatePickerInput(props: Props) {
  const { control, getValues, register } = useFormContext();
  console.log(getValues());
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field }) => (
        <Form.FormField name={props.name} className="form-control">
          {props.label && <Label text={props.label} {...props} />}
          <DatePicker
            {...field}
            className="input-bordered input w-full border-base-300"
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
          />
        </Form.FormField>
      )}
    />
  );
}
