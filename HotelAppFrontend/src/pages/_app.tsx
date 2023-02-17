import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import '@/assets/styles/globals.css';
import '@/assets/styles/tw-output.css';
import AuthWrap from '@/components/AuthWrap';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  secured?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider>
      {getLayout(
        Component.secured ? (
          <AuthWrap>
            <Component {...pageProps} />
          </AuthWrap>
        ) : (
          <Component {...pageProps} />
        ),
      )}
    </SessionProvider>
  );
}
