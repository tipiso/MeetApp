import { api } from '@/utils/axios';
import { likesUrl, usersUrl } from '@/utils/url';
import { User } from '@/features/users/types';
import { PaginationParams } from '@/components/Pagination/types';

const usersQueryKeys = {
  users: 'users',
  usersList: () => usersQueryKeys.users + '/list',
  likedUsers: 'likedUsers',
};
const getUsersService = () => api.get<User[]>(usersUrl);

const getFilteredUsersService = ({ searchString }: { searchString: string }) =>
  api.get<User[]>(`users?searchString=${searchString}`);

const getUserService = (username: string) => api.get<User>(`users/${username}`);

const getLikedUsersService = ({ pageNumber = 1, pageSize = 8 }: PaginationParams) =>
  api.get<User[]>(`${likesUrl}?predicate=liked&pageNumber=${pageNumber}&pageSize=${pageSize}`);

export { getUsersService, getUserService, getFilteredUsersService, getLikedUsersService, usersQueryKeys };
