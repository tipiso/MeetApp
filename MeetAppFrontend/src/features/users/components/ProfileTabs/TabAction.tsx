import Button from '@/components/Button';
import { Tab } from '@/components/Tabs';
import { ColorTypeEnum, ProfilePageTabsKeys, acceptedMimeFiles } from '@/utils/constants';
import { useAddPhoto } from '../../hooks';
import { FileInput } from '@/components/Forms/FileInput';
import { Form } from '@radix-ui/react-form';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { userPhotoValidator } from '../../validators';

type Props = {
  active: Tab;
  isCurrentUserProfile: boolean;
};

export default function TabAction({ active, isCurrentUserProfile }: Props) {
  const addPhoto = useAddPhoto();
  const methods = useForm({
    defaultValues: {
      file: undefined,
    },
    resolver: zodResolver(z.object({ file: userPhotoValidator })),
  });

  if (!isCurrentUserProfile) return <Button btnType={ColorTypeEnum.PRIMARY}>Invite to friends</Button>;

  const handleSubmit = async ({ file }: { file?: File[] }) => {
    if (file) {
      await addPhoto.trigger(file[0]);
    }
  };

  /** Current user profile setup */
  if (active.key === ProfilePageTabsKeys.PHOTOS)
    return (
      <FormProvider {...methods}>
        <Form className="inline-block" onSubmit={methods.handleSubmit(handleSubmit)}>
          <FileInput name="file" label="Add your photo" acceptFiles={acceptedMimeFiles} />
        </Form>
      </FormProvider>
    );
  return null;
}
