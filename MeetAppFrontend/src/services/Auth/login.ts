import { signIn } from 'next-auth/react';
import Router from 'next/router';

import { routes } from '@/utils/routes';

type loginProps = {
  username: string;
  password: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  redirectToUser?: boolean;
};

export const login = async ({ username, password, onSuccess, onError, redirectToUser }: loginProps) => {
  try {
    const redirectUrl = redirectToUser ? routes.currentUserProfile : routes.home;
    const response = await signIn('credentials', {
      username,
      password,
      callbackUrl: redirectUrl,
      redirect: false,
    });

    if (response?.ok) {
      onSuccess?.();
      Router.push(redirectUrl);
    } else throw response;
  } catch (error) {
    onError?.(error);
  }
};
