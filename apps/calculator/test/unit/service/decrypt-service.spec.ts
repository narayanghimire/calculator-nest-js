import { DecryptService } from '../../../src/services/decrypt.service';
import { DecrypterInterface } from '../../../src/Decrypter/decrypter.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { QUERY_DECRYPTER_INTERFACE } from '../../../src/constants/constants';

describe('DecryptService', () => {
  let service: DecryptService;
  let decrypterInterface;

  beforeEach(async () => {
    decrypterInterface = {
      decrypt: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DecryptService,
        {
          provide: QUERY_DECRYPTER_INTERFACE,
          useValue: decrypterInterface,
        },
      ],
    }).compile();

    service = module.get<DecryptService>(DecryptService);
  });

  describe('decrypt', () => {
    it('should call the decrypt method of the decrypter with the provided encoded string', () => {
      const encodedString = 'SGVsbG8gd29ybGQ=';
      const decryptedString = '2+3-(3*9)/12';
      decrypterInterface.decrypt.mockReturnValue(decryptedString);
      const result = service.decrypt(encodedString);
      expect(decrypterInterface.decrypt).toHaveBeenCalledWith(encodedString);
      expect(result).toBe(decryptedString);
    });
  });
});
