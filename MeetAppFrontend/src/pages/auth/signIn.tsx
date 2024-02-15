import { ReactElement, useState } from 'react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormSubmit } from '@radix-ui/react-form';

import Button from '@/components/Button';
import { Input } from '@/components/Forms/Input';
import { routes } from '@/utils/routes';
import Link from 'next/link';
import { login } from '@/services/Auth/login';
import { ColorTypeEnum } from '@/utils/constants';
import LoginLayout from '@/components/Layouts/LoginLayout';
import { loginSchema } from '@/features/auth/validators';
import MainLayout from '@/components/Layouts/MainLayout';

const defaultValues = {
  username: '',
  password: '',
};

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const methods = useForm({ defaultValues, resolver: zodResolver(loginSchema) });
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async ({ username, password }: z.infer<typeof loginSchema>) => {
    setFormLoading(true);
    await login({
      username,
      password,
      onError: (error) => {
        if (error.status === 401) methods.setError('root', { message: 'Invalid username or password' });
      },
    });
    setFormLoading(false);
  };

  return (
    <>
      <section className="z-10 flex flex-col justify-center py-20 pl-10">
        <h1 className="pb-6 text-4xl font-bold">Log in</h1>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(handleSubmit)} className="d-flex w-96 flex-col">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <div className="relative mb-6">
              <Input required placeholder="Username" name="username" type="text" label="Username" />
            </div>

            <div className="relative mb-3">
              <Input required placeholder="Password" name="password" type="password" label="Password" />
            </div>

            {methods.formState.errors.root && <div className="text-red-600">Invalid username or password</div>}

            <div className="w-full pt-[50px] text-center">
              <FormSubmit asChild>
                <Button
                  disabled={formLoading}
                  isLoading={formLoading}
                  className="w-1/2"
                  type="submit"
                  btnType={ColorTypeEnum.PRIMARY}
                >
                  Log In
                </Button>
              </FormSubmit>
            </div>

            <div className="flex w-full flex-col pt-[50px]">
              <div className="before:bg-gray50 after:bg-gray50 divider before:h-[1px] after:h-[1px]"></div>
            </div>

            <div className="mb-3">
              <Link className="text-xs font-light" href={routes.register}>
                Don't have an account? <span className="underline">Sign up.</span>
              </Link>
            </div>
          </Form>
        </FormProvider>
      </section>

      <section className="relative w-full flex-grow overflow-hidden pl-4">
        <div className="absolute h-full  w-full max-w-[1440px] bg-signInImg bg-cover bg-no-repeat"></div>
      </section>
    </>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout hideRoutes>
      <LoginLayout>{page}</LoginLayout>
    </MainLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
