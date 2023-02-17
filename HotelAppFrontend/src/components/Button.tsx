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
  const classes = cx({
    'pointer-events-auto rounded-md py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white bg-indigo-600 hover:bg-indigo-500':
      btnType === BtnType.Primary,
    'pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50':
      btnType === BtnType.Secondary,
  });
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}
