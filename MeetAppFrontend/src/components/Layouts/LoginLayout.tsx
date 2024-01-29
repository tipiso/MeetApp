import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navigation/Navbar';
import { Footer } from '@/components/Footer';

type LayoutProps = {
  children: ReactNode;
};

export default function LoginLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Meet App</title>
        <meta name="description" content="Application for meeting people with similar interests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar hideRoutes />
      <main className="relative flex min-h-[calc(100dvh-64px)] w-full flex-col xl:container">
        <div className="absolute left-0 z-0 h-[782px] w-full max-w-[1440px] overflow-hidden bg-grayBg bg-cover bg-no-repeat" />
        <div className="z-10 flex flex-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
