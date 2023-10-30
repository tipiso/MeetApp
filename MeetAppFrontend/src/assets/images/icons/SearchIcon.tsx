import { IconProps } from './types';

const SearchIcon = (props: IconProps) => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill={props.fill ?? 'transparent'} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.875 14.8751L11.7987 11.7989M11.7987 11.7989C12.3249 11.2726 12.7424 10.6479 13.0271 9.96041C13.3119 9.27288 13.4585 8.53599 13.4585 7.79181C13.4585 7.04764 13.3119 6.31075 13.0271 5.62322C12.7424 4.93569 12.3249 4.31098 11.7987 3.78477C11.2725 3.25856 10.6478 2.84114 9.96029 2.55636C9.27276 2.27158 8.53587 2.125 7.79169 2.125C7.04751 2.125 6.31062 2.27158 5.6231 2.55636C4.93557 2.84114 4.31086 3.25856 3.78465 3.78477C2.72192 4.8475 2.12488 6.28888 2.12488 7.79181C2.12488 9.29474 2.72192 10.7361 3.78465 11.7989C4.84738 12.8616 6.28876 13.4586 7.79169 13.4586C9.29462 13.4586 10.736 12.8616 11.7987 11.7989Z"
      stroke={props.stroke ?? 'currentColor'}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default SearchIcon;
