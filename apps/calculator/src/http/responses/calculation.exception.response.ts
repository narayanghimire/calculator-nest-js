import { HttpStatus } from '@nestjs/common';
import { ExceptionResponseInterface } from '@app/calculator/src/exception/exception.response.interface';

export class CalculationExceptionResponse
  implements ExceptionResponseInterface
{
  error = true;
  message: string;
  statusCode = HttpStatus.BAD_REQUEST;
  constructor(message) {
    this.message = message;
  }
}
