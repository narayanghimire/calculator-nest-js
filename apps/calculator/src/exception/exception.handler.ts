import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CalculationException } from './calculation.exception';
import { DefaultExceptionResponse } from '../http/responses/defualt.exception.response';
import { NotFoundExceptionResponse } from '../http/responses/not.found.exception.response';
import { CalculationExceptionResponse } from '../http/responses/calculation.exception.response';
import { ClientIdentifierExceptionResponse } from '../http/responses/client.identifier.exception.response';
import { BadRequestExceptionResponse } from '../http/responses/bad.request.exception.response';
import { QueryException } from './query.exception';
import { QueryExceptionResponse } from '../http/responses/query.exception.response';
import { ExceptionResponseInterface } from './exception.response.interface';
import { ClientIdentifierException } from '@app/common/client.identifier.exception';

export class ExceptionHandler {
  handleException(exception: Error): ExceptionResponseInterface {
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

    if (exception instanceof QueryException) {
      return new QueryExceptionResponse(exception.message);
    }

    return new DefaultExceptionResponse();
  }
}
