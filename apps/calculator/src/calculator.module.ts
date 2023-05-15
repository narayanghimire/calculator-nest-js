import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CALCULATION_REPOSITORY_PERSIST_TOKEN,
  CALCULATION_REPOSITORY_TOKEN,
  QUERY_DECRYPTER_INTERFACE,
} from './constants/constants';
import {
  CalculationSchema,
  CalculationSchemaClass,
} from '@app/calculator/src/entities/calculation.schema';
import { CalculatorController } from '@app/calculator/src/http/controllers/calculator.controller';
import { QueryCalculationRepository } from '@app/calculator/src/repository/query.calculation.repository';
import { CalculationPersistenceRepository } from '@app/calculator/src/repository/calculation.persistence.repository';
import { DecrypterProvider } from '@app/calculator/src/decrypter/decrypter.provider';
import { CalculatorService } from '@app/calculator/src/services/calculator.service';
import { DecryptService } from '@app/calculator/src/services/decrypt.service';
import { ExceptionHandler } from '@app/calculator/src/exception';
import { QueryValidationService } from '@app/calculator/src/services/query.validation.service';
import { QueryValidatorMiddleware } from '@app/calculator/src/http/middleware/query.validator.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CalculationSchemaClass.name, schema: CalculationSchema },
    ]),
  ],
  controllers: [CalculatorController],
  providers: [
    {
      provide: CALCULATION_REPOSITORY_TOKEN,
      useClass: QueryCalculationRepository,
    },
    {
      provide: CALCULATION_REPOSITORY_PERSIST_TOKEN,
      useClass: CalculationPersistenceRepository,
    },
    {
      provide: QUERY_DECRYPTER_INTERFACE,
      useClass: DecrypterProvider,
    },
    CalculatorService,
    DecryptService,
    ExceptionHandler,
    QueryValidationService,
  ],
})
export class CalculatorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryValidatorMiddleware)
      .forRoutes({ path: 'calculus', method: RequestMethod.GET });
  }
}
