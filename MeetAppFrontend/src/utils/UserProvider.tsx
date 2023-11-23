import { useGetUser } from '@/features/users/hooks';
import { User } from '@/features/users/types';
import { useSession } from 'next-auth/react';
import { ReactNode, createContext, useContext } from 'react';

const UserContext = createContext<User | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const user = useGetUser(session.data?.user.name);

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  return <UserContext.Provider value={user.data}>{children}</UserContext.Provider>;
}

function useUserProvider() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { useUserProvider, UserProvider };
