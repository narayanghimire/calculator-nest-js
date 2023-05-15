import { Controller, Get } from '@nestjs/common';
import { CalculatorService } from '../../services/calculator.service';
import { DecryptService } from '../../services/decrypt.service';
import { Query } from '@nestjs/common';
import { CalculationRequest } from '../Requests/calculation.request';
import { CalculationHistoryDto } from '../../entities/calculation.history.dto';
import { CalculationResult } from '../../entities/calculation.result';

@Controller()
export class CalculatorController {
  constructor(
    private readonly calculatorService: CalculatorService,
    private readonly decryptService: DecryptService,
  ) {}

  @Get('calculus')
  async calculate(
    @Query() calculationRequest: CalculationRequest,
  ): Promise<CalculationResult> {
    const query = calculationRequest.query;
    const decryptedString = this.decryptService.decrypt(query);

    const calculationResult = await this.calculatorService.calculate(
      decryptedString,
    );
    await this.calculatorService.persistCalculation(
      query,
      calculationResult.result,
    );

    return calculationResult;
  }
  @Get('calculus/history')
  async getQueryCalculationHistory(): Promise<CalculationHistoryDto[]> {
    return await this.calculatorService.getQueryCalculationHistory();
  }
}
