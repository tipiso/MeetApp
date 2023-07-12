import { ReactElement } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Form, FormSubmit } from '@radix-ui/react-form';

import Input from '@/components/Forms/Input';
import Button from '@/components/Button';
import { registerUrl } from '@/utils/url';
import { login } from '@/services/Auth/auth';
import { api } from '@/utils/axios';
import { transformErrorsToStringArr } from '@/utils/helpers';
import LoginLayout from '@/components/Layouts/LoginLayout';
import { ColorTypeEnum } from '@/utils/constants';
import Link from 'next/link';
import { routes } from '@/utils/routes';

const defaultValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const schema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({ code: 'custom', message: 'Passwords do not match', path: ['confirmPassword'] });
    }
  });

export default function Register() {
  const methods = useForm({ defaultValues, resolver: zodResolver(schema) });

  const handleSubmit = async (data: typeof defaultValues) => {
    try {
      const response = await api.post(registerUrl, data);
      if (response.status === 200) {
        login({ username: data.username, password: data.password });
      }
    } catch (e) {
      const axiosError = e as any;
      let formError;

      if (axiosError.response?.status === 400) {
        if (axiosError.response && axiosError.response.data && typeof axiosError.response.data != 'string') {
          formError = transformErrorsToStringArr(axiosError.response.data.errors);
        } else {
          formError = axiosError.response.data;
        }
        methods.setError('root', { message: formError as string });
      }
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center pl-12">
        <h1 className="pb-[70px] text-3xl font-bold">Register</h1>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(handleSubmit)} className="d-flex w-96 flex-col">
            <div className="relative mb-6">
              <Input placeholder="Username" name="username" type="text" label="Username" />
            </div>

            <div className="relative mb-6">
              <Input placeholder="Phone number" name="phone" type="text" label="Phone number" />
            </div>

            <div className="relative mb-6">
              <Input placeholder="Password" name="password" type="password" label="Password" />
            </div>

            <div className="relative mb-6">
              <Input placeholder="Confirm Password" name="confirmPassword" type="password" label="Confirm Password" />
            </div>

            {methods.formState.errors.root && Array.isArray(methods.formState.errors.root.message) ? (
              methods.formState.errors.root.message.map((error) => (
                <div key={error} className="text-red-600">
                  {error}
                </div>
              ))
            ) : (
              <div className="text-red-600">{methods.formState.errors.root?.message}</div>
            )}

            <div className="form-control mb-3">
              <label className="label cursor-pointer">
                <input type="checkbox" checked={true} className="checkbox mr-2" />
                <span className="label-text text-xs font-light">
                  I accept the Terms and Conditions and have read the Privacy Policy.{' '}
                  <span className="underline">Read more</span>
                </span>
              </label>
            </div>

            <div className="text-center">
              <FormSubmit asChild>
                <Button className="w-1/2" type="submit" btnType={ColorTypeEnum.PRIMARY}>
                  Register
                </Button>
              </FormSubmit>
            </div>

            <div className="flex w-full flex-col pt-[50px]">
              <div className="divider before:h-[1px] before:bg-gray50 after:h-[1px] after:bg-gray50"></div>
            </div>

            <div className="mb-3">
              <span className="text-blue-600 text-xs font-light">
                Already have an account?
                <Link href={routes.signin} className="ml-1 underline">
                  Log in
                </Link>
              </span>
            </div>
          </Form>
        </FormProvider>
      </section>

      <section className="relative w-full flex-grow pl-4">
        <div className="relative -top-[245px]  h-full max-w-[1440px] bg-registerImg bg-cover bg-no-repeat"></div>
      </section>
    </>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
