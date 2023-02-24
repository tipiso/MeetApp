import { ButtonHTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';
export enum BtnType {
  Primary = 'primary',
  Secondary = 'secondary',
}

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  btnType?: BtnType;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({ children, btnType, ...rest }: ButtonProps) {
  const classes = cx('btn', {
    'btn-primary': btnType === BtnType.Primary,
    'pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50':
      btnType === BtnType.Secondary,
  });
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}
