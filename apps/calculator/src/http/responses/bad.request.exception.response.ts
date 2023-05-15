import { HttpStatus } from '@nestjs/common';
import { ExceptionResponseInterface } from '@app/calculator/src/exception/exception.response.interface';

export class BadRequestExceptionResponse implements ExceptionResponseInterface {
  error = true;
  statusCode = HttpStatus.BAD_REQUEST;
  constructor(public readonly message: string = 'Invalid request') {}
}
