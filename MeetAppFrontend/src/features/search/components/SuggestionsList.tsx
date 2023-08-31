import Loader, { LoaderSizes } from '@/components/Loader';
import Carousel from '@/components/Carousel/Carousel';
import CarouselSuggestionImg from '@/features/search/components/CarouselSuggestionImg';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { User } from '@/features/users/types';

type Props = {
  data?: User[];
  isLoading: boolean;
};

export default function SuggestionsList({ data, isLoading }: Props) {
  if (isLoading) return <Loader size={LoaderSizes.lg} />;
  if (!data) return <div>We have no suggestions for you yet.</div>;

  return (
    <>
      <h1 className="mb-4 px-10 text-2xl">Catch some suggestions from around Ortar!</h1>
      <Carousel carouselData={data}>
        {data?.map((u) => (
          <Carousel.CarouselItem key={u.id}>
            <CarouselSuggestionImg user={u} />
          </Carousel.CarouselItem>
        ))}
      </Carousel>
      <div className="flex justify-center pt-4">
        <Button btnType={ColorTypeEnum.SECONDARY}>Check more</Button>
      </div>
    </>
  );
}
