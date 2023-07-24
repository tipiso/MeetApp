import { Controller, useFormContext } from 'react-hook-form';
import * as Form from '@radix-ui/react-form';
import cx from 'classnames';
import * as Select from '@radix-ui/react-select';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import ErrorMessage from '@/components/Forms/ErrorMessage';
import Label from '@/components/Forms/Label';

type Props = {
  name: string;
  options: { label: string; value: string }[];
  label?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const SelectItem = forwardRef<any, any>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item className={cx('relative h-10 w-full py-2 px-4 text-xs', className)} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      {/*<Select.ItemIndicator className="SelectItemIndicator">*/}
      {/*  <CheckIcon />*/}
      {/*</Select.ItemIndicator>*/}
    </Select.Item>
  );
});

export function SelectInput(props: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <Form.FormField className="form-control" name={props.name}>
          {props.label && <Label text={props.label as string} {...props} />}
          <Form.Control asChild>
            <Select.Root {...field} value={field.value}>
              <Select.Trigger
                id={props.id || props.name}
                className="text-normal select-bordered select w-full items-center text-base font-normal"
              >
                {props.placeholder && <Select.Value placeholder={props.placeholder}></Select.Value>}
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  position="popper"
                  className="shadow-black-500/50 w-52 overflow-hidden bg-white shadow-lg"
                >
                  <Select.Viewport className="p-4">
                    <Select.Group>
                      {props.options.map((o) => (
                        <SelectItem value={o.value}>{o.label}</SelectItem>
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
