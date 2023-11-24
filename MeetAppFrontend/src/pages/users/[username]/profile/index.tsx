import { ReactElement } from 'react';
import Layout from '@/components/Layouts/Layout';

const ProfilePage = () => {
  return <div>Matches 123</div>;
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

ProfilePage.secured = true;

export default ProfilePage;