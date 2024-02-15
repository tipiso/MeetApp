import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navigation/Navbar';
import { Footer } from '@/components/Footer';
import MainLayout from './MainLayout';

type LayoutProps = {
  children: ReactNode;
};

export default function SearchLayout({ children }: LayoutProps) {
  return (
    <main className="relative flex min-h-[calc(100dvh-64px)] w-full flex-col bg-gray-100 xl:container">
      <div className="mt-5 pb-5">{children}</div>
    </main>
  );
}
