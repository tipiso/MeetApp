import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { routes } from '@/utils/routes';
import AppProvider from '@/pages/AppProvider';

export default function AuthWrap({ children }: { children: JSX.Element }) {
  const router = useRouter();

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.signin);
    },
  });

  return <AppProvider>{children}</AppProvider>;
}
