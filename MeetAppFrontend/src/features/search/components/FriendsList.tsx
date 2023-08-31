import { useLikedUsers } from '@/features/search/hooks';

const FriendsList = () => {
  const { data, isLoading } = useLikedUsers();
  console.log(data, isLoading);
  return (
    <section>
      <h1>Friend list</h1>
    </section>
  );
};

export default FriendsList;
