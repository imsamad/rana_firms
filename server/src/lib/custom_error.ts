export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract errors: { [message: string]: string[] }[];

  constructor(message: string) {
    super(message);
  }
}
