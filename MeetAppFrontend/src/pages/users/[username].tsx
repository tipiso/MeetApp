import { ReactElement } from 'react';
import Layout from '@/components/Layouts/Layout';
import { useRouter } from 'next/router';
import { getUser } from '@/features/users/hooks';

const UserPage = () => {
  const { query } = useRouter();
  const isUserDefined = 'username' in query;
  const { data: user, isLoading } = getUser(isUserDefined ? (query.username as string) : '');

  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <div>
      <span>{user.id}</span>
      <span>{user.userName}</span>
      <span>{user.age}</span>
    </div>
  );
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

UserPage.secured = true;
export default UserPage;
