import { api } from '@/utils/axios';
import { likesUrl } from '@/utils/url';

const likesQueryKeys = {
  likes: 'likes',
};

const likeUser = (likedUsername: string) => api.post(`${likesUrl}/${likedUsername}`);

export { likesQueryKeys, likeUser };
