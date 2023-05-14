import { BadRequestException } from '@nestjs/common';
import { DecryptService } from '../../../../src/Calculator/Services/decrypt.service';

describe('DecryptService', () => {
  let service: DecryptService;

  beforeEach(() => {
    service = new DecryptService();
  });

  describe('decrypt', () => {
    it('should decrypt a valid encoded string', () => {
      const encodedString = 'SGVsbG8gd29ybGQ='; // "Hello world" in base64
      const decryptedString = service.decrypt(encodedString);
      expect(decryptedString).toBe('Hello world');
    });

    it('should throw BadRequestException for an invalid encoded string', () => {
      const encodedString = 'invalidBase64String';
      expect(() => {
        service.decrypt(encodedString);
      }).toThrowError(BadRequestException);
    });
  });
});
