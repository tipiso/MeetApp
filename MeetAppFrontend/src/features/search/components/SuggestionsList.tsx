import Loader, { LoaderSizes } from '@/components/Loader';
import Carousel from '@/components/Carousel/Carousel';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { User } from '@/features/users/types';
import UserCard from '@/features/search/components/UserCard';
import UserNameText from '@/features/users/components/UserNameText';
import HobbiesList from '@/features/search/components/HobbiesList';
import { useLikeUser } from '@/features/search/hooks';
import { useState } from 'react';
import { alert } from '@/components/Alert/Alert';

type Props = {
  data?: User[];
  isLoading: boolean;
};

export default function SuggestionsList({ data, isLoading }: Props) {
  const [likedUsers, setLikedUsers] = useState<{ id: number; name: string }[]>([]);
  const { isMutating, trigger } = useLikeUser();

  if (isLoading) return <Loader size={LoaderSizes.lg} />;
  if (!data) return <div>We have no suggestions for you yet.</div>;

  const likeUser = async (user: { id: number; name: string }) => {
    const res = await trigger(user.name);
    if (res && res.status === 200) {
      setLikedUsers([...likedUsers, user]);
    }
  };

  const prepareInfoString = (user: User) => {
    const genderFirstLetter = user.gender.slice(0, 1).toUpperCase();
    return `${genderFirstLetter + user.gender.slice(1)}, ${user.age}yo, ${user.city}`;
  };

  return (
    <>
      <h1 className="mb-4 px-10 text-2xl font-bold">Catch some suggestions from around Ortar!</h1>
      <Carousel carouselData={data}>
        {data?.map((u) => {
          return (
            <UserCard
              key={u.id}
              className="px-4"
              imgWidth={250}
              imgHeight={230}
              user={u}
              imgAction={
                <Button
                  disabled={isMutating}
                  onClick={() => likeUser({ id: u.id, name: u.userName })}
                  btnType={ColorTypeEnum.PRIMARY}
                  className="mt-auto w-full rounded-t-none"
                >
                  Invite to friends
                </Button>
              }
              userInfo={
                <>
                  <UserNameText name={u.knownAs} />
                  {!!u.hobbys.length && <HobbiesList hobbies={u.hobbys} />}
                  <span className="text-base text-white">{prepareInfoString(u)}</span>
                </>
              }
            />
          );
        })}
      </Carousel>
    </>
  );
}
