import { ComponentPropsWithRef, InputHTMLAttributes } from 'react';
import cx from 'classnames';
import * as Form from '@radix-ui/react-form';

type Props = { text: string } & InputHTMLAttributes<HTMLInputElement>;
export default function Label({ text, ...props }: Props) {
  return (
    <Form.Label className={cx('label', props.className)}>
      <span className="label-text">{props.required ? `${text}*` : text}</span>
    </Form.Label>
  );
}
