import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response, NextFunction } from 'express';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { QueryValidatorMiddleware } from '@app/calculator/src/http/middleware/query.validator.middleware';
import { DecrypterInterface } from '@app/calculator/src/decrypter/decrypter.interface';
import { QueryValidationService } from '@app/calculator/src/services/query.validation.service';
import { QUERY_DECRYPTER_INTERFACE } from '@app/calculator/src/constants/constants';

class DecrypterInterfaceClass implements DecrypterInterface {
  decrypt(query: string): string {
    return '';
  }
}

describe('QueryValidatorMiddleware', () => {
  let middleware: QueryValidatorMiddleware;
  let mockQueryValidationService: QueryValidationService;
  let mockDecrypter: DecrypterInterfaceClass;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(async () => {
    mockQueryValidationService = mock(QueryValidationService);
    mockDecrypter = mock(DecrypterInterfaceClass);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryValidatorMiddleware,
        {
          provide: QueryValidationService,
          useValue: instance(mockQueryValidationService),
        },
        {
          provide: QUERY_DECRYPTER_INTERFACE,
          useValue: instance(mockDecrypter),
        },
      ],
    }).compile();

    middleware = module.get<QueryValidatorMiddleware>(QueryValidatorMiddleware);

    req = { query: { query: 'test-query' } } as unknown as Request;
    res = {} as Response;
    next = jest.fn() as NextFunction;
  });

  it('should validate base64 query and decrypt it', () => {
    when(
      mockQueryValidationService.isBase64EncodedString(anything()),
    ).thenReturn(true);
    when(mockDecrypter.decrypt(anything())).thenReturn('decrypted-query');

    middleware.use(req, res, next);

    verify(mockQueryValidationService.isBase64EncodedString(anything())).once();
    verify(mockDecrypter.decrypt(anything())).once();
    expect(next).toBeCalledTimes(1);
  });

  it('should throw error when query is not base64 encoded', () => {
    when(
      mockQueryValidationService.isBase64EncodedString(anything()),
    ).thenReturn(false);

    expect(() => middleware.use(req, res, next)).toThrowError();

    verify(mockQueryValidationService.isBase64EncodedString(anything())).once();
    verify(mockDecrypter.decrypt(anything())).never();
  });

  it('should throw error when query can not be decrypted', () => {
    when(
      mockQueryValidationService.isBase64EncodedString(anything()),
    ).thenReturn(true);
    when(mockDecrypter.decrypt(anything())).thenThrow(new Error());

    expect(() => middleware.use(req, res, next)).toThrowError();

    verify(mockQueryValidationService.isBase64EncodedString(anything())).once();
    verify(mockDecrypter.decrypt(anything())).once();
  });
});
