import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function CleanLayout({ children }: LayoutProps) {
  return (
    <main className="relative flex min-h-[calc(100dvh-64px)] w-full  flex-col xl:container">
      <div className="flex flex-auto">{children}</div>
    </main>
  );
}
