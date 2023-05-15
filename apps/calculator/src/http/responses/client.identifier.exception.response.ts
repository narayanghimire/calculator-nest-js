import { HttpStatus } from '@nestjs/common';
import { ExceptionResponseInterface } from '@app/calculator/src/exception/exception.response.interface';

export class ClientIdentifierExceptionResponse
  implements ExceptionResponseInterface
{
  error = true;
  message: string;
  statusCode = HttpStatus.NOT_FOUND;
  constructor(message = 'invalid x-client header') {
    this.message = message;
  }
}
