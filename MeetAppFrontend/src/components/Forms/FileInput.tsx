import { Controller, useFormContext, useWatch } from 'react-hook-form';
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
  btnType?: ColorTypeEnum;
} & InputHTMLAttributes<HTMLInputElement>;

export function FileInput(props: Props) {
  const { control, watch } = useFormContext();
  const ref = useRef<HTMLInputElement>(null);

  // Needed to notify React after ref is used to update
  watch();

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
          <Button onClick={handleUpload} btnType={props.btnType ?? ColorTypeEnum.PRIMARY} type="button">
            {props.label ? props.label : 'Input file here'}
          </Button>
          <Form.Control asChild>
            <input
              {...fieldProps}
              value={value?.filename}
              ref={ref}
              type="file"
              className={cx(props.className, 'hidden', {
                ['input-error']: fieldState.error,
              })}
              accept={props.acceptFiles?.join(', ')}
              onChange={(e) => {
                const fileList = (e.target as HTMLInputElement).files;
                console.log(fileList);
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
