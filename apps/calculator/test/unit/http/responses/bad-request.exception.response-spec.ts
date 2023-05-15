import { HttpStatus } from '@nestjs/common';
import { BadRequestExceptionResponse } from '../../../../src/http/Responses/bad.request.exception.response';

describe('BadRequestExceptionResponse', () => {
  let response: BadRequestExceptionResponse;

  beforeEach(() => {
    response = new BadRequestExceptionResponse();
  });

  it('should have error set to true', () => {
    expect(response.error).toBe(true);
  });

  it('should have a default message', () => {
    expect(response.message).toBe('Invalid request');
  });

  it('should have a statusCode of HttpStatus.BAD_REQUEST', () => {
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should accept a custom message', () => {
    const customMessage = 'Custom error message';
    const responseWithCustomMessage = new BadRequestExceptionResponse(
      customMessage,
    );
    expect(responseWithCustomMessage.message).toBe(customMessage);
  });
});
