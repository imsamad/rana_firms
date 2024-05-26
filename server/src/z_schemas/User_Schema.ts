import { z } from 'zod';
import { timestamps_schema } from './common_schema';

export const z_user_schema = z
  .object({
    username: z
      .string({ required_error: 'Username is required!' })
      .min(5)
      .trim(),

    fullname: z
      .string({ required_error: 'Fullname is required!' })
      .trim()
      .min(8),

    email: z
      .string({ required_error: 'Email is required!' })
      .email({
        message: 'Provide a valid email',
      })
      .trim(),

    password: z
      .string({ required_error: 'Password is required!' })
      .trim()
      .min(8, 'Password must contain 8 to 64 characters.')
      .max(64, 'Password must contain 8 to 64 characters.'),

    is_confirmed: z.boolean().default(false),

    is_blocked: z.boolean().default(false),
  })
  .merge(timestamps_schema);

export type t_z_user_schema = z.infer<typeof z_user_schema>;
