import { CalculationHistoryDto } from '@app/calculator/src/entities/calculation.history.dto';

export interface ICalculationPersistenceRespository {
  saveCalculation(query: string, result: number): Promise<void>;
  getLastFiveCalculationsHistory(): Promise<CalculationHistoryDto[]>;
}
