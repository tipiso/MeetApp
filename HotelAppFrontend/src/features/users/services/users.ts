import { api } from '@/utils/axios';
import { usersUrl } from '@/utils/url';

const getUsersService = () => api.get(usersUrl);

export { getUsersService };
