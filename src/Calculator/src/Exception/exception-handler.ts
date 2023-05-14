import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CalculationException } from './calculation.exception';
import { ClientIdentifierException } from './client.identifier.exception';
import { DefaultExceptionResponse } from '../Http/Responses/defualt-exception.response';
import { NotFoundExceptionResponse } from '../Http/Responses/not-found-exception.response';
import { CalculationExceptionResponse } from '../Http/Responses/calculation.exception.response';
import { ClientIdentifierExceptionResponse } from '../Http/Responses/client-identifier-exception.response';
import { BadRequestExceptionResponse } from '../Http/Responses/bad-request.exception.response';
import { ExceptionResponse } from '../Interface/exception.response';

export class ExceptionHandler {
  handleException(exception: Error): ExceptionResponse {
    if (exception instanceof CalculationException) {
      return new CalculationExceptionResponse(exception.message);
    }

    if (exception instanceof ClientIdentifierException) {
      return new ClientIdentifierExceptionResponse(exception.message);
    }

    if (exception instanceof NotFoundException) {
      return new NotFoundExceptionResponse();
    }

    if (exception instanceof BadRequestException) {
      return new BadRequestExceptionResponse();
    }

    return new DefaultExceptionResponse();
  }
}
