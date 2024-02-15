import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navigation/Navbar';
import Link from 'next/link';
import { routes as appRoutes } from '@/utils/routes';
import Image from 'next/image';
import Logo from '@/assets/images/Logo.svg';
import { Footer } from '@/components/Footer';
import MainLayout from './MainLayout';

type LayoutProps = {
  children: ReactNode;
};

export default function UserPageLayout({ children }: LayoutProps) {
  return (
    <main className="relative flex min-h-[calc(100dvh-64px)] w-full flex-col xl:container">
      <div className="flex flex-auto p-14">{children}</div>
    </main>
  );
}
