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
    <section className="pt-10">
      <h2 className="mb-3 text-2xl font-bold">Photos</h2>
      <Carousel
        slidesToShow={1}
        slidesToScroll={1}
        dots={true}
        infinite={true}
        dotsClass="slick-dots slick-thumb"
        customPaging={(i) => (
          <a>
            <Image src={photos[i].url} width={150} height={150} alt="user photo miniature" />
          </a>
        )}
        carouselData={photos}
      >
        {photos?.map((p) => (
          <Image src={p.url} width={250} height={250} alt="user photo" />
        ))}
      </Carousel>
    </section>
  );
}
