import Carousel from '@/components/Carousel/Carousel';
import Image from 'next/image';
import { Photo } from '../../types';
import { useRef, useState } from 'react';
import Slider from 'react-slick';

type Props = {
  photos?: Photo[];
};

export default function Photos({ photos }: Props) {
  const carouselRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!photos) return null;

  return (
    <section className="pt-10 pb-4">
      <h2 className="mb-3 text-2xl font-bold">Photos</h2>
      <Carousel
        adaptiveHeight
        className="profile-carousel"
        ref={carouselRef}
        slidesToShow={1}
        slidesToScroll={1}
        speed={500}
        infinite={true}
        afterChange={(currentSlide) => {
          setCurrentSlide(currentSlide);
        }}
        carouselData={photos}
        responsiveSetup={[]}
      >
        {photos?.map((p) => (
          <div>
            <Image key={p.id} src={p.url} width={250} height={250} alt="user photo" className="mx-auto" />
          </div>
        ))}
      </Carousel>
      <ul className="slick-thumb relative mt-6 !grid grid-cols-4 gap-3 child:cursor-pointer">
        {photos.map((p, i) => (
          <li key={p.id} className={currentSlide === i ? 'slick-active' : ''}>
            <a
              onClick={() => {
                if (carouselRef.current) {
                  setCurrentSlide(i);
                  carouselRef.current.slickGoTo(i);
                }
              }}
            >
              <Image src={photos[i].url} width={150} height={150} alt="user photo miniature" className="w-full" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
