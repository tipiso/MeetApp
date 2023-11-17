import { api } from '@/utils/axios';
import { likesUrl, usersUrl } from '@/utils/url';
import { User } from '@/features/users/types';
import { PaginationParams } from '@/components/Pagination/types';
import { SearchFriendsDTO } from './dtos';

const usersQueryKeys = {
  users: 'users',
  usersList: () => usersQueryKeys.users + '/list',
  likedUsers: 'likedUsers',
};
const getUsersService = () => api.get<User[]>(usersUrl);

const getFilteredUsersService = (fetchDto: SearchFriendsDTO) => {
  const newParams = new URLSearchParams();
  Object.entries(fetchDto).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      if (val.length) {
        val.forEach((ai) => newParams.append(key, ai));
      }
      return;
    }
    if (!!val) newParams.set(key, val);
  });
  return api.get<User[]>(`${usersUrl}?${newParams.toString()}`);
};

const getUserService = (username: string) => api.get<User>(`users/${username}`);

const getLikedUsersService = ({ pageNumber = 1, pageSize = 8 }: PaginationParams) =>
  api.get<User[]>(`${likesUrl}?predicate=liked&pageNumber=${pageNumber}&pageSize=${pageSize}`);

const updateUserService = () => api.put(`${usersUrl}`);

export { getUsersService, getUserService, getFilteredUsersService, getLikedUsersService, usersQueryKeys };
