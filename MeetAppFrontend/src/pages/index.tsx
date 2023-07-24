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
          <h1 className="text-4xl font-bold">Meet people in your area</h1>
          <p className="pt-[60px] text-2xl leading-snug">
            Meet people who share the same passions as you. Who knows? Maybe you'll create amazing insights together.
          </p>

          <Button href={routes.register} className="mt-7 self-start" btnType={ColorTypeEnum.PRIMARY}>
            Create account and check it!
          </Button>
        </div>
        <div className="relative flex w-1/2 flex-col">
          <div className="absolute top-0 h-full w-full bg-headerGirl bg-no-repeat"></div>
        </div>
      </section>
    </div>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
