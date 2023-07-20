import { ReactElement } from 'react';
import Layout from '@/components/Layouts/Layout';

const MessagesPage = () => {
  return <div>Messages 123</div>;
};

MessagesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

MessagesPage.secured = true;

export default MessagesPage;
