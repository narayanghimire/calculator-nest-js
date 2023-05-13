import { CalculationResult } from '../../Entities/calculation.result';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculationResponse {
  buildCalculationResultResponse(calculationResult: CalculationResult) {
    return calculationResult;
  }
}
