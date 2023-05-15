import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionHandler } from '../../../src/exception/exception-handler';
import { CalculationExceptionResponse } from '../../../src/http/Responses/calculation.exception.response';
import { CalculationException } from '../../../src/exception/calculation.exception';
import { ClientIdentifierExceptionResponse } from '../../../src/http/Responses/client-identifier-exception.response';
import { NotFoundExceptionResponse } from '../../../src/http/Responses/not-found-exception.response';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DefaultExceptionResponse } from '../../../src/http/Responses/defualt-exception.response';
import { BadRequestExceptionResponse } from '../../../src/http/Responses/bad-request.exception.response';
import { ClientIdentifierException } from '@app/common';
describe('ExceptionHandler', () => {
  let exceptionHandler: ExceptionHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();
    exceptionHandler = module.get<ExceptionHandler>(ExceptionHandler);
  });

  it('should handle CalculationException', () => {
    const calculationException = new CalculationException('Calculation error');
    const response = exceptionHandler.handleException(calculationException);
    expect(response).toBeInstanceOf(CalculationExceptionResponse);
    expect(response.message).toBe(calculationException.message);
  });

  it('should handle ClientIdentifierException', () => {
    const clientIdentifierException = new ClientIdentifierException(
      'Client identifier error',
    );
    const response = exceptionHandler.handleException(
      clientIdentifierException,
    );
    expect(response).toBeInstanceOf(ClientIdentifierExceptionResponse);
    expect(response.message).toBe(clientIdentifierException.message);
  });

  it('should handle NotFoundException', () => {
    const notFoundException = new NotFoundException('Resource not found');
    const response = exceptionHandler.handleException(notFoundException);
    expect(response).toBeInstanceOf(NotFoundExceptionResponse);
  });

  it('should handle BadRequestException', () => {
    const badRequestException = new BadRequestException('Bad request');
    const response = exceptionHandler.handleException(badRequestException);
    expect(response).toBeInstanceOf(BadRequestExceptionResponse);
  });

  it('should handle other exceptions with DefaultExceptionResponse', () => {
    const error = new Error('Test error');
    const response = exceptionHandler.handleException(error);
    expect(response).toBeInstanceOf(DefaultExceptionResponse);
  });
});
