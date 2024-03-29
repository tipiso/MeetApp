import { ReactNode } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import DefaultAvatar from '@/assets/images/DefaultAvatar.png';

type Props = {
  className?: string;
  children?: ReactNode;
  imgWidth: number;
  imgHeight: number;
  username: string;
  photoUrl?: string;
};

const UserCard = ({ imgHeight, imgWidth, children, username, photoUrl, className }: Props) => {
  return (
    <div className={cn('relative rounded-lg', className)}>
      <div className="relative h-full rounded-lg">
        <Image
          height={imgHeight}
          width={imgWidth}
          className="relative aspect-square w-full rounded-lg object-cover pb-12"
          src={photoUrl ? photoUrl : DefaultAvatar}
          alt={`main img of user ${username}`}
          loading="lazy"
        />
        <div
          style={{
            backgroundPositionY: '-3rem',
            backgroundImage: 'linear-gradient(to bottom, transparent 60%, black)',
          }}
          className="bg-bottom-12 absolute top-0 h-full w-full rounded-lg bg-gradient-to-t from-black"
        ></div>

        {children}
      </div>
    </div>
  );
};

export default UserCard;
