import { ComponentProps, ReactNode } from 'react';
import cx from 'classnames';
import { ColorTypeEnum } from '@/utils/constants';
import Loader, { LoaderSizes } from '@/components/Loader';
import Link, { LinkProps } from 'next/link';

type ButtonProps =
  | ({ href: string; btnType?: ColorTypeEnum; className?: string; children?: ReactNode } & LinkProps)
  | ({
      children: ReactNode;
      onClick?: () => void;
      btnType?: ColorTypeEnum;
      isLoading?: boolean;
      type?: string;
    } & ComponentProps<'button'>);

export default function Button(props: ButtonProps) {
  const isAnchor = 'href' in props;
  const classes = cx('btn font-normal normal-case', props.className, {
    'btn-primary': props.btnType === ColorTypeEnum.PRIMARY,
    'btn-secondary': props.btnType === ColorTypeEnum.SECONDARY,
  });

  if (isAnchor) {
    const { btnType, children, ...rest } = props;
    return (
      <Link {...rest} className={classes}>
        {children}
      </Link>
    );
  } else {
    const { btnType, isLoading, disabled, children, ...rest } = props;
    return (
      <button {...rest} className={cx(classes, disabled && 'btn-disabled text-neutral')}>
        {isLoading && <Loader fitToContainer size={LoaderSizes.sm} />} {children}
      </button>
    );
  }
}
