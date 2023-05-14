import { ExceptionResponse } from '../../Interface/exception.response';
import { HttpStatus } from '@nestjs/common';

export class NotFoundExceptionResponse implements ExceptionResponse {
  error = true;
  statusCode = HttpStatus.NOT_FOUND;
  constructor(public readonly message: string = 'not found') {}
}
