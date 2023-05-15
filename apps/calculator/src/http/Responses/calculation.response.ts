import { CalculationResult } from '../../entities/calculation.result';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculationResponse {
  buildCalculationResultResponse(
    calculationResult: CalculationResult,
  ): CalculationResult {
    return calculationResult;
  }
}
