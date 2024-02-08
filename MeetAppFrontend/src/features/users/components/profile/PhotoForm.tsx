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
      try {
        await addPhoto.trigger(file[0]);
      } catch (e) {
      } finally {
        modal.toggle();
        methods.reset();
      }
    }
  };

  const inputLabel = methods.getValues('file') ? 'Replace photo' : 'Add your photo';
  console.log(methods.getValues());
  return (
    <>
      <Button onClick={() => modal.toggle()} type="button" btnType={ColorTypeEnum.PRIMARY}>
        Add your photo
      </Button>
      <FormProvider {...methods}>
        <Modal
          id="Photo-form"
          open={modal.isOpen}
          title="Add new photo"
          toggle={modal.toggle}
          className="xs:w-full max-w-none lg:w-3/4"
          onClosed={() => methods.reset()}
          action={
            <Form className="flex gap-2 text-end" onSubmit={methods.handleSubmit(handleSubmit)}>
              <FileInput
                btnType={ColorTypeEnum.SECONDARY}
                className="mx-0"
                name="file"
                label={inputLabel}
                acceptFiles={acceptedMimeFiles}
              />
              <Button
                type="submit"
                btnType={ColorTypeEnum.PRIMARY}
                disabled={methods.formState.isSubmitting}
                isLoading={methods.formState.isSubmitting}
              >
                Submit photo
              </Button>
            </Form>
          }
        >
          <div className="flex min-h-[50vh] w-full items-center justify-center ">
            {methods.getValues('file') ? (
              <Image width={500} height={500} src={createUrlFromImg(methods.getValues('file')?.[0]) ?? ''} alt="" />
            ) : (
              <div className="flex min-h-[50vh] w-full items-center justify-center bg-slate-50">
                Here there will be your photo's preview
              </div>
            )}
          </div>
        </Modal>
      </FormProvider>
    </>
  );
}

export default PhotoForm;
