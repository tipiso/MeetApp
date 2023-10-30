import { InputHTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';
import * as Form from '@radix-ui/react-form';
import { Controller, useFormContext } from 'react-hook-form';
import Label from '@/components/Forms/Label';
import ErrorMessage from '@/components/Forms/ErrorMessage';

type Props = {
  name: string;
  label?: string;
  submitBtn?: ReactNode;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
  const { control } = useFormContext();
  const withIcon = !!props.icon;
  const withBtn = !!props.submitBtn;

  return (
    <Controller
      {...props}
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <Form.FormField name={props.name} className="form-control">
          {props.label && <Label text={props.label} {...props} />}
          <Form.Control asChild>
            <div
              className={cx({
                ['join']: withBtn || withIcon,
              })}
            >
              <input
                {...field}
                placeholder={props.placeholder}
                autoComplete={props.type === 'password' ? 'current-password' : ''}
                type={props.type}
                className={cx(props.className, 'input-bordered input w-full border-base-300', {
                  ['input-error']: fieldState.error,
                  ['join-item']: withIcon || withBtn,
                })}
              />
              {withIcon && <div className="join-item right-4 top-1/2 -translate-y-1/2">{props.icon}</div>}
              {withBtn && <div className="join-item">{props.submitBtn}</div>}
            </div>
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
