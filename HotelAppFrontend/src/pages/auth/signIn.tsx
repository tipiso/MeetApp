import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { ReactElement, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import BlankCenteredLayout from '@/components/Layouts/BlankCenteredLayout';
import Button, { BtnType } from '@/components/Button';
import Label from '@/components/Forms/Label';
import Input from '@/components/Forms/Input';
import { routes } from '@/utils/routes';
import Router from 'next/router';

const defaultValues = {
  username: '',
  password: '',
};
export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [formError, setFormError] = useState<string | null>(null);
  const methods = useForm({ defaultValues });
  const handleSubmit = async ({ username, password }: { username: string; password: string }) => {
    console.log(username, password);
    const response = await signIn('credentials', {
      username,
      password,
      callbackUrl: routes.home,
      redirect: false,
    });

    if (response?.ok) Router.push(routes.home);
    if (response?.status === 401) {
      setFormError('Invalid username or password');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="d-flex flex-col p-4 w-96">
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
    </FormProvider>
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
