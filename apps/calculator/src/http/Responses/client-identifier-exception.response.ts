import { ExceptionResponseInterface } from '../../exception/exception.response.interface';
import { HttpStatus } from '@nestjs/common';

export class ClientIdentifierExceptionResponse implements ExceptionResponseInterface {
  error = true;
  message: string;
  statusCode = HttpStatus.NOT_FOUND;
  constructor(message = 'invalid x-client header') {
    this.message = message;
  }
}
