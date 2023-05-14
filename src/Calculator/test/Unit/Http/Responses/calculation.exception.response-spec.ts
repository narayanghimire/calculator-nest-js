import { HttpStatus } from '@nestjs/common';
import { CalculationExceptionResponse } from '../../../../src/Http/Responses/calculation.exception.response';

describe('CalculationExceptionResponse', () => {
  let response: CalculationExceptionResponse;

  beforeEach(() => {
    response = new CalculationExceptionResponse('Custom error message');
  });

  it('should have error set to true', () => {
    expect(response.error).toBe(true);
  });

  it('should have a custom message', () => {
    expect(response.message).toBe('Custom error message');
  });

  it('should have a statusCode of HttpStatus.BAD_REQUEST', () => {
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
