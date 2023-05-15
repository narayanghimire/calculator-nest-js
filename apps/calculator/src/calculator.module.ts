import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CalculatorController } from './http/Controllers/calculator.controller';
import { CalculatorService } from './services/calculator.service';
import { QueryCalculationRepository } from './repository/query.calculation.repository';
import { DecryptService } from './services/decrypt.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CALCULATION_REPOSITORY_PERSIST_TOKEN,
  CALCULATION_REPOSITORY_TOKEN,
  QUERY_DECRYPTER_INTERFACE,
} from './constants/constants';
import { CalculationPersistenceRepository } from './repository/calculation.persistence.repository';
import { ExceptionHandler } from './exception/exception-handler';
import { DecrypterProvider } from './Decrypter/decrypter.provider';
import { QueryValidationService } from './services/query.validation.service';
import { QueryValidatorMiddleware } from './http/Middleware/query.validator.middleware';
import {
  CalculationSchema,
  CalculationSchemaClass,
} from './entities/calculation.schema';

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
