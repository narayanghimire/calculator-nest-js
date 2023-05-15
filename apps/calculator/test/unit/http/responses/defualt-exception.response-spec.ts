import { HttpStatus } from '@nestjs/common';
import { DefaultExceptionResponse } from '../../../../src/http/Responses/defualt-exception.response';

describe('DefaultExceptionResponse', () => {
  let response: DefaultExceptionResponse;

  beforeEach(() => {
    response = new DefaultExceptionResponse();
  });

  it('should have error set to true', () => {
    expect(response.error).toBe(true);
  });

  it('should have a default message', () => {
    expect(response.message).toBe('Whoops, something went wrong');
  });

  it('should have a statusCode of HttpStatus.INTERNAL_SERVER_ERROR', () => {
    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should accept a custom message', () => {
    const customMessage = 'Custom error message';
    const responseWithCustomMessage = new DefaultExceptionResponse(
      customMessage,
    );
    expect(responseWithCustomMessage.message).toBe(customMessage);
  });
});
