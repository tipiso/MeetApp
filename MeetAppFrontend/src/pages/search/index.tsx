import { ReactElement } from 'react';

import Layout from '@/components/Layouts/SearchLayout';
import SearchForm from '@/features/search/components/SearchForm';
import MainLayout from '@/components/Layouts/MainLayout';

const SearchPage = () => {
  return (
    <>
      <SearchForm />
    </>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

SearchPage.secured = true;

export default SearchPage;
