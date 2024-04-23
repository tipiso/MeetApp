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
import { likeUser } from '@/services/likes';
import { alert } from '@/components/Alert/Alert';

type BoxItemProps = {
  user: User;
  onUserClick: () => void;
  onBtnClick: (user: User) => void;
};

function InviteBoxItem({ onUserClick, onBtnClick, user }: BoxItemProps) {
  return (
    <li>
      <div className="flex items-center px-4 pb-2">
        <Avatar imgUrl={user.photoUrl} name={user.knownAs} minWidth={60} width={60} height={60} />
        <div className="ml-2 flex min-w-0 flex-grow justify-between">
          <div onClick={onUserClick} className="flex items-center justify-between hover:underline">
            <span>{user.knownAs}</span>
          </div>
          <div className="min-w-0 max-w-full truncate text-sm">
            <Button onClick={() => onBtnClick(user)} btnType={ColorTypeEnum.PRIMARY} type="button">
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
  const updateFriends = useStore((state) => state.updateFriends);
  const router = useRouter();

  useEffect(() => {
    getUsers({ predicate: 'invites' });
  }, []);

  const newInvites = data?.filter((u) => !friends.find((f) => f.id === u.id));

  const handleBtnClick = async (user: User) => {
    try {
      await likeUser(user.userName);
      alert('User invite accepted!', ColorTypeEnum.SUCCESS);
      updateFriends(user);
    } catch {
      alert('Something went wrong, please try again.', ColorTypeEnum.DANGER);
    }
  };

  if (!isMutating && !newInvites?.length) {
    return (
      <div className="dropdown-content menu rounded-box z-10 mt-4 h-96 w-80 bg-base-100 pt-16 text-center shadow">
        You don't have any new invites.
      </div>
    );
  }

  return (
    <ul className="dropdown-content menu rounded-box z-10 mt-4 h-96 w-80 flex-nowrap overflow-auto bg-base-100 px-0 py-0 shadow">
      {isMutating && <Loader size={LoaderSizes.lg} />}
      {!isMutating && newInvites && newInvites.length > 0 && (
        <>
          <h2 className="p-4 text-base font-bold">Pending friend requests:</h2>
          {newInvites.map((u) => (
            <InviteBoxItem
              user={u}
              onUserClick={() => router.push(`${usersUrl}/${u.userName}/profile`)}
              onBtnClick={handleBtnClick}
            />
          ))}
        </>
      )}
    </ul>
  );
}
