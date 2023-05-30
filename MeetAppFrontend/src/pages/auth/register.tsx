import { ReactElement } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import Label from '@/components/Forms/Label';
import Input from '@/components/Forms/Input';
import Button, { BtnType } from '@/components/Button';
import BlankCenteredLayout from '@/components/Layouts/BlankCenteredLayout';
import { registerUrl } from '@/utils/url';
import { login } from '@/utils/auth';
import { api } from '@/utils/axios';
import { transformErrorsToStringArr } from '@/utils/helpers';

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

        {methods.formState.errors.root && Array.isArray(methods.formState.errors.root.message) ? (
          methods.formState.errors.root.message.map((error) => (
            <div key={error} className="text-red-600">
              {error}
            </div>
          ))
        ) : (
          <div className="text-red-600">{methods.formState.errors.root?.message}</div>
        )}

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
