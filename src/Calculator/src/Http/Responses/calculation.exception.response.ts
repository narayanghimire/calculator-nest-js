import { HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from '../../Interface/exception.response';

export class CalculationExceptionResponse implements ExceptionResponse {
  error = true;
  message: string;
  constructor(message) {
    this.message = message;
  }

  get statusCode(): number {
    return HttpStatus.BAD_REQUEST;
  }
}