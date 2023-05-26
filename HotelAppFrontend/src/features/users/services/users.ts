import { api } from '@/utils/axios';
import { usersUrl } from '@/utils/url';
import { User } from '@/types/users';

const usersQueryKeys = {
  users: 'users',
  usersList: () => usersQueryKeys.users + '/list',
};
const getUsersService = () => api.get<User[]>(usersUrl);

const getUserService = (userName: string) => api.get<User>(userName);

export { getUsersService, getUserService, usersQueryKeys };
