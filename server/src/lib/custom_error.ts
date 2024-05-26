export abstract class CustomError extends Error {
  abstract statusCode: number;
  errors: { [message: string]: string[] }[] = [];

  constructor(message: string) {
    super(message);
  }
}
