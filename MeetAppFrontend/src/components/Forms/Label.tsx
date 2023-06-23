import { LabelHTMLAttributes } from 'react';
import cx from 'classnames';
import * as Form from '@radix-ui/react-form';

type Props = { text: string } & LabelHTMLAttributes<HTMLLabelElement>;
export default function Label({ text, ...props }: Props) {
  return (
    <Form.Label
      {...props}
      className={cx('block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300', props.className)}
    >
      {text}
    </Form.Label>
  );
}
