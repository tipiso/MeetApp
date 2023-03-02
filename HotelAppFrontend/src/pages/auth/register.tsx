import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import Label from '@/components/Forms/Label';
import Input from '@/components/Forms/Input';
import Button, { BtnType } from '@/components/Button';
import { ReactElement } from 'react';
import BlankCenteredLayout from '@/components/Layouts/BlankCenteredLayout';
import axios from 'axios';
import { registerUrl } from '@/utils/url';
import { signIn } from 'next-auth/react';
import { routes } from '@/utils/routes';
import Router from 'next/router';
import { login } from '@/utils/auth';
import { api } from '@/utils/axios';

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
    const response = await api.post(registerUrl, data);

    if (response.status === 200) {
      login({ username: data.username, password: data.password });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="d-flex flex-col p-4 w-96">
        <h1 className="text-2xl mb-4">Register</h1>

        <div className="relative mb-6">
          <Label text="Username" htmlFor="username" />
          <Input placeholder="Username" name="username" type="text" />
        </div>

        <div className="relative mb-6">
          <Label text="Password" htmlFor="password" />
          <Input placeholder="Password" name="password" type="password" />
        </div>

        <div className="relative mb-6">
          <Label text="Confirm Password" htmlFor="confirmPassword" />
          <Input placeholder="Confirm Password" name="confirmPassword" type="password" />
        </div>

        <div className="text-right">
          <Button type="submit" btnType={BtnType.Primary}>
            Register
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <BlankCenteredLayout>{page}</BlankCenteredLayout>;
};
