import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navigation/Navbar';
import { Footer } from '@/components/Footer';

type LayoutProps = {
  children: ReactNode;
};

export default function SearchLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Meet App</title>
        <meta name="description" content="Application for meeting people with similar interests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{ backgroundColor: '#F3F4F6' }}
        className="relative flex min-h-screen w-full flex-col bg-zinc-700 xl:container"
      >
        <Navbar />

        <div className="mt-5">{children}</div>

        <Footer />
      </main>
    </div>
  );
}
