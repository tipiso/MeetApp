import { ReactElement } from 'react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormSubmit } from '@radix-ui/react-form';

import BlankCenteredLayout from '@/components/Layouts/BlankCenteredLayout';
import Button, { BtnType } from '@/components/Button';
import Input from '@/components/Forms/Input';
import { routes } from '@/routes';
import Link from 'next/link';
import { login } from '@/utils/auth';

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

  const handleSubmit = async ({ username, password }: z.infer<typeof schema>) => {
    await login({
      username,
      password,
      onError: (error) => {
        if (error.status === 401) methods.setError('root', { message: 'Invalid username or password' });
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods} onSubmit={methods.handleSubmit(handleSubmit)} className="d-flex flex-col p-4 w-96">
        <h1 className="text-2xl mb-4">Login</h1>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <div className="relative mb-6">
          <Input placeholder="Username" name="username" type="text" label="Username" />
        </div>

        <div className="relative mb-3">
          <Input placeholder="Password" name="password" type="password" label="Username" />
        </div>
        <div className="mb-3">
          <Link className="text-blue-600 underline text-sm" href={routes.register}>
            Don't have an account? Register here.
          </Link>
        </div>

        {methods.formState.errors.root && <div className="text-red-600">Invalid username or password</div>}

        <div className="text-right w-full">
          <FormSubmit asChild>
            <Button type="submit" btnType={BtnType.Primary}>
              Sign in
            </Button>
          </FormSubmit>
        </div>
      </Form>
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
