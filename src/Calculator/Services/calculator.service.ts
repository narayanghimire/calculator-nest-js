import { Inject, Injectable } from '@nestjs/common';
import { ICalculationRepository } from '../Interface/calculation.repository.interface';
import { CalculationResult } from '../Entities/calculation.result';
import { CalculationException } from '../Exception/calculation.exception';
import { logger } from '../Config/logger';
import {
  CALCULATION_REPOSITORY_PERSIST_TOKEN,
  CALCULATION_REPOSITORY_TOKEN,
} from '../Constants/constants';
import { ICalculationPersistenceRespository } from '../Interface/calculation.persistence.respository';
import { CalculationHistoryDto } from '../Entities/calculation.history.dto';

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
      // explained in class.
      return new CalculationResult(result);
    } catch (error) {
      logger.error(error);
      CalculationException.throwCalculationException();
    }
  }

  async persistCalculation(query: string, result: number) {
    try {
      await this.persist.saveCalculation(query, result);
    } catch (error) {
      logger.error(error);
      CalculationException.throwCannotSaveCalculatedValueException();
    }
  }

  async getQueryCalculationHistory(): Promise<CalculationHistoryDto[]> {
    try {
      return await this.persist.getLastFiveCalculationsHistory();
    } catch (error) {
      logger.error(error);
      CalculationException.throwCalculationHistoryException();
    }
  }
}
