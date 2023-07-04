import { ReactElement } from 'react';
import Layout from '@/components/Layouts/Layout';

export default function HomePage() {
  return <div>HOME</div>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
