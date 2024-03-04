import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { routes } from '@/utils/routes';
import AppProvider from '@/pages/AppProvider';
import Loader, { LoaderSizes } from '@/components/Loader';

export default function AuthWrap({ children }: { children: JSX.Element }) {
  const router = useRouter();

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.signin);
    },
  });

  if (status === 'loading')
    return (
      <div>
        <Loader size={LoaderSizes.lg} className="mx-auto" />
      </div>
    );

  return <AppProvider>{children}</AppProvider>;
}
