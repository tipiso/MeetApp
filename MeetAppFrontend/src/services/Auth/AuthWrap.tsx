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

  if (userQuery.error) logOut({ callbackUrl: routes.signin });

  const setUser = useStore((state) => state.setUser);

  if (status === 'loading' || userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const fillInfoRoute = `${routes.users}/${userQuery.data?.userName}`;
    if (!userQuery.data?.photoUrl && !router.pathname.includes(fillInfoRoute)) {
      router.push(fillInfoRoute);
    }
  }, [userQuery.data?.photoUrl]);

  if (userQuery.data) {
    setUser(userQuery.data);
  }

  return <>{children}</>;
}
