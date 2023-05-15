import { HttpStatus } from '@nestjs/common';
import {ExceptionResponseInterface} from "@app/calculator/src/exception/exception.response.interface";

export class NotFoundExceptionResponse implements ExceptionResponseInterface {
  error = true;
  statusCode = HttpStatus.NOT_FOUND;
  constructor(public readonly message: string = 'not found') {}
}
