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
                autoComplete={props.type === 'password' ? 'current-password' : ''}
                type={props.type}
                className={cx(props.className, 'input w-full')}
              />
            </Form.Control>

            {fieldState.error && <Form.Message className="text-red-600">{fieldState.error.message}</Form.Message>}
          </div>
        </Form.FormField>
      )}
    />
  );
}
