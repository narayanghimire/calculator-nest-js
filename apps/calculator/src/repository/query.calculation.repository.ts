import { ICalculationRepository } from './calculation.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryCalculationRepository implements ICalculationRepository {
  calculate(expression: string): number {
    return eval(expression);
  }
}
