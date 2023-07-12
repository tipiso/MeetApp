import { ReactElement } from 'react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormSubmit } from '@radix-ui/react-form';

import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import { routes } from '@/utils/routes';
import Link from 'next/link';
import { login } from '@/services/Auth/auth';
import { ColorTypeEnum } from '@/utils/constants';
import LoginLayout from '@/components/Layouts/LoginLayout';

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
    <>
      <section className="flex flex-col justify-center pl-12">
        <h1 className="pb-[70px] text-3xl font-bold">Log in</h1>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(handleSubmit)} className="d-flex w-96 flex-col">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <div className="relative mb-6">
              <Input placeholder="Username" name="username" type="text" label="Username" />
            </div>

            <div className="relative mb-3">
              <Input placeholder="Password" name="password" type="password" label="Password" />
            </div>

            {methods.formState.errors.root && <div className="text-red-600">Invalid username or password</div>}

            <div className="w-full pt-[50px] text-center">
              <FormSubmit asChild>
                <Button className="w-1/2" type="submit" btnType={ColorTypeEnum.PRIMARY}>
                  Sign in
                </Button>
              </FormSubmit>
            </div>

            <div className="flex w-full flex-col pt-[50px]">
              <div className="divider before:h-[1px] before:bg-gray50 after:h-[1px] after:bg-gray50"></div>
            </div>

            <div className="mb-3">
              <Link className="text-blue-600 text-xs font-light" href={routes.register}>
                Don't have an account? <span className="underline">Sign up.</span>
              </Link>
            </div>
          </Form>
        </FormProvider>
      </section>

      <section className="relative w-full flex-grow pl-4">
        <div className="relative -top-[245px]  h-full max-w-[1440px] bg-signUpImg bg-cover bg-no-repeat"></div>
      </section>
    </>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
