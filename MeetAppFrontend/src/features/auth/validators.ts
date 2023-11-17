import { z } from 'zod';

const registerSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    gender: z.string().min(1, { message: 'Gender is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    dateOfBirth: z.date(),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
    policy: z.boolean(),
  })
  .superRefine(({ password, confirmPassword, policy }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({ code: 'custom', message: 'Passwords do not match', path: ['confirmPassword'] });
    }
    if (!policy) {
      ctx.addIssue({ code: 'custom', message: 'Policy agreement is required', path: ['policy'] });
    }
  });

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export { registerSchema, loginSchema };
