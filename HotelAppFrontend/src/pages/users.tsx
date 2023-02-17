import { ReactElement, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import Layout from '@/components/layouts/Layout';
import axios from 'axios';
import { usersUrl } from '@/utils/url';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const session = useSession();

  useEffect(() => {
    axios.get(usersUrl, { headers: { Authorization: `Bearer ${session.data?.accessToken}` } });
  }, []);

  return <>Users</>;
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

UsersPage.secured = true;
export default UsersPage;
