import { FormProvider, useForm } from 'react-hook-form';
import { Form, FormSubmit } from '@radix-ui/react-form';
import { Input } from '@/components/Forms/Input';
import { SelectInput } from '@/components/Forms/SelectInput';
import { TextAreaInput } from '@/components/Forms/TextAreaInput';
import Button from '@/components/Button';
import { ColorTypeEnum, genderOptions } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Avatar from './Avatar';
import { FileInput } from '@/components/Forms/FileInput';
import { Hobby } from '../types';
import MultiSelect, { Option } from '@/components/Forms/MultiSelect';
import { createUrlFromImg } from '@/utils/helpers';

const schema = z.object({
  knownAs: z.string().min(1, { message: 'Name is required' }),
  age: z.number().min(1, { message: 'Age is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  photo: z.custom<File[]>().refine((files) => {
    console.log(files);
    return files?.length === 1, 'Image is required.';
  }),
  // .refine((files) => files?.[0]?.size <= 100000, `Max file size is 10MB.`)
  // .refine((files, ...args) => {
  //   console.log(files, args);
  //   return ['image/jpeg', 'image/pjpeg', 'image/png'].includes(files?.[0]?.type);
  // }, '.jpg, .jpeg, .png and .webp files are accepted.'),
  hobbies: z.object({ value: z.string(), label: z.string() }).array().min(3),
});

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
  hobbies: Option[];
  file?: File[];
};

const UserForm = ({ knownAs, gender, age, interests, username, photo, hobbies }: Props) => {
  const methods = useForm({
    defaultValues: { knownAs, age, gender, interests, file: undefined, hobbies: [] },
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (data: FormValues) => {
    console.log('submit', data, methods.getValues('file'));
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-wrap gap-x-2.5 pt-6">
        <div className="flex w-full items-center pt-16">
          <Avatar name={username} imgUrl={methods.getValues('file') ? createUrlFromImg(methods.getValues('file')?.[0]) : ''} />
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
            <Button type="submit" btnType={ColorTypeEnum.PRIMARY}>
              Go to your profile
            </Button>
          </FormSubmit>
        </div>
      </Form>
    </FormProvider>
  );
};

export default UserForm;
