import { Inject, Injectable } from '@nestjs/common';
import { DecrypterInterface } from '../Decrypter/decrypter.interface';
import { QUERY_DECRYPTER_INTERFACE } from '../constants/constants';

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
