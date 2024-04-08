import { api } from '@/utils/axios';
import { addPhotoUrl, likesUrl, setMainPhotoUrl, usersUrl } from '@/utils/url';
import { Photo, User } from '@/features/users/types';
import { PaginationParams } from '@/components/Pagination/types';
import { LikedUsersDTO, SearchFriendsDTO, UpdateUserDTO } from './dtos';
import { mapDTOToURLEntry } from '@/utils/parsers';

const usersQueryKeys = {
  users: 'users',
  updatePhoto: () => usersQueryKeys.users + '/add-photo',
  setMainPhoto: () => usersQueryKeys.users + '/set-main-photo',
  updateUser: () => usersQueryKeys.users + '/update',
  usersList: () => usersQueryKeys.users + '/list',
  likedUsers: 'likedUsers',
};
const getUsers = () => api.get<User[]>(usersUrl);

const getFilteredUsers = (fetchDto: SearchFriendsDTO) => {
  const newParams = mapDTOToURLEntry(fetchDto);
  return api.get<User[]>(`${usersUrl}?${newParams.toString()}`);
};

const getUser = (username: string) => api.get<User>(`users/${username}`);

const getLikedUsersWithPagination = ({
  pageNumber = 1,
  pageSize = 8,
  userId,
  predicate = 'liked',
}: PaginationParams & Partial<LikedUsersDTO>) => {
  const newParams = mapDTOToURLEntry({ pageNumber, pageSize, userId: userId ?? '', predicate });
  return api.get<User[]>(`${likesUrl}?${newParams.toString()}`);
};

const getLikedUsers = ({ userId, predicate = 'liked' }: Partial<LikedUsersDTO>) => {
  const newParams = mapDTOToURLEntry({ userId: userId ?? '', predicate });
  return api.get<User[]>(`${likesUrl}?${newParams.toString()}`);
};

const updateUser = (user: UpdateUserDTO) => api.put<User>(`${usersUrl}`, user);

const addPhoto = (photo: File) => {
  const formData = new FormData();
  formData.append('file', photo);
  return api.post<Photo>(`${usersUrl}${addPhotoUrl}`, formData);
};

const setMainPhoto = (photoId: number) => {
  return api.put<Photo>(`${usersUrl}${setMainPhotoUrl(photoId)}`);
};

export {
  getUsers,
  getUser,
  setMainPhoto,
  getFilteredUsers,
  getLikedUsers,
  getLikedUsersWithPagination,
  addPhoto,
  updateUser,
  usersQueryKeys,
};
