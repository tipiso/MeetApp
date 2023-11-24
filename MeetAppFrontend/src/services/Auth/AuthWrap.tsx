import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { routes } from '@/utils/routes';
import { useGetUser } from '@/features/users/hooks';

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

  if(userQuery.error) signOut({callbackUrl: routes.signin});

  if (status === 'loading' || userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
