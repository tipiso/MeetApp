import Carousel from '@/components/Carousel/Carousel';
import Loader, { LoaderSizes } from '@/components/Loader';

import SuggestionCard from '@/features/search/components/SuggestionCard';
import { User } from '@/features/users/types';
import { getArrMiddleItem } from '@/utils/helpers';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import styles from './Carousel.module.css';

type Props = {
  data?: User[];
  isLoading: boolean;
};

export default function SuggestionsList({ data, isLoading }: Props) {
  const { data: sessionData } = useSession();

  // Users without photos are not ready to be displayed, possible it will be filtered out on BE.
  const filteredUsers = useMemo(() => (data ? data.filter((u) => !!u.photoUrl) : []), [data]);

  if (isLoading) return <Loader size={LoaderSizes.lg} />;
  if (!data) return <div>We have no suggestions for you yet.</div>;

  const getSlidesToShow = (slidesToShow: number) =>
    filteredUsers.length > slidesToShow ? slidesToShow : filteredUsers.length;

  return (
    <>
      <h1 className="mb-4 px-10 text-2xl font-bold">Catch some suggestions from around {sessionData?.user.name}!</h1>
      <Carousel
        className={styles.carousel}
        dots={false}
        slidesToScroll={1}
        slidesToShow={getSlidesToShow(5)}
        centerMode={true}
        initialSlide={getArrMiddleItem(filteredUsers)}
        responsiveSetup={[
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: getSlidesToShow(4),
              slidesToScroll: 1,
              infinite: true,
              arrows: true,
            },
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: getSlidesToShow(3),
              slidesToScroll: 1,
              infinite: true,
              arrows: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: getSlidesToShow(3),
              slidesToScroll: 1,
              infinite: true,
              arrows: true,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: getSlidesToShow(2),
              slidesToScroll: 1,
              infinite: true,
              arrows: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              arrows: true,
            },
          },
        ]}
        carouselData={filteredUsers}
      >
        {filteredUsers.map((u) => (
          <SuggestionCard key={u.id} className="max-w-[400px] px-4" imgWidth={250} imgHeight={230} user={u} />
        ))}
      </Carousel>
    </>
  );
}
