import Button from '@/components/Button';
import Modal from '@/components/Modal/Modal';
import useModal from '@/components/Modal/useModal';
import { ColorTypeEnum, acceptedMimeFiles } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { userPhotoValidator } from '../../validators';
import { Form } from '@radix-ui/react-form';
import { FileInput } from '@/components/Forms/FileInput';
import { useAddPhoto } from '../../hooks';
import { createUrlFromImg } from '@/utils/helpers';
import Image from 'next/image';

function PhotoForm() {
  const addPhoto = useAddPhoto();
  const methods = useForm({
    defaultValues: {
      file: undefined,
    },
    resolver: zodResolver(z.object({ file: userPhotoValidator })),
  });
  const modal = useModal();

  const handleSubmit = async ({ file }: { file?: File[] }) => {
    if (file) {
      await addPhoto.trigger(file[0]);
    }
  };

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
        className="xs:w-full max-w-none lg:w-1/2"
        onClosed={() => methods.reset()}
      >
        <FormProvider {...methods}>
          <div>
            {methods.getValues('file') ? (
              <Image width={500} height={500} src={createUrlFromImg(methods.getValues('file')?.[0]) ?? ''} alt="" />
            ) : (
              <div className="flex min-h-[50vh] w-full items-center justify-center bg-slate-50">
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
}

export default PhotoForm;
