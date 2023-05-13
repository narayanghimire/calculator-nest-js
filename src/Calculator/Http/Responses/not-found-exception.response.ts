import { ExceptionResponse } from '../../Interface/exception.response';
import { HttpStatus } from '@nestjs/common';

export class NotFoundExceptionResponse implements ExceptionResponse {
  error = false;
  constructor(public readonly message: string = 'not found') {}

  get statusCode(): number {
    return HttpStatus.NOT_FOUND;
  }
}
