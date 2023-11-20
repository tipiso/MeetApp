import { api } from '@/utils/axios';
import { addPhotoUrl, likesUrl, usersUrl } from '@/utils/url';
import { User } from '@/features/users/types';
import { PaginationParams } from '@/components/Pagination/types';
import { SearchFriendsDTO, UpdateUserDTO } from './dtos';

const usersQueryKeys = {
  users: 'users',
  updatePhoto: () => usersQueryKeys.users + '/add-photo',
  updateUser: () => usersQueryKeys.users + '/update',
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

const updateUserService = (user: UpdateUserDTO) => api.put(`${usersUrl}`, user);

const addPhotoService = (photo: File) => {
  const formData = new FormData();
  formData.append('file', photo);
  return api.post(`${usersUrl}${addPhotoUrl}`, formData);
};

export {
  getUsersService,
  getUserService,
  getFilteredUsersService,
  getLikedUsersService,
  addPhotoService,
  updateUserService,
  usersQueryKeys,
};
