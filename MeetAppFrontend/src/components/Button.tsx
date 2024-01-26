import { ComponentProps, ReactNode } from 'react';
import cx from 'classnames';
import { ColorTypeEnum } from '@/utils/constants';
import Loader, { LoaderSizes } from '@/components/Loader';
import Link, { LinkProps } from 'next/link';

type UniversalBtnProps = {
  children: ReactNode;
  btnType?: ColorTypeEnum;
  className?: string;
  outline?: boolean;
};

type ButtonProps =
  | ({ href: string } & UniversalBtnProps & LinkProps)
  | ({
      onClick?: () => void;
      isLoading?: boolean;
      type?: string;
    } & UniversalBtnProps &
      ComponentProps<'button'>);

export default function Button(props: ButtonProps) {
  const isAnchor = 'href' in props;
  const classes = cx('btn font-normal flex flex-nowrap normal-case', props.className, {
    'btn-primary': props.btnType === ColorTypeEnum.PRIMARY,
    'btn-secondary': props.btnType === ColorTypeEnum.SECONDARY,
    'btn-outline': !!props.outline,
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
      <button
        {...rest}
        tabIndex={-1}
        aria-disabled="true"
        className={cx(classes, disabled && 'btn-disabled')}
      >
        {isLoading && <Loader fitToContainer size={LoaderSizes.sm} />} {children}
      </button>
    );
  }
}
