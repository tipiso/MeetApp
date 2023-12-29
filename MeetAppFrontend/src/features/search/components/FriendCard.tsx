import { ReactNode } from 'react';

import { User } from '@/features/users/types';
import { ColorTypeEnum, ProfilePageTabsKeys } from '@/utils/constants';
import Button from '@/components/Button';
import UserCard from '@/components/UserCard';
import UserNameText from '@/features/users/components/UserNameText';
import { useRouter } from 'next/router';
import { routes } from '@/utils/routes';

type Props = {
  user: User;
  imgWidth: number;
  imgHeight: number;
  imgAction?: ReactNode;
  userInfo?: ReactNode;
  className?: string;
};

const FriendCard = ({ user, className }: Props) => {
  const router = useRouter();

  const moveToChat = () => {
    router.push(routes.userProfile.replace(':username', user.userName ) + `?openTab=${ProfilePageTabsKeys.CHAT}`);
  };

  return (
    <UserCard className={className} imgWidth={250} imgHeight={250} username={user.userName} photoUrl={user.photoUrl}>
      <div className="absolute bottom-10 flex w-full flex-col px-4 pb-4">
        <UserNameText name={user.knownAs} />
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <Button
          type="button"
          onClick={moveToChat}
          btnType={ColorTypeEnum.PRIMARY}
          className="mt-auto w-full rounded-t-none"
        >
          Chat
        </Button>
      </div>
    </UserCard>
  );
};

export default FriendCard;
