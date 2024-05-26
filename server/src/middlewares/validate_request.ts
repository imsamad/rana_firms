import { NextFunction, Request, Response } from 'express';

import { AnyZodObject, ZodEffects } from 'zod';
import { Zod_Error } from '../lib/Errors/Zod_Error';

export const validate_request =
  (schema: AnyZodObject | ZodEffects<any>, key: 'body' | 'query' | 'params') =>
  async (req: Request, _: Response, next: NextFunction) => {
    const res = schema.safeParse(req[key]);

    if (!res.success) throw new Zod_Error(res.error.flatten().fieldErrors);

    return next();
  };
