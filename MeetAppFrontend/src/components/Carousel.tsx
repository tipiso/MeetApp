import { ReactNode, useEffect, useState } from 'react';
import Slider from 'react-slick';
import CarouselArrowLeft from '@/assets/images/CarouselArrowLeft.svg';
import CarouselArrowRight from '@/assets/images/CarouselArrowRight.svg';
import Image from 'next/image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
  children: ReactNode;
  carouselData: any & { id: string }[];
};

const settings = {
  slidesToShow: 4,
  slidesToScroll: 1,
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
      dots={false}
      slidesToScroll={1}
      slidesToShow={4}
      initialSlide={getMiddleItem()}
      arrows={true}
      prevArrow={
        <div>
          <Image
            className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
            src={CarouselArrowLeft}
            height={50}
            width={50}
            alt="arrow left icon"
          />
        </div>
      }
      nextArrow={
        <Image
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          src={CarouselArrowRight}
          height={50}
          width={50}
          alt="arrow right icon"
        />
      }
    >
      {children}
    </Slider>
  );
}

Carousel.CarouselItem = function Item({ children, id }: { children: ReactNode; id: string }) {
  return (
    <div id={id} className="carousel-item">
      {children}
    </div>
  );
};
