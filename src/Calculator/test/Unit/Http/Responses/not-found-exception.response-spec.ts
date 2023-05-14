import { HttpStatus } from '@nestjs/common';
import { NotFoundExceptionResponse } from '../../../../src/Http/Responses/not-found-exception.response';

describe('NotFoundExceptionResponse', () => {
  let response: NotFoundExceptionResponse;

  beforeEach(() => {
    response = new NotFoundExceptionResponse();
  });

  it('should have error set to true', () => {
    expect(response.error).toBe(true);
  });

  it('should have a default message', () => {
    expect(response.message).toBe('not found');
  });

  it('should have a statusCode of HttpStatus.NOT_FOUND', () => {
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('should accept a custom message', () => {
    const customMessage = 'Custom error message';
    const responseWithCustomMessage = new NotFoundExceptionResponse(
      customMessage,
    );
    expect(responseWithCustomMessage.message).toBe(customMessage);
  });
});
