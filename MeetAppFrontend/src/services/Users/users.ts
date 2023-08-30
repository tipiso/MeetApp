import { api } from '@/utils/axios';
import { likesUrl, usersUrl } from '@/utils/url';
import { User } from '@/features/users/types';

const usersQueryKeys = {
  users: 'users',
  usersList: () => usersQueryKeys.users + '/list',
  likedUsers: 'likedUsers',
};
const getUsersService = () => api.get<User[]>(usersUrl);

const getFilteredUsersService = ({ searchString }: { searchString: string }) =>
  api.get<User[]>(`${usersQueryKeys.users}?searchString=${searchString}`);

const getUserService = (username: string) => api.get<User>(`${usersQueryKeys.users}/${username}`);

const getLikedUsersService = () => api.get<User[]>(`${likesUrl}?predicate=liked`);

export { getUsersService, getUserService, getFilteredUsersService, getLikedUsersService, usersQueryKeys };
