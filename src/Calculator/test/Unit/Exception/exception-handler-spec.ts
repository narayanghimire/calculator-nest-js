import { exceptionHandler } from '../../../src/Exception/exception-handler';
import { logger } from '../../../src/Config/logger';
import { CalculationException } from '../../../src/Exception/calculation.exception';
import { ClientIdentifierException } from '../../../src/Exception/client.identifier.exception';
import { CalculationExceptionResponse } from '../../../src/Http/Responses/calculation.exception.response';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { NotFoundExceptionResponse } from '../../../src/Http/Responses/not-found-exception.response';
import { DefaultExceptionResponse } from '../../../src/Http/Responses/defualt-exception.response';
import { BadRequestExceptionResponse } from '../../../src/Http/Responses/bad-request.exception.response';
import { ClientIdentifierExceptionResponse } from '../../../src/Http/Responses/client-identifier-exception.response';

jest.mock('../Config/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('exceptionHandler', () => {
  let error: Error;
  let host: any;
  let response: any;
  let jsonFn: jest.Mock;

  beforeEach(() => {
    error = new Error('Test error');
    host = {
      switchToHttp: jest.fn(() => ({
        getResponse: jest.fn(() => response),
      })),
    };
    response = {
      status: jest.fn(() => response),
      json: jest.fn(),
    };
    jsonFn = response.json;
  });

  it('should log the error', () => {
    exceptionHandler(error, host);

    expect(logger.error).toHaveBeenCalledWith(error);
  });

  it('should handle CalculationException', () => {
    const calculationException = new CalculationException('Calculation error');
    const expectedResponse = new CalculationExceptionResponse(
      calculationException.message,
    );

    exceptionHandler(calculationException, host);

    expect(response.status).toHaveBeenCalledWith(expectedResponse.statusCode);
    expect(jsonFn).toHaveBeenCalledWith(expectedResponse);
  });

  it('should handle ClientIdentifierException', () => {
    const clientIdentifierException = new ClientIdentifierException(
      'Client identifier error',
    );
    const expectedResponse = new ClientIdentifierExceptionResponse(
      clientIdentifierException.message,
    );

    exceptionHandler(clientIdentifierException, host);

    expect(response.status).toHaveBeenCalledWith(expectedResponse.statusCode);
    expect(jsonFn).toHaveBeenCalledWith(expectedResponse);
  });

  it('should handle NotFoundException', () => {
    const notFoundException = new NotFoundException('Resource not found');
    const expectedResponse = new NotFoundExceptionResponse();

    exceptionHandler(notFoundException, host);

    expect(response.status).toHaveBeenCalledWith(expectedResponse.statusCode);
    expect(jsonFn).toHaveBeenCalledWith(expectedResponse);
  });

  it('should handle BadRequestException', () => {
    const badRequestException = new BadRequestException('Bad request');
    const expectedResponse = new BadRequestExceptionResponse();

    exceptionHandler(badRequestException, host);

    expect(response.status).toHaveBeenCalledWith(expectedResponse.statusCode);
    expect(jsonFn).toHaveBeenCalledWith(expectedResponse);
  });

  it('should handle other exceptions with DefaultExceptionResponse', () => {
    const expectedResponse = new DefaultExceptionResponse();

    exceptionHandler(error, host);

    expect(response.status).toHaveBeenCalledWith(expectedResponse.statusCode);
    expect(jsonFn).toHaveBeenCalledWith(expectedResponse);
  });
});
