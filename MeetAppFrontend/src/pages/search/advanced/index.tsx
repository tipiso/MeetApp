import { ReactElement } from 'react';

import Layout from '@/components/Layouts/SearchLayout';
import AdvancedSearchForm from '@/features/search/components/AdvancedSearch/AdvancedSearchForm';
import MainLayout from '@/components/Layouts/MainLayout';

const AdvancedSearchPage = () => {
  return (
    <>
      <AdvancedSearchForm />
    </>
  );
};

AdvancedSearchPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

AdvancedSearchPage.secured = true;

export default AdvancedSearchPage;
