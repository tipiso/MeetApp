import { ReactElement } from 'react';

import Layout from '@/components/Layouts/SearchLayout';
import SearchForm from '@/features/search/components/SearchForm';

const SearchPage = () => {
  return (
    <>
      <SearchForm />
    </>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

SearchPage.secured = true;

export default SearchPage;
