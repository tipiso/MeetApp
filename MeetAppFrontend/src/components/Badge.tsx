import classNames from 'classnames';
import { ReactNode } from 'react';

export enum BadgeSizes {
  XS = 'badge-xs',
  SM = 'badge-sm',
  MD = 'badge-md',
  LG = 'badge-lg',
}

type Props = {
  children: ReactNode;
  size: BadgeSizes;
  color?: string;
  outline?: boolean;
};

export default function Badge({ children, size, color, outline }: Props) {
  return <span className={classNames('badge', size, color, { 'badge-outline': !!outline })}>{children}</span>;
}
