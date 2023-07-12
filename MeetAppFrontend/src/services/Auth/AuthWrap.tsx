import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { routes } from '@/utils/routes';

export default function AuthWrap({ children }: { children: JSX.Element }) {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.signin);
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return children;
}
