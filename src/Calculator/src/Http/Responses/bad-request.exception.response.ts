import { ExceptionResponse } from '../../Interface/exception.response';
import { HttpStatus } from '@nestjs/common';

export class BadRequestExceptionResponse implements ExceptionResponse {
  error = true;
  statusCode = HttpStatus.BAD_REQUEST;
  constructor(public readonly message: string = 'Invalid request') {}
}
