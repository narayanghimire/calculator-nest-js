import { CalculatorModule } from './calculator.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ClientIdentifierModule } from '@app/common/middlewares/client.identifier.module';

@Module({
  imports: [
    CalculatorModule,
    MongooseModule.forRoot(`mongodb://mongodb:27017/calculator`),
    ClientIdentifierModule,
  ],
})
export class AppModule {}
