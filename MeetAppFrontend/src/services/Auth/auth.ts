import { signIn } from 'next-auth/react';
import Router from 'next/router';

import { routes } from '@/utils/routes';

type loginProps = {
  username: string;
  password: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export const login = async ({ username, password, onSuccess, onError }: loginProps) => {
  try {
    const response = await signIn('credentials', {
      username,
      password,
      callbackUrl: routes.home,
      redirect: false,
    });

    if (response?.ok) {
      onSuccess?.();
      Router.push(routes.home);
    } else throw response;
  } catch (error) {
    onError?.(error);
  }
};
