import { Controller, useFormContext } from 'react-hook-form';
import * as Form from '@radix-ui/react-form';
import { InputHTMLAttributes, ReactNode, useRef } from 'react';
import ErrorMessage from '@/components/Forms/ErrorMessage';
import cx from 'classnames';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';

type Props = {
  name: string;
  acceptFiles?: string[];
  label?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function FileInput(props: Props) {
  const { control } = useFormContext();
  const ref = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <Controller
      {...props}
      control={control}
      name={props.name}
      render={({ field: { value, ...fieldProps }, fieldState }) => (
        <Form.FormField name={props.name}>
          <Button className="ml-5" onClick={handleUpload} btnType={ColorTypeEnum.PRIMARY} type="button">
            {props.label ? props.label : 'Input file here'}
          </Button>
          <Form.Control asChild>
            <input
              {...fieldProps}
              value={value?.filename}
              ref={ref}
              type="file"
              className={cx(props.className, 'invisible', {
                ['input-error']: fieldState.error,
              })}
              accept={props.acceptFiles?.join(', ')}
              onChange={(e) => {
                const fileList = (e.target as HTMLInputElement).files;
                if (fileList) {
                  fieldProps.onChange(fileList);
                  
                }
              }}
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
