import { ReactElement } from 'react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import * as z from 'zod';

import BlankCenteredLayout from '@/components/Layouts/BlankCenteredLayout';
import Button, { BtnType } from '@/components/Button';
import Label from '@/components/Forms/Label';
import Input from '@/components/Forms/Input';
import { routes } from '@/utils/routes';
import Router from 'next/router';
import Link from 'next/link';

const defaultValues = {
  username: '',
  password: '',
};

const schema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const methods = useForm({ defaultValues, resolver: zodResolver(schema) });

  const handleSubmit = async ({ username, password }: { username: string; password: string }) => {
    const response = await signIn('credentials', {
      username,
      password,
      callbackUrl: routes.home,
      redirect: false,
    });

    if (response?.ok) Router.push(routes.home);

    if (response?.status === 401) {
      methods.setError('root.serverError', { type: 'unauthorized' });
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

        <div className="relative mb-3">
          <Label text="Password" htmlFor="password" />
          <Input placeholder="Password" name="password" type="password" />
        </div>
        <div className="mb-3">
          <Link className="text-blue-600 underline text-sm" href={routes.register}>
            Don't have an account? Register here.
          </Link>
        </div>

        {methods.formState.errors.root && <div className="text-red-600">Invalid username or password</div>}

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
