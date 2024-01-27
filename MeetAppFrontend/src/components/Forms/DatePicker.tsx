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

export default function DatePickerInput(props: Props) {
  const { control } = useFormContext();

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
