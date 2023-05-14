import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { VALID_CLIENT } from '../../Constants/constants';
import { ClientIdentifierException } from '../../Exception/client.identifier.exception';

// Midleware could be used by other modules so keep it in src/common or src/core !!
@Injectable()
export class ClientMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const xClient = req.headers['x-client'];
    if (!xClient) {
      ClientIdentifierException.noHeaderFound();
    }

    if (xClient !== VALID_CLIENT) {
      ClientIdentifierException.invalidHeader();
    }

    next();
  }
}
