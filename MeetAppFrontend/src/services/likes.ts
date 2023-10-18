import { api } from '@/utils/axios';
import { likesUrl } from '@/utils/url';

const likesQueryKeys = {
  likes: 'likes',
};

const likeUser = (likedUser: string) => api.post(likesUrl);

export { likesQueryKeys, likeUser };
