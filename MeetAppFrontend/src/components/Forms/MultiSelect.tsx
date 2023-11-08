import Select from 'react-select';
import * as Form from '@radix-ui/react-form';
import { InputHTMLAttributes, ReactNode } from 'react';
import Label from '@/components/Forms/Label';
import ErrorMessage from '@/components/Forms/ErrorMessage';
import { Controller, useFormContext } from 'react-hook-form';
import Badge, { BadgeSizes } from '@/components/Badge';
import { CrossIcon } from '@/assets/images/icons';

export type Option = { label: string; value: string };

type Props = {
  name: string;
  options: Option[];
  label?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const MultiSelect = (props: Props) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <Form.FormField className="form-control" name={props.name}>
          {props.label && <Label text={props.label} {...props} />}
          <Select
            {...field}
            unstyled
            isMulti
            controlShouldRenderValue={false}
            closeMenuOnSelect={false}
            value={field.value}
            onChange={(newValue, _) => {
              setValue(props.name, newValue);
            }}
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

          {field.value && (
            <div className="pt-4">
              {field.value.map((val: Option) => (
                <Badge size={BadgeSizes.MD}>
                  <button
                    className="pr-2"
                    onClick={() => {
                      setValue(
                        props.name,
                        field.value.filter((newVal: Option) => newVal.value !== val.value),
                      );
                    }}
                  >
                    <CrossIcon className="neutral" />
                  </button>
                  {val.label}
                </Badge>
              ))}
            </div>
          )}

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
