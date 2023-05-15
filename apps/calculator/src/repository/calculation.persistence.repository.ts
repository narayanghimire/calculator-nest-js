import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { CalculationSchemaClass } from '@app/calculator/src/entities/calculation.schema';
import { CalculationHistoryDto } from '@app/calculator/src/entities/calculation.history.dto';
import { ICalculationPersistenceRespository } from '@app/calculator/src/repository/calculation.persistence.respository.interface';

@Injectable()
export class CalculationPersistenceRepository
  implements ICalculationPersistenceRespository
{
  constructor(
    @InjectModel(CalculationSchemaClass.name)
    private calculationModel: Model<CalculationSchemaClass>,
  ) {}

  async saveCalculation(query: string, result: number): Promise<void> {
    await this.calculationModel.create({ query, result });
  }

  async getLastFiveCalculationsHistory(): Promise<CalculationHistoryDto[]> {
    const calculationHistory = await this.calculationModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();

    return calculationHistory.map((calculation) =>
      plainToInstance(CalculationHistoryDto, calculation.toObject()),
    );
  }
}
