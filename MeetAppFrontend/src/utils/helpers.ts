import jwtDecode from 'jwt-decode';
import { DecodedToken } from '@/services/Auth/types';

export const transformErrorsToStringArr = (errors: Record<string, string[]>) =>
  Object.values(errors).flatMap((errorArr) => errorArr);

export const isGivenUsernameCurrentUser = (username?: string, token?: string) => {
  if (username && token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.unique_name === username;
  }
  return false;
};
