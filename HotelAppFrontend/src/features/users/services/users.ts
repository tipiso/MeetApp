import { api } from '@/utils/axios';
import { usersUrl } from '@/utils/url';

const usersQueryKeys = {
  users: 'users',
  usersList: () => usersQueryKeys.users + '/list',
};
const getUsersService = () => api.get(usersUrl);

export { getUsersService, usersQueryKeys };
