import { Controller, useFormContext } from 'react-hook-form';
import * as Form from '@radix-ui/react-form';
import { InputHTMLAttributes, ReactNode } from 'react';
import ErrorMessage from '@/components/Forms/ErrorMessage';

type Props = {
  name: string;
  label?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;
export function CheckboxInput(props: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      {...props}
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <Form.FormField name={props.name}>
          <div data-theme="light">
            <label className="label cursor-pointer" htmlFor={props.id || props.name}>
              <input
                {...field}
                id={props.id || props.name}
                type="checkbox"
                className="checkbox mr-2"
                checked={field.value}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
              />
              {props.label && <span className="label-text text-xs font-light">{props.label}</span>}
            </label>

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
