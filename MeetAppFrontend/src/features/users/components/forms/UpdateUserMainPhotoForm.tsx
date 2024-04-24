import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { userPhotoValidator } from '../../validators';
import { Form } from '@radix-ui/react-form';
import Avatar from '../Avatar';
import { FileInput } from '@/components/Forms/FileInput';
import { ColorTypeEnum, acceptedMimeFiles } from '@/utils/constants';
import { Photo } from '../../types';
import Button from '@/components/Button';
import useModal from '@/components/Modal/useModal';
import Modal from '@/components/Modal/Modal';

type Props = {
  photoUrl?: string | undefined;
  username: string;
  photos: Photo[];
};

const UpdateUserMainPhotoForm = ({ username, photoUrl, photos }: Props) => {
  const modal = useModal();
  const methods = useForm({
    defaultValues: {
      file: undefined,
    },
    resolver: zodResolver(userPhotoValidator),
  });

  const handleSubmit = async ({ file }: { file?: File[] }) => {};
  console.log(photos);
  return (
    <div className="pt-6">
      <div className="flex w-full items-center pb-8">
        <div className="pr-4">
          <Avatar width={160} height={160} name={username} imgUrl={photoUrl} />
        </div>
        <Button onClick={() => modal.toggle()} type="button" btnType={ColorTypeEnum.PRIMARY}>
          Change your photo
        </Button>
        {/* <FileInput className="ml-6" name="file" label="Add your photo" acceptFiles={acceptedMimeFiles} /> */}
      </div>

      <FormProvider {...methods}>
        <Modal
          id="Photo-form"
          open={modal.isOpen}
          title="Replace your avatar"
          toggle={modal.toggle}
          className="xs:w-full max-w-none lg:w-3/4"
          onClosed={() => methods.reset()}
          action={
            <Form className="flex gap-2 text-end" onSubmit={methods.handleSubmit(handleSubmit)}>
              {/* <FileInput
                  btnType={ColorTypeEnum.SECONDARY}
                  className="mx-0"
                  name="file"
                  label={}
                  acceptFiles={acceptedMimeFiles}
                /> */}
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
          {/* <div className="flex min-h-[50vh] w-full items-center justify-center ">
              {fileValue ? (
                <Image width={500} height={500} src={createUrlFromImg(fileValue[0]) ?? ''} alt="" />
              ) : (
                <div className="flex min-h-[50vh] w-full items-center justify-center bg-slate-50">
                  Here there will be your photo's preview
                </div>
              )}
            </div> */}
        </Modal>
      </FormProvider>
    </div>
  );
};

export default UpdateUserMainPhotoForm;
