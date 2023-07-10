import { ReactElement } from 'react';
import Layout from '@/components/Layouts/Layout';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';

export default function HomePage() {
  return (
    <div className="flex relative pl-12">
      <section className="w-full flex pt-28">
        <div className="w-1/2 flex flex-col pt-20">
          <h1 className="text-3xl font-bold">Meet people in your area</h1>
          <p className="text-xl pt-[60px]">
            Meet people who share the same passions as you. Who knows? Maybe you'll create amazing insights together.
          </p>
          <Button className="mt-10 self-start" btnType={ColorTypeEnum.PRIMARY}>
            Create account and check it!
          </Button>
        </div>
        <div className="relative w-1/2 h-[720px]">
          <div className="bg-headerGirl h-full w-full absolute top-0 bg-no-repeat"></div>
          <div className="bg-blueHeaderFigure h-full absolute w-full top-[125px] -z-[9] bg-no-repeat"></div>
          <div className="bg-pinkHeaderFigure w-full h-[280px]  absolute bg-no-repeat -z-10"></div>
        </div>
      </section>
    </div>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
