import { logger } from '../Config/logger';
import { CalculationException } from './calculation.exception';
import { ArgumentsHost, BadRequestException, NotFoundException } from "@nestjs/common";
import { ClientIdentifierException } from './client.identifier.exception';
import { CalculationExceptionResponse } from '../Http/Responses/calculation.exception.response';
import { ClientIdentifierExceptionResponse } from '../Http/Responses/client-identifier-exception.response';
import { BadRequestExceptionResponse } from '../Http/Responses/bad-request.exception.response';
import { NotFoundExceptionResponse } from '../Http/Responses/not-found-exception.response';
import { DefaultExceptionResponse } from '../Http/Responses/defualt-exception.response';

export function exceptionHandler(error: Error, host: ArgumentsHost) {
  logger.error(error);
  const ctx = host.switchToHttp();
  const response = ctx.getResponse();

  if (error instanceof CalculationException) {
    const calculationExceptionResponse = new CalculationExceptionResponse(
      error.message,
    );

    return response
      .status(calculationExceptionResponse.statusCode)
      .json(calculationExceptionResponse);
  }

  if (error instanceof ClientIdentifierException) {
    const clientIdentifierExceptionResponse =
      new ClientIdentifierExceptionResponse(error.message);

    return response
      .status(clientIdentifierExceptionResponse.statusCode)
      .json(clientIdentifierExceptionResponse);
  }

  if (error instanceof NotFoundException) {
    const notFoundExceptionResponse = new NotFoundExceptionResponse();

    return response
      .status(notFoundExceptionResponse.statusCode)
      .json(notFoundExceptionResponse);
  }

  if (error instanceof BadRequestException) {
    const badRequestExceptionResponse = new BadRequestExceptionResponse();
    return response
      .status(badRequestExceptionResponse.statusCode)
      .json(badRequestExceptionResponse);
  }

  const defaultExceptionResponse = new DefaultExceptionResponse();

  return response
    .status(defaultExceptionResponse.statusCode)
    .json(defaultExceptionResponse);
}
