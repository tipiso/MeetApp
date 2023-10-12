import classNames from 'classnames';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

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
  className?: string;
};

export const defaultBadgeClassColors = ['badge-primary', 'badge-secondary', 'badge-accent'];

const Badge = forwardRef(function Badge(
  { children, size, color, outline, className }: Props,
  ref: ForwardedRef<HTMLSpanElement | null>,
) {
  return (
    <span ref={ref} className={classNames('badge', className, size, color, { 'badge-outline': !!outline })}>
      {children}
    </span>
  );
});

export default Badge;
