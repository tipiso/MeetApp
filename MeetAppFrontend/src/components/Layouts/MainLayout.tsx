import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navigation/Navbar';
import { Footer } from '@/components/Footer';

type LayoutProps = {
  children: ReactNode;
  hideRoutes?: boolean;
};

export default function MainLayout({ children, hideRoutes }: LayoutProps) {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Meet App</title>
        <meta name="description" content="Application for meeting people with similar interests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar hideRoutes={hideRoutes} />
      {children}
      <Footer />
    </div>
  );
}
