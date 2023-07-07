import { ReactElement } from 'react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormSubmit } from '@radix-ui/react-form';

import BlankCenteredLayout from '@/components/Layouts/BlankCenteredLayout';
import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import { routes } from '@/routes';
import Link from 'next/link';
import { login } from '@/utils/auth';
import { ColorTypeEnum } from '@/utils/constants';
import Layout from '@/components/Layouts/Layout';

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
    <div className="flex items-center pl-12">
      <section className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold pb-[70px]">Log in</h1>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(handleSubmit)} className="d-flex flex-col w-96">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <div className="relative mb-6">
              <Input placeholder="Username" name="username" type="text" label="Username" />
            </div>

            <div className="relative mb-3">
              <Input placeholder="Password" name="password" type="password" label="Username" />
            </div>

            {methods.formState.errors.root && <div className="text-red-600">Invalid username or password</div>}

            <div className="text-center w-full pt-[50px]">
              <FormSubmit asChild>
                <Button className="w-1/2" type="submit" btnType={ColorTypeEnum.PRIMARY}>
                  Sign in
                </Button>
              </FormSubmit>
            </div>

            <div className="flex flex-col w-full pt-[50px]">
              <div className="divider after:bg-gray50 before:bg-gray50"></div>
            </div>

            <div className="mb-3">
              <Link className="text-blue-600 text-xs font-light" href={routes.register}>
                Don't have an account? <span className="underline">Sign up.</span>
              </Link>
            </div>
          </Form>
        </FormProvider>
      </section>
    </div>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
