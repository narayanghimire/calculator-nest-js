import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { QueryValidationService } from '@app/calculator/src/services/query.validation.service';
import { QUERY_DECRYPTER_INTERFACE } from '@app/calculator/src/constants/constants';
import { DecrypterInterface } from '@app/calculator/src/decrypter/decrypter.interface';
import { QueryException } from '@app/calculator/src/exception/query.exception';

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
