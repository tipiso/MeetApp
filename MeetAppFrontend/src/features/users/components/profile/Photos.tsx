import Carousel from '@/components/Carousel/Carousel';
import Image from 'next/image';
import { Photo } from '../../types';

type Props = {
  photos?: Photo[];
};

export default function Photos({ photos }: Props) {
  if (!photos) return null;
  console.log(photos);
  return (
    <section className="pt-10 pb-4">
      <h2 className="mb-3 text-2xl font-bold">Photos</h2>
      <Carousel
        slidesToShow={1}
        slidesToScroll={1}
        dots={true}
        infinite={true}
        dotsClass="!grid grid-cols-4 gap-x-3 w-full slick-thumb mt-6 child:cursor-pointer relative"
        customPaging={(i) => (
          <a>
            <Image src={photos[i].url} width={150} height={150} alt="user photo miniature" />
          </a>
        )}
        carouselData={photos}
        responsiveSetup={[]}
      >
        {photos?.map((p) => (
          <Image key={p.id} src={p.url} width={250} height={250} alt="user photo" />
        ))}
      </Carousel>
    </section>
  );
}
