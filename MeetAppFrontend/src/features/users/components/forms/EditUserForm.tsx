import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormSubmit } from '@radix-ui/react-form';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { editUserFormSchema, userFormSchema } from '../../validators';
import { Input } from '@/components/Forms/Input';
import { TextAreaInput } from '@/components/Forms/TextAreaInput';
import MultiSelect from '@/components/Forms/MultiSelect';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import useStore from '@/store/store';
import { useUpdateUser } from '../../hooks';
import { Option } from '@/components/Forms/MultiSelect';
import { Hobby } from '../../types';
import { getValuesFromSelectOptions } from '@/utils/helpers';

type Props = {
  knownAs: string;
  interests: string;
  age: number;
  introduction?: string;
  hobbies?: Option[];
  userHobbies?: Hobby[];
  username: string;
  city: string;
  country?: string;
};

type FormValues = {
  knownAs: string;
  age: number;
  introduction: string;
  hobbies: Option[];
  country?: string;
  city?: string;
};

const EditUserForm = ({ knownAs, age, city, hobbies, introduction, userHobbies, country }: Props) => {
  const methods = useForm({
    defaultValues: {
      knownAs: knownAs ?? '',
      introduction: introduction ?? '',
      age,
      hobbies: userHobbies ? userHobbies.map<Option>((h) => ({ label: h.name, value: `${h.id}` })) : [],
      city,
      country: country ?? '',
    },
    resolver: zodResolver(editUserFormSchema),
  });
  const updateUser = useUpdateUser();
  const setUser = useStore((state) => state.setUser);
  const isLoading = updateUser.isMutating;

  const handleSubmit = async ({ ...rest }: FormValues) => {
    await updateUser.trigger({ ...rest, hobbies: getValuesFromSelectOptions(rest.hobbies) });
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleSubmit)} className="pt-6">
        <div className="grid grid-cols-12 gap-x-2.5">
          <div className="relative col-span-3 mb-6">
            <Input placeholder="Name" name="knownAs" type="text" label="Name" />
          </div>

          <div className="relative col-span-3 mb-6">
            <Input disabled placeholder="Age" name="age" type="text" label="Age" />
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

          <div className="col-span-12 text-right">
            <FormSubmit asChild>
              <Button
                className="ml-auto"
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
                btnType={ColorTypeEnum.PRIMARY}
              >
                Save Changes
              </Button>
            </FormSubmit>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
};

export default EditUserForm;
