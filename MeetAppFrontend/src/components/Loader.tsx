import cx from 'classnames';

export enum LoaderSizes {
  xs = 'loading-xs',
  sm = 'loading-sm',
  md = 'loading-md',
  lg = 'loading-lg',
}

type Props = {
  size: LoaderSizes;
  fitToContainer?: boolean;
};

export default function Loader({ size, fitToContainer }: Props) {
  return (
    <div className={cx(!fitToContainer && 'flex w-full justify-center py-10')}>
      <span className={cx('loading loading-spinner', size)}></span>
    </div>
  );
}
