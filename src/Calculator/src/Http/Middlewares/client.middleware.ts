import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { VALID_CLIENT } from '../../Constants/constants';
import { ClientIdentifierException } from '../../Exception/client.identifier.exception';

@Injectable()
export class ClientMiddleware implements NestMiddleware {
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
