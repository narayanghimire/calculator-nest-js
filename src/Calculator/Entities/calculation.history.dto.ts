import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CalculationHistoryDto {
  @Expose()
  @IsString()
  query: string;

  @Expose()
  @IsNumber()
  result: number;

  @Exclude()
  _id: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}
