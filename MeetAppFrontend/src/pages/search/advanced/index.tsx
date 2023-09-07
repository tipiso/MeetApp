import { ReactElement } from 'react';

import Layout from '@/components/Layouts/SearchLayout';
import AdvancedSearchForm from '@/features/search/components/AdvancedSearchForm';

const AdvancedSearchPage = () => {
  return (
    <>
      <AdvancedSearchForm />
    </>
  );
};

AdvancedSearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

AdvancedSearchPage.secured = true;
export default AdvancedSearchPage;
