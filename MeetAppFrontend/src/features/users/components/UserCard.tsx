import { User } from '@/features/users/types';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { OnlineUsersContext } from '@/services/SignalR/SignalRPresenceProvider';
import { userUrl } from '@/utils/url';

type Props = {
  user: User;
};
export default function UserCard({ user }: Props) {
  const onlineUsersContext = useContext(OnlineUsersContext);
  const isOnline = onlineUsersContext.includes(user.userName);

  return (
    <Link href={userUrl(user.userName)} className="card w-80 bg-base-100 shadow-xl">
      <figure>
        <Image src={user.photoUrl} alt={`User ${user.userName} Image`} width={200} height={300} />
      </figure>
      <div className="card-body">
        <h2 className="card-title mx-auto">
          {isOnline ? 'Online' : 'Offline'} {user.userName}
        </h2>
      </div>
    </Link>
  );
}
