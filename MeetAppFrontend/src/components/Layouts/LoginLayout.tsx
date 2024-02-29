import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function LoginLayout({ children }: LayoutProps) {
  return (
    <main className="relative flex min-h-[calc(100dvh-64px)] w-full flex-col overflow-clip xl:container">
      <div className="absolute left-0 z-0 h-[782px] w-full max-w-[1440px] overflow-hidden bg-grayBg bg-cover bg-no-repeat" />
      <div className="z-10 flex flex-auto">{children}</div>
    </main>
  );
}
