import { ReactNode } from 'react';
import cn from 'classnames';
import Image from 'next/image';

type Props = {
  className?: string;
  children?: ReactNode;
  imgWidth: number;
  imgHeight: number;
  username: string;
  photoUrl: string;
};

const UserCard = ({ imgHeight, imgWidth, children, username, photoUrl, className }: Props) => {
  return (
    <div className={cn('relative rounded-lg', className)}>
      <div className="relative h-full rounded-lg">
        <Image
          height={imgHeight}
          width={imgWidth}
          className="relative w-full rounded-lg pb-12"
          src={photoUrl}
          alt={`main img of user ${username}`}
          loading="lazy"
        />
        <div className="absolute top-0 h-full w-full rounded-lg bg-gradient-to-t from-black"></div>

        {children}
      </div>
    </div>
  );
};

export default UserCard;
