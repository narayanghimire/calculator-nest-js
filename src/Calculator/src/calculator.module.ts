import { Module } from '@nestjs/common';
import { CalculatorController } from './Http/Controllers/calculator.controller';
import { CalculatorService } from './Services/calculator.service';
import { EvalCalculationRepository } from './Repository/eval.calculation.repository';
import { CalculationResponse } from './Http/Responses/calculation.response';
import { DecryptService } from './Services/decrypt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Calculation, CalculationSchema } from './Entities/calculation';
import {
  CALCULATION_REPOSITORY_PERSIST_TOKEN,
  CALCULATION_REPOSITORY_TOKEN,
  LOGGER_TOKEN,
} from './Constants/constants';
import { CalculationPersistenceRepository } from './Repository/calculation.persistence.repository';
import logger from './Logger/logger';
import { ExceptionHandler } from './Exception/exception-handler';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calculation.name, schema: CalculationSchema },
    ]),
  ],
  controllers: [CalculatorController],
  providers: [
    {
      provide: CALCULATION_REPOSITORY_TOKEN,
      useClass: EvalCalculationRepository,
    },
    {
      provide: CALCULATION_REPOSITORY_PERSIST_TOKEN,
      useClass: CalculationPersistenceRepository,
    },
    {
      provide: LOGGER_TOKEN,
      useValue: logger,
    },
    CalculatorService,
    DecryptService,
    CalculationResponse,
    ExceptionHandler,
  ],
})
export class CalculatorModule {}
