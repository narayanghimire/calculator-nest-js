import { Inject, Injectable } from '@nestjs/common';
import { QUERY_DECRYPTER_INTERFACE } from '@app/calculator/src/constants/constants';
import { DecrypterInterface } from '@app/calculator/src/decrypter/decrypter.interface';

@Injectable()
export class DecryptService {
  constructor(
    @Inject(QUERY_DECRYPTER_INTERFACE)
    private readonly decrypter: DecrypterInterface,
  ) {}

  decrypt(encodedString: string): string {
    return this.decrypter.decrypt(encodedString);
  }
}
