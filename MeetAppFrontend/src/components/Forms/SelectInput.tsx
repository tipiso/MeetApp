import { Controller, useFormContext } from 'react-hook-form';
import * as Form from '@radix-ui/react-form';
import cx from 'classnames';
import * as Select from '@radix-ui/react-select';
import { forwardRef, InputHTMLAttributes, ReactNode, Ref } from 'react';
import ErrorMessage from '@/components/Forms/ErrorMessage';
import Label from '@/components/Forms/Label';
import { SelectItemProps } from '@radix-ui/react-select';

type Props = {
  name: string;
  options: { label: string; value: string }[];
  label?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const SelectItem = forwardRef<HTMLDivElement | null, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cx(
          'relative flex h-10 w-full items-center border-0 py-2 px-4 text-xs outline-0 hover:bg-gray-300',
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  },
);

export function SelectInput(props: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <Form.FormField className="form-control" name={props.name}>
          {props.label && <Label text={props.label} {...props} />}
          <Form.Control asChild>
            <Select.Root
              {...field}
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val);
              }}
            >
              <Select.Trigger
                id={props.id || props.name}
                className="text-normal select-bordered select w-full items-center text-base font-normal"
              >
                {props.placeholder && (
                  <Select.Value placeholder={<span className="text-gray-400">{props.placeholder}</span>}></Select.Value>
                )}
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  position="popper"
                  className="shadow-black-500/50 w-52 overflow-hidden bg-white shadow-lg"
                >
                  <Select.Viewport>
                    <Select.Group>
                      {props.options.map((o) => (
                        <SelectItem key={o.value + o.label} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
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
