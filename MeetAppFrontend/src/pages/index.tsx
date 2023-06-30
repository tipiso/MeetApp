import { ReactElement } from 'react';
import { Inter } from '@next/font/google';
import Layout from '@/components/Layouts/Layout';
import { alert } from '@/components/Alert';
import { ColorTypeEnum } from '@/utils/constants';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  alert('test', ColorTypeEnum.DANGER);
  return <div>HOME</div>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
