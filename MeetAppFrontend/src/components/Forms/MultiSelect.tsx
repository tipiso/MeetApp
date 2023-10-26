import Select from 'react-select';
import * as Form from '@radix-ui/react-form';
import { InputHTMLAttributes, ReactNode } from 'react';
import Label from '@/components/Forms/Label';
import ErrorMessage from '@/components/Forms/ErrorMessage';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  options: { label: string; value: string }[];
  label?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const MultiSelect = (props: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <Form.FormField className="form-control" name={props.name}>
          {props.label && <Label text={props.label} {...props} />}
          <Select
            unstyled
            classNames={{
              placeholder: () => 'text-gray-400',
              control: () =>
                'border-base-300 text-normal select-bordered select w-full items-center text-base font-normal',
              option: () =>
                'relative flex h-10 w-full items-center border-0 py-2 px-4 text-xs outline-0 hover:bg-gray-300',
              menu: () => 'shadow-black-500/50 w-52 overflow-hidden bg-white shadow-lg',
            }}
            options={props.options}
            components={{
              DropdownIndicator: () => <></>,
              IndicatorsContainer: () => <></>,
            }}
          />

          {fieldState.error && (
            <Form.Message asChild>
              <ErrorMessage msg={fieldState.error.message as string} />
            </Form.Message>
          )}
        </Form.FormField>
      )}
    />
  );
};

export default MultiSelect;
