import { ReactElement } from 'react';

import Layout from '@/components/Layouts/Layout';
import { getUsers } from '@/features/users/hooks';
import UserCard from '@/features/users/components/UserCard';
import { User } from '@/features/users/types';

const UsersPage = () => {
  const { data } = getUsers();

  return (
    <>
      <ul className="flex flex-wrap justify-center">
        {data && data.map((user: User) => <UserCard key={user.id} user={user} />)}
      </ul>
    </>
  );
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

UsersPage.secured = true;

export default UsersPage;
