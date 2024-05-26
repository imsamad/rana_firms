import { CustomError } from '../custom_error';

export class Zod_Error extends CustomError {
  statusCode = 400;

  constructor(public errors: any) {
    super('Invalid request parameters!');
  }
}
