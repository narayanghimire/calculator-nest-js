import { HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from '../../Interface/exception.response';

export class DefaultExceptionResponse implements ExceptionResponse {
  error = true;
  constructor(
    public readonly message: string = 'Whoops, something went wrong',
  ) {}

  get statusCode(): number {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
