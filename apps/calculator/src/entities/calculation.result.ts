import { IsBoolean, IsNumber } from 'class-validator';

export class CalculationResult {
  @IsBoolean()
  readonly error: boolean;

  @IsNumber()
  readonly result: number;

  constructor(error = false, result: number) {
    this.error = error;
    this.result = result;
  }
}
