import { ReactNode } from 'react';

export default function BlankCenteredLayout({ children }: { children?: ReactNode }) {
  return <div className="flex flex-col items-center justify-center w-full min-h-screen">{children}</div>;
}
