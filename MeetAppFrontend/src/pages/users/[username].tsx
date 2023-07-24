import { ReactElement, useEffect } from 'react';
import useUserPage from '@/features/users/hooks/useUserPage';
import CleanLayout from '@/components/Layouts/CleanLayout';
import Avatar from '@/features/users/components/Avatar';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Forms/Input';
import { Form, FormSubmit } from '@radix-ui/react-form';
import * as z from 'zod';
import { TextAreaInput } from '@/components/Forms/TextAreaInput';
import { SelectInput } from '@/components/Forms/SelectInput';

const schema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  policy: z.boolean(),
});

const UserPage = () => {
  const { isLoading, user } = useUserPage();
  const methods = useForm({ defaultValues: user, resolver: zodResolver(schema) });
  console.log(isLoading, user);

  const handleSubmit = async (data: typeof user) => {
    console.log('submit', data);
  };

  useEffect(() => {
    if (!!user && !isLoading) {
      methods.reset(user);
    }
  }, [user, isLoading]);

  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-4xl font-bold">Tell us about you!</h1>
      <div className="flex w-full items-center pt-16">
        <Avatar name={user.userName} imgUrl={user.photoUrl} />
        <Button className="ml-6" btnType={ColorTypeEnum.PRIMARY}>
          Add your photo
        </Button>
      </div>

      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-wrap gap-x-2.5 pt-6">
          <div className="relative mb-6 w-3/12">
            <Input required placeholder="Name" name="knownAs" type="text" label="Name" />
          </div>

          <div className="relative mb-6 w-3/12">
            <Input required placeholder="Age" name="age" type="text" label="Age" />
          </div>

          <div className="relative mb-6 w-2/12">
            <SelectInput
              required
              placeholder="Gender"
              name="gender"
              type="text"
              label="Gender"
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
            />
          </div>

          <div className="relative mb-6 w-2/12">
            <Input required placeholder="Select or add new" name="interests" type="text" label="Pick your hobby" />
          </div>

          <div className="relative mb-6 w-full">
            <TextAreaInput
              required
              placeholder="Type here"
              name="introduction"
              type="text"
              label="Few words about you"
            />
          </div>

          <div className="mt-auto w-full text-right">
            <FormSubmit asChild>
              <Button type="submit" btnType={ColorTypeEnum.PRIMARY}>
                Go to your profile
              </Button>
            </FormSubmit>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <CleanLayout>{page}</CleanLayout>;
};

UserPage.secured = true;
export default UserPage;
