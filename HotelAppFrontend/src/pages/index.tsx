import { Inter } from '@next/font/google';
import Layout from '@/components/layouts/Layout';
import { ReactElement } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  return <div>HOME</div>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
