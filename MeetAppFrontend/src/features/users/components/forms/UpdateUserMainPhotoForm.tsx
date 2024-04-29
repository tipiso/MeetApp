import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { userPhotoValidator } from '../../validators';
import { Form } from '@radix-ui/react-form';
import Avatar from '../Avatar';
import { ColorTypeEnum } from '@/utils/constants';
import { Photo } from '../../types';
import Button from '@/components/Button';
import useModal from '@/components/Modal/useModal';
import Modal from '@/components/Modal/Modal';
import Image from 'next/image';
import classNames from 'classnames';
import { useUpdateMainPhoto } from '../../hooks';
import { alert } from '@/components/Alert/Alert';

type Props = {
  username: string;
  photos: Photo[];
};

const UpdateUserMainPhotoForm = ({ username, photos }: Props) => {
  const [currentPhoto, setCurrentPhoto] = useState<Photo | undefined>(photos.find((p) => p.isMain));
  const modal = useModal();
  const methods = useForm({
    defaultValues: {
      file: undefined,
    },
    resolver: zodResolver(userPhotoValidator),
  });
  const updatePhoto = useUpdateMainPhoto();

  const handleSubmit = async () => {
    try {
      if (currentPhoto) {
        await updatePhoto.trigger(currentPhoto.id);
        alert('Photo added succesfully.', ColorTypeEnum.SUCCESS);
      }
    } catch {
      alert('Something went wrong, please try again.', ColorTypeEnum.DANGER);
    }
  };
  console.log(photos);
  return (
    <div className="pt-6">
      <div className="flex w-full items-center pb-8">
        <div className="pr-4">
          <Avatar width={160} height={160} name={username} imgUrl={currentPhoto?.url} />
        </div>
        <Button onClick={() => modal.toggle()} type="button" btnType={ColorTypeEnum.PRIMARY}>
          Change your photo
        </Button>
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
          <div className="flex justify-center pr-4">
            <Avatar width={250} height={250} name={username} imgUrl={currentPhoto?.url} />
          </div>
          <div className="relative grid grid-cols-4 gap-x-6 gap-y-3 overflow-auto pt-6 xl:grid-cols-6">
            {photos.map((p) => (
              <Image
                className={classNames(currentPhoto?.id === p.id && 'active', 'cursor-pointer')}
                onClick={() => setCurrentPhoto(p)}
                src={p.url}
                key={p.id}
                width={250}
                height={250}
                alt=""
              />
            ))}
          </div>
        </Modal>
      </FormProvider>
    </div>
  );
};

export default UpdateUserMainPhotoForm;
