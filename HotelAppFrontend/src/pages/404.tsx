import { ReactElement } from 'react';
import { router } from 'next/client';

import BlankCenteredLayout from '@/components/Layouts/BlankCenteredLayout';
import Button, { BtnType } from '@/components/Button';

const NotFoundPage = () => {
  return (
    <div>
      <h1>Whooops!</h1>
      <p className="mb-4">404 error, no such page found...</p>
      <Button
        btnType={BtnType.Primary}
        onClick={() => {
          router.push('/');
        }}
      >
        Return to Home
      </Button>
    </div>
  );
};

NotFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <BlankCenteredLayout>{page}</BlankCenteredLayout>;
};
export default NotFoundPage;
