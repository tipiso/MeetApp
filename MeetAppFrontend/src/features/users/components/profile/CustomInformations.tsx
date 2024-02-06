import Loader, { LoaderSizes } from '@/components/Loader';
import { useLikedUsersWithPagination } from '@/features/users/hooks';
import { useEffect } from 'react';
import { Hobby } from '../../types';
import HobbiesList from '@/features/search/components/HobbiesList';
import FriendCard from '@/features/search/components/FriendCard';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';

type Props = {
  hobbies?: Hobby[];
  introduction?: string;
  userId?: number;
};

export default function CustomInformations({ hobbies, introduction, userId }: Props) {
  const { data, isMutating, getPage } = useLikedUsersWithPagination(userId);

  useEffect(() => {
    if (userId) getPage({ pageNumber: 1, pageSize: 6, userId, predicate: 'friends' });
  }, [userId]);
  console.log(data, userId);
  if (isMutating) return <Loader size={LoaderSizes.lg} />;

  return (
    <>
      <section className="pt-10">
        <h2 className="mb-3 text-2xl font-bold">Hobby</h2>
        <HobbiesList hobbies={hobbies ?? []} />
      </section>
      <section className="pt-10">
        <h2 className="mb-3 text-2xl font-bold">More information</h2>
        <p>{introduction ?? ''}</p>
      </section>
      <section className="pt-10">
        <h2 className="mb-3 text-2xl font-bold">Friends ({data ? data.length : 0})</h2>
        {!data || !data.length ? (
          <div className="flex justify-center p-10 text-2xl font-light">
            <p className="max-w-sm text-center">No friends added yet.</p>
          </div>
        ) : (
          <>
            <div className="relative grid grid-cols-4 gap-x-6 gap-y-3 xl:grid-cols-6">
              {data.map((u) => (
                <FriendCard key={u.id} user={u} imgWidth={250} imgHeight={250} />
              ))}
            </div>
            <div className="pt-6 text-right">
              <Button outline type="button" btnType={ColorTypeEnum.PRIMARY}>
                Check more
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  );
}
