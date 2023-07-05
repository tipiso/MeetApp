import { ReactElement } from 'react';
import Layout from '@/components/Layouts/Layout';
import Button from '@/components/Button';

export default function HomePage() {
  return (
    <div className="relative pl-12">
      <div className="w-full bg-no-repeat  h-[782px] max-w-[1440px] -z-10 absolute -top-[180px] left-0 bg-grayBg bg-cover" />
      <section className="w-full flex">
        <div className="w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Meet people in your area</h1>
          <p className="text-xl pt-[60px]">
            Meet people who share the same passions as you. Who knows? Maybe you'll create amazing insights together.
          </p>
          <Button className="mt-10 self-start">Create account and check it!</Button>
        </div>
        <div className="relative w-1/2 h-[720px]">
          <div className="bg-headerGirl h-full w-full absolute top-0 bg-no-repeat"></div>
          <div className="bg-blueHeaderFigure h-full absolute w-full top-0 -z-10 bg-no-repeat"></div>
          <div className="bg-pinkHeaderFigure h-[280px] absolute"></div>
        </div>
      </section>
    </div>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
