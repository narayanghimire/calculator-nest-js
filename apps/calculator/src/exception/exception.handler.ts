import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CalculationException } from './calculation.exception';
import { DefaultExceptionResponse } from '../http/Responses/defualt.exception.response';
import { NotFoundExceptionResponse } from '../http/Responses/not.found.exception.response';
import { CalculationExceptionResponse } from '../http/Responses/calculation.exception.response';
import { ClientIdentifierExceptionResponse } from '../http/Responses/client.identifier.exception.response';
import { BadRequestExceptionResponse } from '../http/Responses/bad.request.exception.response';
import { QueryException } from './query.exception';
import { QueryExceptionResponse } from '../http/Responses/query.exception.response';
import { ExceptionResponseInterface } from './exception.response.interface';
import { ClientIdentifierException } from '@app/common';

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
