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

export { API_URL, TOKEN_LIFE, HUB_URL, ColorTypeEnum };
