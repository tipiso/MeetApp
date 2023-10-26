import Carousel from '@/components/Carousel/Carousel';
import Loader, { LoaderSizes } from '@/components/Loader';

import SuggestionCard from '@/features/search/components/SuggestionCard';
import { User } from '@/features/users/types';
import { useSession } from 'next-auth/react';

type Props = {
  data?: User[];
  isLoading: boolean;
};

export default function SuggestionsList({ data, isLoading }: Props) {
  const { data: sessionData } = useSession();
  if (isLoading) return <Loader size={LoaderSizes.lg} />;
  if (!data) return <div>We have no suggestions for you yet.</div>;

  return (
    <>
      <h1 className="mb-4 px-10 text-2xl font-bold">Catch some suggestions from around {sessionData?.user.name}!</h1>
      <Carousel carouselData={data}>
        {data?.map((u) => {
          return <SuggestionCard key={u.id} className="max-w-[400px] px-4" imgWidth={250} imgHeight={230} user={u} />;
        })}
      </Carousel>
    </>
  );
}
