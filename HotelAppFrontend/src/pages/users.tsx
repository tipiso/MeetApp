import { ReactElement, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import Layout from '@/components/layouts/Layout';
import axios from 'axios';
import { usersUrl } from '@/utils/url';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const session = useSession();

  const getUsers = async () => {
    const { data } = await axios.get(usersUrl, {
      headers: {
        Authorization: `Bearer ${session.data?.accessToken}`,
      },
    });
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <ul>{users && users.length && users.map((user) => <li>{user.userName}</li>)}</ul>
    </>
  );
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

UsersPage.secured = true;
export default UsersPage;
