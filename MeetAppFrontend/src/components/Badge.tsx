import classNames from 'classnames';
import { ReactNode } from 'react';

export enum BadgeSizes {
  XS = 'badge-xs',
  SM = 'badge-sm',
  MD = 'badge-md',
  LG = 'badge-lg',
}

type Props = {
  content: ReactNode;
  color: string;
  size: BadgeSizes;
  outline?: boolean;
};

export default function Loader({ content, size, color, outline }: Props) {
  return <span className={classNames('badge', size, { 'badge-outline': !!outline })}>{content}</span>;
}
