import { IsBoolean, IsNumber } from 'class-validator';

export class CalculationResult {
  @IsBoolean()
  private readonly error: boolean;

  @IsNumber()
  private readonly result: number;

  constructor(error = false, result: number) {
    this.error = error;
    this.result = result;
  }

  getResult(): number {
    return this.result;
  }

  getError(): boolean {
    return this.error;
  }
}
