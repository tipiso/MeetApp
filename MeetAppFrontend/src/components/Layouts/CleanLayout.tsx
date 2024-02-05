import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navigation/Navbar';
import { Footer } from '@/components/Footer';

type LayoutProps = {
  children: ReactNode;
};

export default function CleanLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Meet App</title>
        <meta name="description" content="Application for meeting people with similar interests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="relative flex min-h-[calc(100dvh-64px)] w-full  flex-col xl:container">
        <div className="flex flex-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
