import { CalculationHistoryDto } from '../Entities/calculation.history.dto';

export interface ICalculationPersistenceRespository {
  saveCalculation(query: string, result: number): Promise<void>;
  getLastFiveCalculationsHistory(): Promise<CalculationHistoryDto[]>;
}
