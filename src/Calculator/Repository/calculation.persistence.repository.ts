import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICalculationPersistenceRespository } from '../Interface/calculation.persistence.respository';
import { plainToInstance } from 'class-transformer';
import { Calculation } from '../Entities/calculation';
import { CalculationHistoryDto } from '../Entities/calculation.history.dto';

@Injectable()
export class CalculationPersistenceRepository
  implements ICalculationPersistenceRespository
{
  constructor(
    @InjectModel(Calculation.name) private calculationModel: Model<Calculation>,
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
      // Not sure but what happens if we keep calculation only instead of calculation.toObject() ?
      plainToInstance(CalculationHistoryDto, calculation.toObject()),
    );
  }
}
