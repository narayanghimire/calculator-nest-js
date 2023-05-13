import { HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from '../../Interface/exception.response';

export class CalculationExceptionResponse implements ExceptionResponse {
  error = false;
  message: string;
  constructor(message = 'invalid x-client header') {
    this.message = message;
  }

  get statusCode(): number {
    return HttpStatus.BAD_REQUEST;
  }
}
