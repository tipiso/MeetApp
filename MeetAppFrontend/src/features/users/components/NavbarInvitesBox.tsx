import React, { useEffect } from 'react';
import { useLikedUsers } from '@/features/users/hooks';
import useStore from '@/store/store';
import Loader, { LoaderSizes } from '@/components/Loader';
import Avatar from './Avatar';
import { useRouter } from 'next/router';
import { usersUrl } from '@/utils/url';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { User } from '../types';

type BoxItemProps = {
  user: User;
  onClick: () => void;
};

function InviteBoxItem({ onClick, user }: BoxItemProps) {
  return (
    <li onClick={onClick}>
      <div className="flex items-center px-4 pb-2">
        <Avatar imgUrl={user.photoUrl} name={user.knownAs} minWidth={60} width={60} height={60} />
        <div className="ml-2 flex min-w-0 flex-grow justify-between">
          <div className="flex items-center justify-between">
            <span>{user.knownAs}</span>
          </div>
          <div className="min-w-0 max-w-full truncate text-sm">
            <Button btnType={ColorTypeEnum.PRIMARY} type="button">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function NavbarInvitesBox() {
  const { data, isMutating, getUsers } = useLikedUsers();
  const friends = useStore((state) => state.friends);
  const router = useRouter();

  useEffect(() => {
    getUsers({ predicate: 'likedBy' });
  }, []);

  const newInvites = data?.filter((u) => !friends.find((f) => f.id === u.id));

  return (
    <ul className="dropdown-content menu rounded-box z-10 mt-4 h-96 w-80 flex-nowrap overflow-auto bg-base-100 px-0 py-0 shadow">
      {isMutating && <Loader size={LoaderSizes.lg} />}
      {!isMutating && newInvites && newInvites.length > 0 && (
        <>
          <h2 className="p-4 text-base font-bold">Pending friend requests:</h2>
          {newInvites.map((u) => (
            <InviteBoxItem user={u} onClick={() => router.push(`${usersUrl}/${u.userName}/profile`)} />
          ))}
        </>
      )}
      {!isMutating && !newInvites && (
        <li className="pointer-events-none flex h-full items-center px-4 pb-2 hover:cursor-default">
          <span>You don't have any new likes</span>
        </li>
      )}
    </ul>
  );
}
