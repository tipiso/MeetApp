import { useLikedUsers } from '@/features/search/hooks';
import Loader, { LoaderSizes } from '@/components/Loader';
import UserCard from '@/features/search/components/UserCard';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import UserNameText from '@/features/users/components/UserNameText';
import Pagination from '@/components/Pagination/Pagination';
import { useEffect } from 'react';

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
        <div className="relative grid grid-cols-4 gap-x-4 xl:grid-cols-6">
          {data.map((u) => (
            <UserCard
              key={u.id}
              className="pb-3"
              user={u}
              imgWidth={250}
              imgHeight={250}
              imgAction={
                <Button btnType={ColorTypeEnum.PRIMARY} className="mt-auto w-full rounded-t-none">
                  Chat
                </Button>
              }
              userInfo={<UserNameText name={u.knownAs} />}
            />
          ))}
        </div>
      )}
      {pagination.totalPage > 1 && <Pagination handlePageChange={getPage} {...pagination} />}
    </section>
  );
};

export default FriendsList;
