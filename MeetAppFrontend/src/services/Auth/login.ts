import { signIn } from 'next-auth/react';
import Router from 'next/router';

import { routes } from '@/utils/routes';

type loginProps = {
  username: string;
  password: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  redirectUrl?: string;
};

export const login = async ({ username, password, onSuccess, onError, redirectUrl }: loginProps) => {
  try {
    const redirect = redirectUrl ? redirectUrl : routes.home;
    const response = await signIn('credentials', {
      username,
      password,
      callbackUrl: redirect,
      redirect: false,
    });

    if (response?.ok) {
      onSuccess?.();
      Router.push(redirect);
    } else throw response;
  } catch (error) {
    onError?.(error);
  }
};
