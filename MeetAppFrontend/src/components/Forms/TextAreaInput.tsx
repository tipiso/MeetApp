import { InputHTMLAttributes } from 'react';
import cx from 'classnames';
import * as Form from '@radix-ui/react-form';
import { Controller, useFormContext } from 'react-hook-form';
import Label from '@/components/Forms/Label';
import ErrorMessage from '@/components/Forms/ErrorMessage';

type Props = { name: string; label?: string } & InputHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaInput(props: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <Form.FormField name={props.name} className="form-control">
          {props.label && <Label text={props.label} {...props} />}
          <Form.Control asChild>
            <textarea
              {...field}
              placeholder={props.placeholder}
              className={cx(props.className, 'input-bordered textarea w-full border-base-300', {
                ['input-error']: fieldState.error,
              })}
            />
          </Form.Control>

          {fieldState.error && (
            <Form.Message asChild>
              <ErrorMessage msg={fieldState.error.message as string} />
            </Form.Message>
          )}
        </Form.FormField>
      )}
    />
  );
}
