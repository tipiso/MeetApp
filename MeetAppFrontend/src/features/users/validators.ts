import { mbInBytes } from '@/utils/constants';
import { z } from 'zod';

const userPhotoValidator = z
  .custom<File[]>()
  .refine((files) => files?.length === 1, 'Image is required.')
  .refine((files) => files?.[0]?.size <= mbInBytes * 10, `Max file size is 10MB.`)
  .refine(
    (files) => ['image/jpeg', 'image/pjpeg', 'image/png'].includes(files?.[0]?.type),
    '.jpg, .jpeg, .png and .webp files are accepted.',
  );

const userFormSchema = z.object({
  knownAs: z.string().min(1, { message: 'Name is required' }),
  age: z.preprocess((v) => {
    if (typeof v === 'number') return v;
    return parseInt(z.string().parse(v), 10);
  }, z.number().min(1, { message: 'Age is required' })),
  introduction: z.string().min(1, { message: 'Introduction is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  file: userPhotoValidator,
  hobbies: z.object({ value: z.string(), label: z.string() }).array().min(3),
});

export { userFormSchema, userPhotoValidator };
