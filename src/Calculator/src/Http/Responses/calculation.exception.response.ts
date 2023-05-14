import { HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from '../../Interface/exception.response';

export class CalculationExceptionResponse implements ExceptionResponse {
  error = true;
  message: string;
  statusCode = HttpStatus.BAD_REQUEST;
  constructor(message) {
    this.message = message;
  }
}
