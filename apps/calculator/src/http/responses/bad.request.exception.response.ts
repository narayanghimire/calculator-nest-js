import { ExceptionResponseInterface } from '../../exception/exception.response.interface';
import { HttpStatus } from '@nestjs/common';

export class BadRequestExceptionResponse implements ExceptionResponseInterface {
  error = true;
  statusCode = HttpStatus.BAD_REQUEST;
  constructor(public readonly message: string = 'Invalid request') {}
}
