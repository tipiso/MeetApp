import { ReactElement } from 'react';
import Layout from '@/components/Layouts/Layout';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { routes } from '@/utils/routes';

export default function HomePage() {
  return (
    <div className="relative flex w-full pl-12">
      <section className="flex w-full pt-28">
        <div className="flex w-1/2 flex-col pt-20">
          <h1 className="text-3xl font-bold">Meet people in your area</h1>
          <p className="pt-[60px] text-xl">
            Meet people who share the same passions as you. Who knows? Maybe you'll create amazing insights together.
          </p>

          <Button href={routes.register} className="mt-10 self-start" btnType={ColorTypeEnum.PRIMARY}>
            Create account and check it!
          </Button>
        </div>
        <div className="relative h-[720px] w-1/2">
          <div className="absolute top-0 h-full w-full bg-headerGirl bg-no-repeat"></div>
          <div className="absolute top-[125px] -z-[9] h-full w-full bg-blueHeaderFigure bg-no-repeat"></div>
          <div className="absolute -z-10 h-[280px]  w-full bg-pinkHeaderFigure bg-no-repeat"></div>
        </div>
      </section>
    </div>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
