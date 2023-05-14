import { ExceptionResponse } from '../../Interface/exception.response';
import { HttpStatus } from '@nestjs/common';

export class BadRequestExceptionResponse implements ExceptionResponse {
  error = true;
  constructor(public readonly message: string = 'Invalid request') {}

  get statusCode(): number {
    return HttpStatus.BAD_REQUEST;
  }
}
