import { api } from '@/utils/axios';
import { usersUrl } from '@/utils/url';
import { User } from '@/features/users/types';

const usersQueryKeys = {
  users: 'users',
  usersList: () => usersQueryKeys.users + '/list',
};
const getUsersService = () => api.get<User[]>(usersUrl);
const getUserService = (username: string) => api.get<User>(`${usersQueryKeys.users}/${username}`);

export { getUsersService, getUserService, usersQueryKeys };
