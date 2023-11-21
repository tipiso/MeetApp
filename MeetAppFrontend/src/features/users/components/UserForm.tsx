import { FormProvider, useForm } from 'react-hook-form';
import { Form, FormSubmit } from '@radix-ui/react-form';
import { Input } from '@/components/Forms/Input';
import { SelectInput } from '@/components/Forms/SelectInput';
import { TextAreaInput } from '@/components/Forms/TextAreaInput';
import Button from '@/components/Button';
import { ColorTypeEnum, genderOptions } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from './Avatar';
import { FileInput } from '@/components/Forms/FileInput';
import MultiSelect, { Option } from '@/components/Forms/MultiSelect';
import { createUrlFromImg, getValuesFromSelectOptions } from '@/utils/helpers';
import { userFormSchema } from '../validators';
import { useAddPhoto, useUpdateUser } from '../hooks';
import { useRouter } from 'next/router';
import { routes } from '@/utils/routes';

type Props = {
  knownAs: string;
  gender: string;
  interests: string;
  age: number;
  photo?: string;
  hobbies?: Option[];
  username: string;
};

type FormValues = {
  knownAs: string;
  gender: string;
  age: number;
  introduction: string;
  hobbies: Option[];
  file?: File[];
};

const UserForm = ({ knownAs, gender, age, interests, username, photo, hobbies }: Props) => {
  const methods = useForm({
    defaultValues: { knownAs: knownAs ?? '', introduction: '', age, gender, file: undefined, hobbies: [] },
    resolver: zodResolver(userFormSchema),
  });
  const router = useRouter();
  const addPhoto = useAddPhoto();
  const updateUser = useUpdateUser();
  const isLoading = addPhoto.isMutating || updateUser.isMutating;

  const handleSubmit = async ({ file, hobbies, ...rest }: FormValues) => {
    if (file) {
      await addPhoto.trigger(file[0]);
      await updateUser.trigger({ ...rest, hobbies: getValuesFromSelectOptions(hobbies) });
      router.push(routes.matches);
    }
  };

  console.log(methods.formState, methods.getValues());
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-wrap gap-x-2.5 pt-6">
        <div className="flex w-full items-center pt-16">
          <Avatar
            name={username}
            imgUrl={methods.getValues('file') ? createUrlFromImg(methods.getValues('file')?.[0]) : ''}
          />
          <FileInput
            className="ml-6"
            name="file"
            label="Add your photo"
            acceptFiles={['image/jpeg', 'image/pjpeg', 'image/png']}
          />
        </div>

        <div className="relative mb-6 w-3/12">
          <Input required placeholder="Name" name="knownAs" type="text" label="Name" />
        </div>

        <div className="relative mb-6 w-3/12">
          <Input required placeholder="Age" name="age" type="text" label="Age" />
        </div>

        <div className="relative mb-6 w-2/12">
          <SelectInput required placeholder="Gender" name="gender" type="text" label="Gender" options={genderOptions} />
        </div>

        <div className="relative mb-6 w-full">
          <TextAreaInput required placeholder="Type here" name="introduction" type="text" label="Few words about you" />
        </div>

        <div className="relative mb-6 w-2/12">
          <MultiSelect options={hobbies ?? []} placeholder="Select a few" name="hobbies" label="Pick your hobby" />
        </div>

        <div className="mt-auto w-full text-right">
          <FormSubmit asChild>
            <Button isLoading={isLoading} disabled={isLoading} type="submit" btnType={ColorTypeEnum.PRIMARY}>
              Go to your profile
            </Button>
          </FormSubmit>
        </div>
      </Form>
    </FormProvider>
  );
};

export default UserForm;
