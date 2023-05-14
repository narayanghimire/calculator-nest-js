import { ExceptionResponse } from '../../Interface/exception.response';
import { HttpStatus } from '@nestjs/common';

export class ClientIdentifierExceptionResponse implements ExceptionResponse {
  error = true;
  message: string;
  statusCode = HttpStatus.NOT_FOUND;
  constructor(message = 'invalid x-client header') {
    this.message = message;
  }
}
