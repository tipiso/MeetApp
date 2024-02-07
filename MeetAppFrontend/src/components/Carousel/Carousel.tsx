import { ReactNode } from 'react';
import Slider, { CustomArrowProps, ResponsiveObject, Settings } from 'react-slick';
import CarouselArrowLeft from '@/assets/images/LeftCarouselArrow.svg';
import CarouselArrowRight from '@/assets/images/RightCarouselArrow.svg';
import Image from 'next/image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
  children: ReactNode;
  carouselData: any & { id: string }[];
  responsiveSetup?: ResponsiveObject[];
} & Settings;

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <button
    {...props}
    className={
      'slick-prev slick-arrow rounded-[50%] !bg-gray-700' + (slideCount && currentSlide === 0 ? ' slick-disabled' : '')
    }
    aria-hidden="true"
    aria-disabled={!!(currentSlide && currentSlide === 0)}
    type="button"
  >
    <Image
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      src={CarouselArrowLeft}
      height={18}
      width={18}
      alt="arrow left icon"
    />
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <button
    {...props}
    className={
      'slick-next slick-arrow rounded-[50%] !bg-gray-700 before:content-none' +
      (slideCount && currentSlide === slideCount - 1 ? ' slick-disabled' : '')
    }
    aria-hidden="true"
    aria-disabled={!!(slideCount && currentSlide === slideCount - 1)}
    type="button"
  >
    <Image
      className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 cursor-pointer"
      src={CarouselArrowRight}
      height={18}
      width={18}
      alt="arrow right icon"
    />
  </button>
);

export default function Carousel({ children, responsiveSetup, carouselData, ...props }: Props) {
  return (
    <Slider
      arrows={true}
      prevArrow={<SlickArrowLeft />}
      nextArrow={<SlickArrowRight />}
      responsive={responsiveSetup ?? []}
      {...props}
    >
      {children}
    </Slider>
  );
}
