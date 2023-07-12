import { ComponentPropsWithRef } from 'react';
import cx from 'classnames';
import * as Form from '@radix-ui/react-form';

type Props = { text: string } & ComponentPropsWithRef<'label'>;
export default function Label({ text, ...props }: Props) {
  return (
    <Form.Label
      {...props}
      className={cx('text-gray-900 dark:text-gray-300 mb-2 block text-sm font-medium', props.className)}
    >
      {text}
    </Form.Label>
  );
}
