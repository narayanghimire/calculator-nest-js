import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryValidationService {
  isBase64EncodedString(string: string): boolean {
    return /^[A-Za-z0-9+/=]+$/i.test(string);
  }
}
