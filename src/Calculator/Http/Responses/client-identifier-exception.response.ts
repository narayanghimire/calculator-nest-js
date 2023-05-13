import { ExceptionResponse } from '../../Interface/exception.response';
import { HttpStatus } from '@nestjs/common';

export class ClientIdentifierExceptionResponse implements ExceptionResponse {
  error = true;
  message: string;
  constructor(message = 'invalid x-client header') {
    this.message = message;
  }

  get statusCode(): number {
    return HttpStatus.NOT_FOUND;
  }
}
