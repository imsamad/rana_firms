import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../lib/custom_error';

export const error_handler_mdlwr = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  if (err instanceof CustomError)
    return res.status(err.statusCode).json({
      errors: err.errors,
    });

  res.status(500).json({
    errors: [{ message: 'Server is under maintenance!' }],
  });
};
