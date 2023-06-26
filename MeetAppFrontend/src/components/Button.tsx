import { ComponentProps, ReactNode } from 'react';
import cx from 'classnames';
export enum BtnType {
  Primary = 'primary',
  Secondary = 'secondary',
}

type ButtonProps =
  | ({ href: string; btnType?: BtnType } & ComponentProps<'a'>)
  | ({
      children: ReactNode;
      onClick?: () => void;
      btnType?: BtnType;
      type?: string;
    } & ComponentProps<'button'>);

export default function Button(props: ButtonProps) {
  const { btnType, children } = props;
  const classes = cx('btn', {
    'btn-primary': btnType === BtnType.Primary,
    'pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50':
      btnType === BtnType.Secondary,
  });

  if ('href' in props) {
    return (
      <a {...props} className={classes}>
        {children}
      </a>
    );
  } else {
    return (
      <button {...props} className={classes}>
        {children}
      </button>
    );
  }
}
