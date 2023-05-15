import { Inject, Injectable } from '@nestjs/common';
import { ICalculationRepository } from '../repository/calculation.repository.interface';
import { CalculationResult } from '../entities/calculation.result';
import { CalculationException } from '../exception/calculation.exception';
import {
  CALCULATION_REPOSITORY_PERSIST_TOKEN,
  CALCULATION_REPOSITORY_TOKEN,
} from '../constants/constants';
import { CalculationHistoryDto } from '../entities/calculation.history.dto';
import { ICalculationPersistenceRespository } from '../repository/calculation.persistence.respository.interface';

@Injectable()
export class CalculatorService {
  constructor(
    @Inject(CALCULATION_REPOSITORY_TOKEN)
    private readonly calculationRepository: ICalculationRepository,
    @Inject(CALCULATION_REPOSITORY_PERSIST_TOKEN)
    private readonly persist: ICalculationPersistenceRespository,
  ) {}
  async calculate(query: string): Promise<CalculationResult> {
    try {
      const result = this.calculationRepository.calculate(query);
      return new CalculationResult(false, result);
    } catch (error) {
      CalculationException.throwCalculationException();
    }
  }

  async persistCalculation(query: string, result: number) {
    try {
      await this.persist.saveCalculation(query, result);
    } catch (error) {
      CalculationException.throwCannotSaveCalculatedValueException();
    }
  }

  async getQueryCalculationHistory(): Promise<CalculationHistoryDto[]> {
    try {
      return await this.persist.getLastFiveCalculationsHistory();
    } catch (error) {
      CalculationException.throwCalculationHistoryException();
    }
  }
}
