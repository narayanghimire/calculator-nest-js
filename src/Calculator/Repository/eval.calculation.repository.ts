import { ICalculationRepository } from '../Interface/calculation.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EvalCalculationRepository implements ICalculationRepository {
  calculate(expression: string): number {
    // Using eval is a bad idea , you may need to rething the way you calculate .
    return eval(expression);
  }
}
