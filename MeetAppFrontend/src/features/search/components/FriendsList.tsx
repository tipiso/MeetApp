import { useLikedUsers } from '@/features/search/hooks';
import Loader, { LoaderSizes } from '@/components/Loader';

const FriendsList = () => {
  const { data, isLoading } = useLikedUsers();
  console.log(data, isLoading);
  if (isLoading) return <Loader size={LoaderSizes.lg} />;
  if (!data) return <div className="px-10">You don't have any friends yet!</div>;

  return (
    <section className="px-10">
      <h1 className="text-2xl font-bold">
        Friend list <span>({data.length})</span>
      </h1>
      <div>
        {data.map((u) => (
          <div>{u.knownAs}</div>
        ))}
      </div>
    </section>
  );
};

export default FriendsList;
