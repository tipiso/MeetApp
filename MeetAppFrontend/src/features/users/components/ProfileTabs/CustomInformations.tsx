import Loader, { LoaderSizes } from '@/components/Loader';
import { useLikedUsers } from '@/features/search/hooks';
import { useEffect } from 'react';
import { Hobby } from '../../types';
import HobbiesList from '@/features/search/components/HobbiesList';
import FriendCard from '@/features/search/components/FriendCard';

type Props = {
  hobbies?: Hobby[];
  introduction?: string;
};

export default function CustomInformations({ hobbies, introduction }: Props) {
  const { data, isMutating, pagination, getPage } = useLikedUsers();

  useEffect(() => {
    getPage(1);
  }, []);

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
        <h2 className="mb-3 text-2xl font-bold">Friends ({data?.length})</h2>
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
      </section>
    </>
  );
}
