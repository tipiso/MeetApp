import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { routes } from '@/utils/routes';
import { useGetUser } from '@/features/users/hooks';
import useStore from '@/store/store';
import logOut from './logout';
import { useEffect } from 'react';

export default function AuthWrap({ children }: { children: JSX.Element }) {
  const router = useRouter();

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.signin);
    },
  });

  //initial user call to fill cache store
  const userQuery = useGetUser(data?.user.name);

  useEffect(() => {
    if (data && data.user.name && !userQuery.isLoading) {
      const fillInfoRoute = `${routes.users}/${data.user.name}`;
      if (!userQuery.data?.photoUrl && !router.pathname.includes(fillInfoRoute)) {
        router.push(fillInfoRoute);
      }
    }
  }, [userQuery.data?.photoUrl]);

  if (userQuery.error) logOut({ callbackUrl: routes.signin });

  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);

  if (status === 'loading' || userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (userQuery.data && user.id === -1) {
    setUser(userQuery.data);
  }

  return <>{children}</>;
}
