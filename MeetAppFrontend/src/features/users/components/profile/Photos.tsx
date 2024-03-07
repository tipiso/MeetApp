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

  return (
    <section className="pt-10 pb-4">
      <h2 className="mb-3 text-2xl font-bold">Photos</h2>

      {photos && photos.length ? (
        <>
          <Carousel
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
              <Image
                key={p.id}
                src={p.url}
                width={0}
                height={0}
                sizes="100vw"
                alt="user photo"
                className="mx-auto block h-auto max-h-full w-full"
              />
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
        </>
      ) : (
        <div className="flex h-40 items-center justify-center text-lg">This user has no photos added</div>
      )}
    </section>
  );
}
