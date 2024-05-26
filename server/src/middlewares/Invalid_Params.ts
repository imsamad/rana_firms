import { CustomError } from '../lib/custom_error';

export class Invalid_Params extends CustomError {
  statusCode = 401;

  constructor(public errors: any) {
    super('Invalid params');
  }
}
