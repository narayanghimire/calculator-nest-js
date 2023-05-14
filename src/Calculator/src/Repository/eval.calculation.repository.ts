import { ICalculationRepository } from "../Interface/calculation.repository.interface";
import { Injectable } from '@nestjs/common';

@Injectable()
export class EvalCalculationRepository implements ICalculationRepository {
  calculate(expression: string): number {
    return eval(expression);
  }
}
