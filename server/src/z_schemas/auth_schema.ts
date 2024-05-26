import { z_user_schema } from './User_Schema';
import z from 'zod';

export const register_schema = z_user_schema
  .pick({
    username: true,
    fullname: true,
    email: true,
    password: true,
  })
  .extend({
    confirm_password: z.string({
      required_error: 'Confirm Password is required!',
    }),
  })
  .refine(
    ({ password, confirm_password }) =>
      password && password === confirm_password,
    {
      path: ['confirm_password'],
      message: 'Password does not match!',
    }
  );
