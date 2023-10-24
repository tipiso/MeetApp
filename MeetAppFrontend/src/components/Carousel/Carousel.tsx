import { ReactNode } from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import CarouselArrowLeft from '@/assets/images/CarouselArrowLeft.svg';
import CarouselArrowRight from '@/assets/images/CarouselArrowRight.svg';
import Image from 'next/image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carousel.module.css';

type Props = {
  children: ReactNode;
  carouselData: any & { id: string }[];
};

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <button
    {...props}
    className={'slick-prev slick-arrow' + (slideCount && currentSlide === 0 ? ' slick-disabled' : '')}
    aria-hidden="true"
    aria-disabled={!!(currentSlide && currentSlide === 0)}
    type="button"
  >
    <Image
      className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
      src={CarouselArrowLeft}
      height={50}
      width={50}
      alt="arrow left icon"
    />
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <button
    {...props}
    className={'slick-next slick-arrow' + (slideCount && currentSlide === slideCount - 1 ? ' slick-disabled' : '')}
    aria-hidden="true"
    aria-disabled={!!(slideCount && currentSlide === slideCount - 1)}
    type="button"
  >
    <Image
      className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
      src={CarouselArrowRight}
      height={50}
      width={50}
      alt="arrow right icon"
    />
  </button>
);

export default function Carousel({ children, carouselData }: Props) {
  const getMiddleItem = () => {
    if (carouselData) {
      return Math.floor(carouselData.length / 2);
    }
    return 0;
  };

  const getSlidesToShow = (slidesToShow: number) =>
    carouselData.length > slidesToShow ? slidesToShow : carouselData.length;

  return (
    <Slider
      className={styles.carousel}
      dots={false}
      slidesToScroll={1}
      slidesToShow={getSlidesToShow(5)}
      centerMode={true}
      initialSlide={getMiddleItem()}
      arrows={true}
      prevArrow={<SlickArrowLeft />}
      nextArrow={<SlickArrowRight />}
      responsive={[
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
    >
      {children}
    </Slider>
  );
}
