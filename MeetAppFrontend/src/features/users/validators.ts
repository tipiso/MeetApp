import { z } from 'zod';

const userFormSchema = z.object({
  knownAs: z.string().min(1, { message: 'Name is required' }),
  age: z.number().min(1, { message: 'Age is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  file: z
    .custom<File[]>()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine((files) => files?.[0]?.size <= 100000, `Max file size is 10MB.`)
    .refine(
      (files) => ['image/jpeg', 'image/pjpeg', 'image/png'].includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  hobbies: z.object({ value: z.string(), label: z.string() }).array().min(3),
});

export { userFormSchema };
