import { FormProvider, useForm } from 'react-hook-form';
import Label from '@/components/Forms/Label';
import Input from '@/components/Forms/Input';
import Link from 'next/link';
import { routes } from '@/utils/routes';
import Button, { BtnType } from '@/components/Button';

const defaultValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const methods = useForm({ defaultValues });

  const handleSubmit = (data: unknown) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="d-flex flex-col p-4 w-96">
        <h1 className="text-2xl mb-4">Login</h1>

        <div className="relative mb-6">
          <Label text="Username" htmlFor="username" />
          <Input placeholder="Username" name="username" type="text" />
        </div>

        <div className="relative mb-3">
          <Label text="Password" htmlFor="password" />
          <Input placeholder="Password" name="password" type="password" />
        </div>

        <div className="relative mb-3">
          <Label text="Confirm Password" htmlFor="confirmPassword" />
          <Input placeholder="Confirm Password" name="confirmPassword" type="password" />
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
