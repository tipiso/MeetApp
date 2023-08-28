import { ReactNode, useEffect, useState } from 'react';
import Slider from 'react-slick';
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

export default function Carousel({ children, carouselData }: Props) {
  const getMiddleItem = () => {
    if (carouselData) {
      return Math.floor(carouselData.length / 2);
    }
    return 0;
  };

  return (
    <Slider
      className={styles.carousel}
      dots={false}
      slidesToScroll={1}
      slidesToShow={5}
      initialSlide={getMiddleItem()}
      arrows={true}
      prevArrow={
        <div>
          <Image
            className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
            src={CarouselArrowLeft}
            height={50}
            width={50}
            alt="arrow left icon"
          />
        </div>
      }
      nextArrow={
        <Image
          className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
          src={CarouselArrowRight}
          height={50}
          width={50}
          alt="arrow right icon"
        />
      }
      responsive={[
        {
          breakpoint: 1536,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
          },
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
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

Carousel.CarouselItem = function Item({ children }: { children: ReactNode }) {
  return <>{children}</>;
};
