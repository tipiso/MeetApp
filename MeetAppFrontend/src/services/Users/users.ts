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
const getUsers = () => api.get<User[]>(usersUrl);

const getFilteredUsers= (fetchDto: SearchFriendsDTO) => {
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

const getUser = (username: string) => api.get<User>(`users/${username}`);

const getLikedUsers = ({ pageNumber = 1, pageSize = 8 }: PaginationParams) =>
  api.get<User[]>(`${likesUrl}?predicate=liked&pageNumber=${pageNumber}&pageSize=${pageSize}`);

const updateUser = (user: UpdateUserDTO) => api.put(`${usersUrl}`, user);

const addPhoto = (photo: File) => {
  const formData = new FormData();
  formData.append('file', photo);
  return api.post(`${usersUrl}${addPhotoUrl}`, formData);
};

export {
  getUsers,
  getUser,
  getFilteredUsers,
  getLikedUsers,
  addPhoto,
  updateUser,
  usersQueryKeys,
};
