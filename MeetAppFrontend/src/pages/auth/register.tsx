import { ReactElement, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Form, FormSubmit } from '@radix-ui/react-form';

import { Input } from '@/components/Forms/Input';
import Button from '@/components/Button';
import LoginLayout from '@/components/Layouts/LoginLayout';
import { ColorTypeEnum, genderOptions } from '@/utils/constants';
import Link from 'next/link';
import { routes } from '@/utils/routes';
import { register } from '@/services/Auth/register';
import { CheckboxInput } from '@/components/Forms/CheckboxInput';
import DatePickerInput from '@/components/Forms/DatePicker';
import { getISOfromJSDate } from '@/utils/parsers';
import { SelectInput } from '@/components/Forms/SelectInput';
import { registerSchema } from '@/features/auth/validators';

const defaultValues = {
  username: '',
  password: '',
  city: '',
  gender: '',
  dateOfBirth: null,
  confirmPassword: '',
  policy: false,
};

export default function Register() {
  const methods = useForm({ defaultValues, resolver: zodResolver(registerSchema) });
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (data: typeof defaultValues) => {
    setFormLoading(true);
    const response = await register({ ...data, dateOfBirth: getISOfromJSDate(data.dateOfBirth!) });
    setFormLoading(false);

    if (typeof response == 'string') {
      methods.setError('root', { message: response });
    } else if (Array.isArray(response)) {
      response.forEach((e) => {
        methods.setError(`root.[${e}]`, { message: e });
      });
    }
  };
  console.log(methods.formState.errors.root);
  return (
    <>
      <section className="flex flex-col justify-center py-24 pl-12">
        <h1 className="pb-[70px] text-3xl font-bold">Register</h1>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(handleSubmit)} className="d-flex w-96 flex-col">
            <div className="relative mb-6">
              <Input placeholder="Username" name="username" type="text" label="Username" />
            </div>

            <div className="relative mb-6">
              <DatePickerInput placeholder="Phone number" name="dateOfBirth" label="Date of birth" />
            </div>

            <div className="relative mb-6">
              <SelectInput placeholder="Gender" name="gender" label="Gender" options={genderOptions} />
            </div>

            <div className="relative mb-6">
              <Input placeholder="City" name="city" type="text" label="City" />
            </div>

            <div className="relative mb-6">
              <Input placeholder="Password" name="password" type="password" label="Password" />
            </div>

            <div className="relative mb-6">
              <Input placeholder="Confirm Password" name="confirmPassword" type="password" label="Confirm Password" />
            </div>

            {methods.formState.errors.root ? (
              <div className="mb-3">
                {'message' in methods.formState.errors.root ? (
                  <p key={methods.formState.errors.root.message} className="text-sm text-red-600">
                    {methods.formState.errors.root.message}
                  </p>
                ) : (
                  Object.keys(methods.formState.errors.root).map((key) => (
                    <p key={key} className="text-sm text-red-600">
                      {key}
                    </p>
                  ))
                )}
              </div>
            ) : (
              <p className="text-sm text-red-600">{methods.formState.errors.root}</p>
            )}

            <div className="relative mb-6">
              <CheckboxInput
                id="policy"
                name="policy"
                label={
                  <>
                    I accept the Terms and Conditions and have read the Privacy Policy.
                    <span className="ml-1 underline">Read more</span>
                  </>
                }
              />
            </div>

            <div className="text-center">
              <FormSubmit asChild>
                <Button
                  disabled={formLoading}
                  isLoading={formLoading}
                  className="w-1/2"
                  type="submit"
                  btnType={ColorTypeEnum.PRIMARY}
                >
                  Register
                </Button>
              </FormSubmit>
            </div>

            <div className="flex w-full flex-col pt-[50px]">
              <div className="before:bg-gray50 after:bg-gray50 divider before:h-[1px] after:h-[1px]"></div>
            </div>

            <div className="mb-3">
              <span className="text-xs font-light">
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
        <div className="relative h-full max-w-[1440px] bg-registerImg bg-cover bg-no-repeat"></div>
      </section>
    </>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
