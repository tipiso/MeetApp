import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="relative flex min-h-[calc(100dvh-64px)] w-full  flex-col xl:container">
      <div className="h-[min(782px, 100vh)] absolute left-0 top-[4rem] z-0 w-full max-w-[1440px] bg-grayBg bg-cover bg-no-repeat" />
      <div className="mt-5 flex flex-auto">{children}</div>
    </main>
  );
}
