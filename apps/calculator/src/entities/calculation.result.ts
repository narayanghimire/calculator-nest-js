import { IsBoolean, IsNumber } from 'class-validator';

export class CalculationResult {
  @IsBoolean()
  readonly error: boolean;

  @IsNumber()
  readonly result: number;

  constructor(result: number, error = false) {
    this.error = error;
    this.result = result;
  }
}
