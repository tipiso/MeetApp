import { useGetUser } from '@/features/users/hooks';
import logOut from '@/services/Auth/logout';
import useStore from '@/store/store';
import { getUsernameFromSession } from '@/utils/helpers';
import { routes } from '@/utils/routes';
import router from 'next/router';
import React, { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const username = getUsernameFromSession();
  //initial user call to fill cache store
  const userQuery = useGetUser(username);
  const isFirstLogin = !userQuery.data?.photoUrl;

  useEffect(() => {
    if (username && !userQuery.isLoading) {
      const fillInfoRoute = `${routes.users}/${username}`;
      if (isFirstLogin && !router.pathname.includes(fillInfoRoute)) {
        router.push(fillInfoRoute);
      }
    }
  }, [userQuery.data?.photoUrl]);

  if (userQuery.error) logOut({ callbackUrl: routes.signin });

  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);

  if (userQuery.data && user.id === -1) {
    setUser(userQuery.data);
  }

  return <>{children}</>;
};

export default AppProvider;
