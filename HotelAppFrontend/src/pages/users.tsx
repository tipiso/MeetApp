import { ReactElement } from 'react';
import Layout from '@/components/layouts/Layout';
import { useSession } from 'next-auth/react';

const UsersPage = () => {
  const session = useSession();
  console.log('FRONT SESSIOn', session);
  return <>Users</>;
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

UsersPage.secured = true;
export default UsersPage;
