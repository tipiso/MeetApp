import { ReactNode, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { createHubConnection, stopHubConnection } from '@/services/SignalR';
import { HubConnection } from '@microsoft/signalr';

type Props = {
  children: ReactNode;
};

export default function SignalRProvider({ children }: Props) {
  const signalHubRef = useRef<HubConnection>();
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') {
      signalHubRef.current = createHubConnection(session.data.accessToken);
    }

    if (session.status === 'unauthenticated' && signalHubRef.current) {
      stopHubConnection(signalHubRef.current);
    }

    return () => {
      if (signalHubRef.current) {
        stopHubConnection(signalHubRef.current);
      }
    };
  }, [session.status]);

  return <>{children}</>;
}
