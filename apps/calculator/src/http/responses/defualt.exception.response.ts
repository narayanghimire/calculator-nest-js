import { HttpStatus } from '@nestjs/common';
import { ExceptionResponseInterface } from '../../exception/exception.response.interface';

export class DefaultExceptionResponse implements ExceptionResponseInterface {
  error = true;
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(
    public readonly message: string = 'Whoops, something went wrong',
  ) {}
}
