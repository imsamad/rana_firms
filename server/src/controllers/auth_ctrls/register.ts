import { Request, Response } from 'express';
import z from 'zod';

import { validate_request } from '../../middlewares/validate_request';
import { register_schema } from '../../z_schemas/auth_schema';
import User from '../../model/User';
import { Invalid_Params } from '../../middlewares/Invalid_Params';

const register_ctrl = async (req: Request, res: Response) => {
  const body: z.infer<typeof register_schema> = req.body;

  const alreadyExisted = await User.findOne({
    $or: [
      {
        email: body.email,
      },
      {
        username: body.username,
      },
    ],
  });

  if (alreadyExisted)
    throw new Invalid_Params({
      message:
        alreadyExisted.email == body.email
          ? 'Email already taken!'
          : 'Username already taken!',
    });

  const user = await User.create(body);

  // todo - send confirmation email

  res.json(user);
};

export default [validate_request(register_schema, 'body'), register_ctrl];
