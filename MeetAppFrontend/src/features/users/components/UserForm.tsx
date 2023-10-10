import { FormProvider, useForm } from 'react-hook-form';
import { Form, FormSubmit } from '@radix-ui/react-form';
import { Input } from '@/components/Forms/Input';
import { SelectInput } from '@/components/Forms/SelectInput';
import { TextAreaInput } from '@/components/Forms/TextAreaInput';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import * as z from 'zod';

const schema = z.object({
  knownAs: z.string().min(1, { message: 'Name is required' }),
  age: z.number().min(1, { message: 'Age is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  interests: z.string().min(1, { message: 'Hobby is required' }),
});

type Props = {
  knownAs: string;
  gender: string;
  interests: string;
  age: number;
};

const UserForm = ({ knownAs, gender, age, interests }: Props) => {
  const methods = useForm({
    defaultValues: { knownAs, age, gender, interests },
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (data: Props) => {
    console.log('submit', data);
  };

  return (
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
          <TextAreaInput required placeholder="Type here" name="introduction" type="text" label="Few words about you" />
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
