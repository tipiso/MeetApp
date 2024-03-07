import { useLikedUsersWithPagination } from '@/features/users/hooks';
import Loader, { LoaderSizes } from '@/components/Loader';
import Pagination from '@/components/Pagination/Pagination';
import { useEffect } from 'react';
import FriendCard from './FriendCard';
import useStore from '@/store/store';

const FriendsList = () => {
  const { data, isMutating, pagination, getPage } = useLikedUsersWithPagination();
  const setFriends = useStore((state) => state.setFriends);
  const friends = useStore((state) => state.friends);

  useEffect(() => {
    getPage({ pageNumber: 1, pageSize: 6, predicate: 'friends' });
  }, []);

  if (isMutating) return <Loader size={LoaderSizes.lg} />;

  if (data && data?.length != friends.length && !isMutating) {
    setFriends(data);
  }

  return (
    <section className="px-10">
      <h1 className="mb-4 text-2xl font-bold">
        Friend list <span>({data ? data.length : 0})</span>
      </h1>
      {!data || !data.length ? (
        <div className="flex justify-center p-10 text-2xl font-light">
          <p className="max-w-sm text-center">You don't actually have any added friends</p>
        </div>
      ) : (
        <div className="relative grid grid-cols-4 gap-x-6 gap-y-3 px-6 xl:grid-cols-6">
          {data.map((u) => (
            <FriendCard key={u.id} user={u} imgWidth={250} imgHeight={250} />
          ))}
        </div>
      )}
      {pagination.totalPage > 1 && <Pagination handlePageChange={getPage} {...pagination} />}
    </section>
  );
};

export default FriendsList;
