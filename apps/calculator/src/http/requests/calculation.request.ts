import { IsNotEmpty, IsString } from 'class-validator';

export class CalculationRequest {
  @IsNotEmpty()
  @IsString()
  query: string;
}
