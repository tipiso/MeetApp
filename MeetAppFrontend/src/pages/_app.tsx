import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';

import { SessionProvider } from 'next-auth/react';
import '@/assets/styles/tw-output.css';
import '@/assets/styles/globals.css';
import AuthWrap from '@/utils/AuthWrap';
import SignalRPresenceProvider from '@/utils/SignalRPresenceProvider';
import { Alert } from '@/components/Alert';
import { Poppins } from '@next/font/google';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  secured?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const poppins = Poppins({
  weight: ['400', '300', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <SignalRPresenceProvider>
        <main className={poppins.className}>
          {getLayout(
            Component.secured ? (
              <AuthWrap>
                <Component {...pageProps} />
              </AuthWrap>
            ) : (
              <Component {...pageProps} />
            ),
          )}
          <Alert />
        </main>
      </SignalRPresenceProvider>
    </SessionProvider>
  );
}
