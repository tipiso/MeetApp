import classNames from 'classnames';

export enum LoaderSizes {
  xs = 'loading-xs',
  sm = 'loading-sm',
  md = 'loading-md',
  lg = 'loading-lg',
}

type Props = {
  size: LoaderSizes;
};

export default function Loader({ size }: Props) {
  return (
    <div className="flex w-full justify-center py-10">
      <span className={classNames('loading loading-spinner', size)}></span>
    </div>
  );
}
