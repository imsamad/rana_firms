import { CustomError } from '../custom_error';

export class MogooseValidationError extends CustomError {
  statusCode = 401;

  constructor(errs: any) {
    super('Invalid request parameters');
    if (errs?.code === 11000) {
      const field = Object.keys(errs.keyValue)[0] || '';
      const value = errs?.keyValue?.[field];
      this.errors = [
        {
          [field]: [value ? value + ' already taken.' : 'It must be unique.'],
        },
      ];

      return;
    }

    let err: any = {};
    console.log(' errs.errs: ', errs);
    for (let path in errs.errors) {
      console.log('eeeeeeeeeeeeeeeeeeeeeee": ', path);
      if (!err[path]) err[path] = [];
      err[path].push(
        errs?.errors?.[path]?.['message'] ||
          errs[path]?.message ||
          'Invalid value'
      );
    }
    console.log('err: ', err);
    this.errors = err;
  }
}
