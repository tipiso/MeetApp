import { ReactElement } from 'react';
import { Inter } from '@next/font/google';
import Layout from '@/components/Layouts/Layout';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  return <div>HOME</div>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
