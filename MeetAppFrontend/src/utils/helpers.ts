import jwtDecode from 'jwt-decode';
import { DecodedToken } from '@/services/Auth/types';
import { Option } from '@/components/Forms/MultiSelect';
import { useSession } from 'next-auth/react';
import { Cache } from 'swr';

export const transformErrorsToStringArr = (errors: Record<string, string[]>) =>
  Object.values(errors).flatMap((errorArr) => errorArr);

export const isGivenUsernameCurrentUser = (username?: string, token?: string) => {
  if (username && token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.unique_name === username;
  }
  return false;
};

export const createUrlFromImg = (file?: string | File) => {
  if (file && typeof file != 'string') {
    return URL.createObjectURL(file);
  } else {
    return file;
  }
};

export const getValuesFromSelectOptions = (options?: Option[]) => (options ? options.map((h) => h.value) : []);

export const getUsernameFromSession = () => {
  const session = useSession();
  if (session && session.data) return session.data.user.name;
  return '';
};

export const getDataFromSWRCache = (cache: Cache, queryKey: string) => {
  console.log(cache, cache.get(queryKey));
  const cacheRecord = cache.get(queryKey);
  if (!!cacheRecord && !cacheRecord.isLoading && cacheRecord.data) return cacheRecord.data.data;
  return undefined;
};
