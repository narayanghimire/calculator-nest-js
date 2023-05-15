import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ClientIdentifierException } from '@app/testcommon/client.identifier.exception';
import { VALID_CLIENT } from './valid.client';

@Injectable()
export class ClientIdentifierMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const xClient = req.headers['x-client'];
    if (!xClient) {
      throw ClientIdentifierException.noHeaderFound();
    }

    if (xClient !== VALID_CLIENT) {
      throw ClientIdentifierException.invalidHeader();
    }

    next();
  }
}
