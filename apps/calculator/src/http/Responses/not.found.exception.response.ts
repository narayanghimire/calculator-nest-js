import { ExceptionResponseInterface } from '../../exception/exception.response.interface';
import { HttpStatus } from '@nestjs/common';

export class NotFoundExceptionResponse implements ExceptionResponseInterface {
  error = true;
  statusCode = HttpStatus.NOT_FOUND;
  constructor(public readonly message: string = 'not found') {}
}
