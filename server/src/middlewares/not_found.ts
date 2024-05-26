import { CustomError } from '../lib/custom_error';

export class NotFound extends CustomError {
  statusCode = 401;
  errors = [{ message: ['Endpoint does not exist!'] }];
  constructor() {
    super('Not found');
  }
}
