import { ReactElement } from 'react';
import Layout from '@/components/Layouts/Layout';
import useUserPage from '@/features/users/hooks/useUserPage';

const UserPage = () => {
  const { isLoading, user } = useUserPage();

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
