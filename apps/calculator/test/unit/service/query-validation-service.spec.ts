import { QueryValidationService } from '@app/calculator/src/services/query.validation.service';

describe('QueryValidationService', () => {
  let service: QueryValidationService;

  beforeEach(() => {
    service = new QueryValidationService();
  });

  describe('isBase64EncodedString', () => {
    it('should return true for a valid base64 encoded string', () => {
      const validBase64String = 'SGVsbG8gd29ybGQ=';
      const result = service.isBase64EncodedString(validBase64String);
      expect(result).toBe(true);
    });

    it('should return false for an invalid base64 encoded string', () => {
      const invalidBase64String = 'Hello world';
      const result = service.isBase64EncodedString(invalidBase64String);
      expect(result).toBe(false);
    });
  });
});
