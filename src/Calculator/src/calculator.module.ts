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
} from './Constants/constants';
import { CalculationPersistenceRepository } from './Repository/calculation.persistence.repository';
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
    CalculatorService,
    DecryptService,
    CalculationResponse,
  ],
})
export class CalculatorModule {}
