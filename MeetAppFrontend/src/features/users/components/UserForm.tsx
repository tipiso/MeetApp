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
import { useAddPhoto, useGetUser, useUpdateUser } from '../hooks';
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
  age: number;
  introduction: string;
  hobbies: Option[];
  country: string;
  city: string;
  file?: File[];
};

const UserForm = ({ knownAs, age, username, hobbies }: Props) => {
  const methods = useForm({
    defaultValues: {
      knownAs: knownAs ?? '',
      introduction: '',
      age,
      file: undefined,
      hobbies: [],
      city: '',
      country: '',
    },
    resolver: zodResolver(userFormSchema),
  });
  const router = useRouter();
  const addPhoto = useAddPhoto();
  const updateUser = useUpdateUser();
  const getUser = useGetUser(username);
  const isLoading = addPhoto.isMutating || updateUser.isMutating;

  const handleSubmit = async ({ file, hobbies, ...rest }: FormValues) => {
    if (file) {
      await addPhoto.trigger(file[0]);
      await updateUser.trigger({ ...rest, hobbies: getValuesFromSelectOptions(hobbies) });
      await getUser.mutate();
      router.push(routes.search);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleSubmit)} className="pt-6">
        <div className="flex w-full items-center pt-16 pb-8">
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
        <div className="grid grid-cols-12 gap-x-2.5">
          <div className="relative col-span-3 mb-6">
            <Input required placeholder="Name" name="knownAs" type="text" label="Name" />
          </div>

          <div className="relative col-span-3 mb-6">
            <Input required placeholder="Age" name="age" type="text" label="Age" />
          </div>

          <div className="relative col-span-3 mb-6">
            <Input required placeholder="City" name="city" type="text" label="City" />
          </div>

          <div className="relative col-span-3 mb-6">
            <Input required placeholder="Country" name="country" type="text" label="Country" />
          </div>

          <div className="relative col-span-12 mb-6">
            <TextAreaInput
              required
              placeholder="Type here"
              name="introduction"
              type="text"
              label="Few words about you"
            />
          </div>

          <div className="relative col-span-12 mb-6">
            <MultiSelect
              className="w-1/3"
              options={hobbies ?? []}
              placeholder="Select a few"
              name="hobbies"
              label="Pick your hobby"
            />
          </div>

          <div className="col-span-12 mt-auto text-right">
            <FormSubmit asChild>
              <Button isLoading={isLoading} disabled={isLoading} type="submit" btnType={ColorTypeEnum.PRIMARY}>
                Go to your profile
              </Button>
            </FormSubmit>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
};

export default UserForm;
