import Axios from 'axios';
import { API_URL } from '@/utils/constants';
import * as process from 'process';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

const api = Axios.create({
  baseURL: `${API_URL}`,
});

api.interceptors.request.use(async (request) => {
  const session: Session | null = await getSession();

  if (session && request.headers) {
    // @ts-ignore
    request.headers.Authorization = `Bearer ${session?.accessToken}`;
  }
  return request;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (process.env.NODE_ENV === 'development') console.error('Response API ERROR', error);
    return Promise.reject(error);
  },
);

export { api };
