import { useLikedUsers } from '@/features/search/hooks';
import Loader, { LoaderSizes } from '@/components/Loader';
import UserCard from '@/features/search/components/UserCard';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import UserNameText from '@/features/users/components/UserNameText';

const FriendsList = () => {
  const { data, isLoading } = useLikedUsers();
  console.log(data, isLoading);
  if (isLoading) return <Loader size={LoaderSizes.lg} />;
  if (!data) return <div className="px-10">You don't have any friends yet!</div>;

  return (
    <section className="px-10">
      <h1 className="mb-4 text-2xl font-bold">
        Friend list <span>({data.length})</span>
      </h1>
      <div className="relative flex gap-x-4">
        {data.map((u) => (
          <UserCard
            user={u}
            imgWidth={180}
            imgHeight={170}
            imgAction={
              <Button btnType={ColorTypeEnum.PRIMARY} className="mt-auto w-full rounded-t-none">
                Chat
              </Button>
            }
            userInfo={<UserNameText name={u.knownAs} />}
          />
        ))}
      </div>
    </section>
  );
};

export default FriendsList;
