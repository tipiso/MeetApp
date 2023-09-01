import { ReactNode } from 'react';
import Image from 'next/image';

import { User } from '@/features/users/types';

type Props = {
  user: User;
  imgWidth: number;
  imgHeight: number;
  imgAction?: ReactNode;
};

const CarouselSuggestionImg = ({ user, imgWidth, imgHeight, imgAction }: Props) => {
  const prepareInfoString = (user: User) => {
    const genderFirstLetter = user.gender.slice(0, 1).toUpperCase();
    return `${genderFirstLetter + user.gender.slice(1)}, ${user.age}yo, ${user.city}`;
  };

  return (
    <div className="relative rounded-lg px-4">
      <div className="rounded-lg bg-gradient-to-t from-black">
        <Image
          height={imgHeight}
          width={imgWidth}
          className="relative -z-10 w-full rounded-lg pb-12"
          src={user.photoUrl}
          alt={`main img of user ${user.userName}`}
        />
      </div>
      <div className="absolute bottom-10 left-4 flex flex-col px-4 pb-4">
        <span className="text-lg font-bold text-white">{user.knownAs}</span>
        <span className="text-base text-white">{prepareInfoString(user)}</span>
      </div>

      {imgAction && <div className="absolute bottom-0 left-4 right-4">{imgAction}</div>}
    </div>
  );
};

export default CarouselSuggestionImg;
