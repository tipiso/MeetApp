import { api } from '@/utils/axios';
import { Hobby } from '@/features/users/types';
import { hobbiesUrl } from '@/utils/url';

const hobbiesQueryKeys = {
  hobbies: 'hobbies',
};

const getHobbies = () => api.get<Hobby[]>(hobbiesUrl);

export { hobbiesQueryKeys, getHobbies };
