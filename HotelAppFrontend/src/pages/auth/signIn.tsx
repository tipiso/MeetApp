import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { ReactElement } from 'react';
import BlankCenteredLayout from '@/components/layouts/BlankCenteredLayout';
import Button, { BtnType } from '@/components/Button';
import Label from '@/components/forms/Label';
import Input from '@/components/forms/Input';

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <form className="d-flex flex-col p-4 w-96" method="post" action="/api/auth/callback/credentials">
      <h1 className="text-2xl mb-4">Login</h1>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

      <div className="relative mb-6">
        <Label text="Username" htmlFor="username" />
        <Input placeholder="Username" name="username" type="text" />
      </div>

      <div className="relative mb-6">
        <Label text="Password" htmlFor="password" />
        <Input placeholder="Password" name="password" type="password" />
      </div>
      <div className="text-right">
        <Button type="submit" btnType={BtnType.Primary}>
          Sign in
        </Button>
      </div>
    </form>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <BlankCenteredLayout>{page}</BlankCenteredLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
