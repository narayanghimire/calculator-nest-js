import { HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from '../../Interface/exception.response';

export class DefaultExceptionResponse implements ExceptionResponse {
  error = true;
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(
    public readonly message: string = 'Whoops, something went wrong',
  ) {}
}
