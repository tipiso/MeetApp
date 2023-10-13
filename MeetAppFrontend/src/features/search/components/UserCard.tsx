import { ReactNode } from 'react';
import cn from 'classnames';
import Image from 'next/image';

import { User } from '@/features/users/types';

type Props = {
  user: User;
  imgWidth: number;
  imgHeight: number;
  imgAction?: ReactNode;
  userInfo?: ReactNode;
  className?: string;
};

const UserCard = ({ user, userInfo, imgWidth, imgHeight, imgAction, className }: Props) => {
  return (
    <div className={cn('relative rounded-lg', className)}>
      <div className="relative rounded-lg">
        <Image
          height={imgHeight}
          width={imgWidth}
          className="relative w-full rounded-lg pb-12"
          src={user.photoUrl}
          alt={`main img of user ${user.userName}`}
        />
        <div className="absolute top-0 h-full w-full rounded-lg bg-gradient-to-t from-black"></div>

        {userInfo && <div className="absolute bottom-10 flex w-full flex-col px-4 pb-4">{userInfo}</div>}

        {imgAction && <div className="absolute bottom-0 left-0 right-0">{imgAction}</div>}
      </div>
    </div>
  );
};

export default UserCard;
