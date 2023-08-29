import Image from 'next/image';
import { User } from '@/features/users/types';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';

type Props = {
  user: User;
};

const CarouselSuggestionImg = ({ user }: Props) => {
  const prepareInfoString = (user: User) => {
    const genderFirstLetter = user.gender.slice(0, 1).toUpperCase();
    return `${genderFirstLetter + user.gender.slice(1)}, ${user.age}yo, ${user.city}`;
  };

  return (
    <div className="relative rounded-lg px-4">
      <div className="rounded-lg bg-gradient-to-t from-black">
        <Image
          height={230}
          width={250}
          className="relative -z-10 w-full rounded-lg pb-12"
          src={user.photoUrl}
          alt={`main img of user ${user.userName}`}
        />
      </div>
      <div className="absolute bottom-10 left-4 flex flex-col px-4 pb-4">
        <span className="text-lg font-bold text-white">{user.knownAs}</span>
        <span className="text-base text-white">{prepareInfoString(user)}</span>
      </div>
      <div className="absolute bottom-0 left-4 right-4">
        <Button btnType={ColorTypeEnum.PRIMARY} className="mt-auto w-full rounded-t-none">
          Invite to friends
        </Button>
      </div>
    </div>
  );
};

export default CarouselSuggestionImg;
