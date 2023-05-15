import { HttpStatus } from '@nestjs/common';
import { ClientIdentifierExceptionResponse } from '../../../../src/http/Responses/client-identifier-exception.response';

describe('ClientIdentifierExceptionResponse', () => {
  let response: ClientIdentifierExceptionResponse;

  beforeEach(() => {
    response = new ClientIdentifierExceptionResponse();
  });

  it('should have error set to true', () => {
    expect(response.error).toBe(true);
  });

  it('should have a default message', () => {
    expect(response.message).toBe('invalid x-client header');
  });

  it('should have a statusCode of HttpStatus.NOT_FOUND', () => {
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('should accept a custom message', () => {
    const customMessage = 'Custom error message';
    const responseWithCustomMessage = new ClientIdentifierExceptionResponse(
      customMessage,
    );
    expect(responseWithCustomMessage.message).toBe(customMessage);
  });
});
