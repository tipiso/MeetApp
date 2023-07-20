import { InputHTMLAttributes } from 'react';
import cx from 'classnames';
import * as Form from '@radix-ui/react-form';
import { Controller, useFormContext } from 'react-hook-form';
import Label from '@/components/Forms/Label';
import ErrorMessage from '@/components/Forms/ErrorMessage';

type Props = { name: string; label?: string } & InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
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
                placeholder={props.placeholder}
                autoComplete={props.type === 'password' ? 'current-password' : ''}
                type={props.type}
                className={cx(
                  props.className,
                  'input w-full border-b-gray-200 bg-transparent text-sm focus:border-b-blue',
                  {
                    'rounded-none border-t-0 border-l-0 border-r-0 p-0 focus:border-b-secondary focus:outline-0': [
                      'text',
                      'password',
                    ].includes(props.type ?? 'text'),
                  },
                )}
              />
            </Form.Control>

            {fieldState.error && (
              <Form.Message asChild>
                <ErrorMessage msg={fieldState.error.message as string} />
              </Form.Message>
            )}
          </div>
        </Form.FormField>
      )}
    />
  );
}
