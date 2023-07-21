import { Controller, useFormContext } from 'react-hook-form';
import * as Form from '@radix-ui/react-form';
import * as Checkbox from '@radix-ui/react-checkbox';
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
          <div className="flex items-center">
            <Checkbox.Root
              className="CheckboxRoot checkbox h-4 w-4 self-start rounded-sm"
              id={props.id || props.name}
              {...field}
              value={field.value}
              onClick={(e) => {
                const value = (e.target as HTMLInputElement).value === 'true';
                field.onChange(!value);
              }}
            ></Checkbox.Root>
            <label className="Label ml-2 flex" htmlFor={props.id || props.name}>
              {props.label && <span className="label-text text-xs font-light">{props.label}</span>}
            </label>
          </div>

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
