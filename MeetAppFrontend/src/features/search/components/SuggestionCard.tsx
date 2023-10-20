import { ReactNode, useState } from 'react';

import { User } from '@/features/users/types';
import { useLikeUser } from '@/features/search/hooks';
import { alert } from '@/components/Alert/Alert';
import { ColorTypeEnum } from '@/utils/constants';
import Button from '@/components/Button';
import UserCard from '@/components/UserCard';
import UserNameText from '@/features/users/components/UserNameText';
import HobbiesList from '@/features/search/components/HobbiesList';

type Props = {
  user: User;
  imgWidth: number;
  imgHeight: number;
  imgAction?: ReactNode;
  userInfo?: ReactNode;
  className?: string;
};

const SuggestionCard = ({ user, imgWidth, imgHeight, className }: Props) => {
  const { isMutating, trigger } = useLikeUser();
  const [userLiked, setUserLiked] = useState(false);

  const likeUser = async (user: { id: number; name: string }) => {
    const res = await trigger(user.name);
    if (res && res.status === 200) {
      setUserLiked(true);
      alert('User invited to friends!', ColorTypeEnum.SUCCESS);
    }
  };

  const prepareInfoString = (user: User) => {
    const genderFirstLetter = user.gender.slice(0, 1).toUpperCase();
    return `${genderFirstLetter + user.gender.slice(1)}, ${user.age}yo, ${user.city}`;
  };

  return (
    <UserCard
      className={className}
      imgWidth={imgWidth}
      imgHeight={imgHeight}
      username={user.userName}
      photoUrl={user.photoUrl}
    >
      <div className="absolute bottom-10 flex w-full flex-col px-4 pb-4">
        <UserNameText name={user.knownAs} />
        {!!user.hobbys.length && <HobbiesList hobbies={user.hobbys} />}
        <span className="text-base text-white">{prepareInfoString(user)}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <Button
          disabled={isMutating || userLiked}
          onClick={() => likeUser({ id: user.id, name: user.userName })}
          btnType={ColorTypeEnum.PRIMARY}
          isLoading={isMutating}
          className="mt-auto w-full rounded-t-none"
        >
          Invite to friends
        </Button>
      </div>
    </UserCard>
  );
};

export default SuggestionCard;
