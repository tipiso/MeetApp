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
import useModal from '@/components/Modal/useModal';
import Modal from '@/components/Modal/Modal';
import { createUrlFromImg } from '@/utils/helpers';
import Image from 'next/image';

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
  const modal = useModal();

  if (!isCurrentUserProfile) return <Button btnType={ColorTypeEnum.PRIMARY}>Invite to friends</Button>;

  const handleSubmit = async ({ file }: { file?: File[] }) => {
    if (file) {
      await addPhoto.trigger(file[0]);
    }
  };

  /** Current user profile setup */
  if (active.key === ProfilePageTabsKeys.PHOTOS) console.log(methods.getValues('file'));
  return (
    <>
      <Button onClick={() => modal.toggle()} type="button" btnType={ColorTypeEnum.PRIMARY}>
        Add your photo
      </Button>
      <Modal
        id="Photo-form"
        open={modal.isOpen}
        title="Add new photo"
        toggle={modal.toggle}
        onClosed={() => methods.reset()}
      >
        <FormProvider {...methods}>
          <div>
            {methods.getValues('file') ? (
              <Image width={500} height={500} src={createUrlFromImg(methods.getValues('file')?.[0]) ?? ''} alt="" />
            ) : (
              <div className="min-h-16 flex w-full items-center justify-center bg-slate-50">
                Here there will be your photo's preview
              </div>
            )}
          </div>

          <Form className="inline-block w-full pt-4 text-end" onSubmit={methods.handleSubmit(handleSubmit)}>
            <FileInput className="mx-0" name="file" label="Add your photo" acceptFiles={acceptedMimeFiles} />
          </Form>
        </FormProvider>
      </Modal>
    </>
  );
  return null;
}
