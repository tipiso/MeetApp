import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { FormEvent, ReactElement, useState } from 'react';
import { signIn } from 'next-auth/react';

import BlankCenteredLayout from '@/components/layouts/BlankCenteredLayout';
import Button, { BtnType } from '@/components/Button';
import Label from '@/components/forms/Label';
import Input from '@/components/forms/Input';
import { routes } from '@/utils/routes';
import { API_URL } from '@/utils/constants';

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [formError, setFormError] = useState<string | null>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const response = await signIn('credentials', {
      username: e.target['username'].value,
      password: e.target['password'].value,
      callbackUrl: routes.home,
    });
    console.log(response);
    if (response?.status === 401) {
      setFormError('Invalid username or password');
    }
  };
  return (
    <form onSubmit={handleSubmit} onChange={() => setFormError(null)} className="d-flex flex-col p-4 w-96">
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
      {formError && <div className="text-red-600">{formError}</div>}
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
