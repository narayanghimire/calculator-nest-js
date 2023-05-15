import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { QueryException } from '../../exception/query.exception';
import { QueryValidationService } from '../../services/query.validation.service';
import { DecrypterInterface } from '../../Decrypter/decrypter.interface';
import { QUERY_DECRYPTER_INTERFACE } from '../../constants/constants';

@Injectable()
export class QueryValidatorMiddleware implements NestMiddleware {
  constructor(
    private readonly queryValidationService: QueryValidationService,
    @Inject(QUERY_DECRYPTER_INTERFACE)
    private readonly decrypter: DecrypterInterface,
  ) {}
  use(req: Request, res: Response, next: NextFunction): void {
    const query = req.query.query as string;
    if (!this.queryValidationService.isBase64EncodedString(query)) {
      throw QueryException.throwIsNotBase64IncodedString();
    }
    try {
      this.decrypter.decrypt(query);
    } catch (err) {
      throw QueryException.throwInvalidString();
    }

    next();
  }
}
