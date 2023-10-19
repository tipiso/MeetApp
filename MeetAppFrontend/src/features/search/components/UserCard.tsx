import { ReactNode, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';

import { User } from '@/features/users/types';
import { useLikeUser } from '@/features/search/hooks';
import { alert } from '@/components/Alert/Alert';
import { ColorTypeEnum } from '@/utils/constants';
import Button from '@/components/Button';

type Props = {
  user: User;
  imgWidth: number;
  imgHeight: number;
  imgAction?: ReactNode;
  userInfo?: ReactNode;
  className?: string;
};

const UserCard = ({ user, userInfo, imgWidth, imgHeight, imgAction, className }: Props) => {
  const { isMutating, trigger } = useLikeUser();
  const [userLiked, setUserLiked] = useState(false);

  const likeUser = async (user: { id: number; name: string }) => {
    const res = await trigger(user.name);
    if (res && res.status === 200) {
      setUserLiked(true);
      alert('User invited to friends!', ColorTypeEnum.SUCCESS);
    }
  };

  return (
    <div className={cn('relative max-w-lg rounded-lg', className)}>
      <div className="relative  rounded-lg">
        <Image
          height={imgHeight}
          width={imgWidth}
          className="relative w-full rounded-lg pb-12"
          src={user.photoUrl}
          alt={`main img of user ${user.userName}`}
        />
        <div className="absolute top-0 h-full w-full rounded-lg bg-gradient-to-t from-black"></div>

        {userInfo && <div className="absolute bottom-10 flex w-full flex-col px-4 pb-4">{userInfo}</div>}

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
      </div>
    </div>
  );
};

export default UserCard;
