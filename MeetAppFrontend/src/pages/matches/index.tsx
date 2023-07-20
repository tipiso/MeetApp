import { ReactElement } from 'react';
import Layout from '@/components/Layouts/Layout';

const MatchesPage = () => {
  return <div>Matches 123</div>;
};

MatchesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

MatchesPage.secured = true;

export default MatchesPage;
