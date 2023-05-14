import { Inject, Injectable } from '@nestjs/common';
import { ICalculationRepository } from '../Interface/calculation.repository.interface';
import { CalculationResult } from '../Entities/calculation.result';
import { CalculationException } from '../Exception/calculation.exception';
import {
  CALCULATION_REPOSITORY_PERSIST_TOKEN,
  CALCULATION_REPOSITORY_TOKEN, LOGGER_TOKEN,
} from '../Constants/constants';
import { ICalculationPersistenceRespository } from '../Interface/calculation.persistence.respository';
import { CalculationHistoryDto } from '../Entities/calculation.history.dto';
import { ILogger } from '../Logger/logger.interface';

@Injectable()
export class CalculatorService {
  constructor(
    @Inject(CALCULATION_REPOSITORY_TOKEN)
    private readonly calculationRepository: ICalculationRepository,
    @Inject(CALCULATION_REPOSITORY_PERSIST_TOKEN)
    private readonly persist: ICalculationPersistenceRespository,
    @Inject(LOGGER_TOKEN)
    private logger: ILogger,
  ) {}
  async calculate(query: string): Promise<CalculationResult> {
    try {
      const result = this.calculationRepository.calculate(query);
      return new CalculationResult(false, result);
    } catch (error) {
      this.logger.error(error);
      CalculationException.throwCalculationException();
    }
  }

  async persistCalculation(query: string, result: number) {
    try {
      await this.persist.saveCalculation(query, result);
    } catch (error) {
      this.logger.error(error);
      CalculationException.throwCannotSaveCalculatedValueException();
    }
  }

  async getQueryCalculationHistory(): Promise<CalculationHistoryDto[]> {
    try {
      return await this.persist.getLastFiveCalculationsHistory();
    } catch (error) {
      this.logger.error(error);
      CalculationException.throwCalculationHistoryException();
    }
  }
}
