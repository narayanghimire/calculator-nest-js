import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DecryptService {
  private decryptedString: string | boolean;
  decrypt(encodedString: string): string {
    try {
      this.decryptedString = Buffer.from(encodedString, 'base64').toString();
    } catch (err) {
      throw new BadRequestException('Invalid encoded string given');
    }

    return this.decryptedString;
  }
}
