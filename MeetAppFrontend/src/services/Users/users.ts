import { api } from '@/utils/axios';
import { usersUrl } from '@/utils/url';
import { User } from '@/features/users/types';

const usersQueryKeys = {
  users: 'users',
  usersList: () => usersQueryKeys.users + '/list',
};
const getUsersService = () => api.get<User[]>(usersUrl);

const getFilteredUsersService = ({ searchString }: { searchString: string }) =>
  api.get<User[]>(`${usersQueryKeys.users}?searchString=${searchString}`);

const getUserService = (username: string) => api.get<User>(`${usersQueryKeys.users}/${username}`);

export { getUsersService, getUserService, getFilteredUsersService, usersQueryKeys };
