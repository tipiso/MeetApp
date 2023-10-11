import { api } from '@/utils/axios';
import { Hobby } from '@/features/users/types';
import { hobbiesUrl } from '@/utils/url';

const hobbiesQueryKeys = {
  hobbies: 'hobbies',
};

const getHobbiesService = () => api.get<Hobby[]>(hobbiesUrl);

export { hobbiesQueryKeys, getHobbiesService };
