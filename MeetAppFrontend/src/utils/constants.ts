const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || '';
const TOKEN_LIFE = 7 * 24 * 60 * 60;

enum ColorTypeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  INFO = 'info',
  WARNING = 'warning',
}

const genderFilterOptions = [
  { label: 'All', value: '' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const mbInBytes = 1048576;

const initialPagination = { pageSize: 6, totalPage: 1, currentPage: 1, totalSize: 12 };

export {
  API_URL,
  TOKEN_LIFE,
  HUB_URL,
  ColorTypeEnum,
  initialPagination,
  genderFilterOptions,
  genderOptions,
  mbInBytes,
};
