import useStore from '@/store/store';
import { SignOutParams, signOut } from 'next-auth/react';

export default function logOut(opts: SignOutParams) {
  const resetStore = useStore.getState().reset;
  resetStore();
  signOut(opts);
}
