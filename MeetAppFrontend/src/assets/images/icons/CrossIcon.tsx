import { IconProps } from './types';

const CrossIcon = (props: IconProps) => (
  <svg
    className={props.className}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill={props.fill ?? 'none'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L9 9M1 9L9 1L1 9Z"
      stroke={props.stroke ?? 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CrossIcon;
