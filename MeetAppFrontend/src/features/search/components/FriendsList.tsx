import { useLikedUsers } from '@/features/users/hooks';
import Loader, { LoaderSizes } from '@/components/Loader';
import Pagination from '@/components/Pagination/Pagination';
import { useEffect } from 'react';
import FriendCard from './FriendCard';

const FriendsList = () => {
  const { data, isMutating, pagination, getPage } = useLikedUsers();

  useEffect(() => {
    getPage(1);
  }, []);

  if (isMutating) return <Loader size={LoaderSizes.lg} />;

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
        <div className="relative grid grid-cols-4 gap-x-6 gap-y-3 xl:grid-cols-6">
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
