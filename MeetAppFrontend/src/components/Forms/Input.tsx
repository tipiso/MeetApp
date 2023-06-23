import { InputHTMLAttributes } from 'react';
import cx from 'classnames';
import * as Form from '@radix-ui/react-form';
import { Controller, useFormContext } from 'react-hook-form';
import Label from '@/components/Forms/Label';

type Props = { name: string; label?: string } & InputHTMLAttributes<HTMLInputElement>;
export default function Input(props: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <Form.FormField name={props.name}>
          <div>
            {props.label && <Label text={props.label} />}
            <Form.Control asChild>
              <input
                {...field}
                type={props.type}
                className={cx(
                  props.className,
                  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                )}
              />
            </Form.Control>

            {fieldState.error && <Form.Message className="text-red-600">{fieldState.error.message}</Form.Message>}
          </div>
        </Form.FormField>
      )}
    />
  );
}
