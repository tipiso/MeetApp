import { FileInput } from '@/components/Forms/FileInput';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@radix-ui/react-form';
import Avatar from '@/features/users/components/Avatar';
import { useMemo } from 'react';

type Props = {
  photo: string;
  userName: string;
};
const PhotoForm = ({ photo, userName }: Props) => {
  const methods = useForm({
    defaultValues: { file: photo },
  });

  const handleSubmit = async (data: { file: string }) => {
    console.log('submit', data);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-wrap gap-x-2.5 pt-6">
        <div className="flex w-full items-center pt-16">
          <Avatar name={userName} imgUrl={photo} />
          <FileInput
            className="ml-6"
            name="file"
            label="Add your photo"
            acceptFiles={['image/jpeg', 'image/pjpeg', 'image/png']}
          />
        </div>
      </Form>
    </FormProvider>
  );
};

export default PhotoForm;
