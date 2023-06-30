import { ComponentProps, ReactNode } from 'react';
import cx from 'classnames';
import { ColorTypeEnum } from '@/utils/constants';

type ButtonProps =
  | ({ href: string; btnType?: ColorTypeEnum } & ComponentProps<'a'>)
  | ({
      children: ReactNode;
      onClick?: () => void;
      btnType?: ColorTypeEnum;
      type?: string;
    } & ComponentProps<'button'>);

export default function Button(props: ButtonProps) {
  const classes = cx('btn', {
    'btn-primary': props.btnType === ColorTypeEnum.PRIMARY,
    'pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50':
      props.btnType === ColorTypeEnum.SECONDARY,
  });

  if ('href' in props) {
    const { btnType, children, ...rest } = props;
    return (
      <a {...rest} className={classes}>
        {children}
      </a>
    );
  } else {
    const { btnType, children, ...rest } = props;
    return (
      <button {...rest} className={classes}>
        {children}
      </button>
    );
  }
}
