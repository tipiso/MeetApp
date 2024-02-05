import React from 'react';
import { useLikedUsers } from '@/features/users/hooks';

export default function NavbarInvitesBox() {
  const { data, isLoading } = useLikedUsers();

  return (
    <ul className="dropdown-content menu rounded-box z-10 mt-4 h-96 w-80 flex-nowrap overflow-auto bg-base-100 px-0 py-0 shadow"></ul>
  );
}
