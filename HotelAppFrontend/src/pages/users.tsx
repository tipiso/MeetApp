import { ReactElement } from 'react';

import Layout from '@/components/Layouts/Layout';
import { getUsers } from '@/features/users/hooks/useUsers';

const UsersPage = () => {
  const { data } = getUsers();

  return (
    <>
      <ul>{data && data.map((user: any) => <li>{user.userName}</li>)}</ul>
    </>
  );
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

UsersPage.secured = true;
export default UsersPage;
