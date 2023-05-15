import { Injectable } from '@nestjs/common';
import { ICalculationRepository } from '@app/calculator/src/repository/calculation.repository.interface';

@Injectable()
export class QueryCalculationRepository implements ICalculationRepository {
  calculate(expression: string): number {
    return eval(expression);
  }
}
