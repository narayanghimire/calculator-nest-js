import { CalculatorModule } from './Calculator/calculator.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ClientMiddleware } from './Calculator/Http/Middlewares/client.middleware';

@Module({
  imports: [
    CalculatorModule,
    MongooseModule.forRoot(`mongodb+srv://narayanghimire123:meronepal123@cluster0.llnpodo.mongodb.net/?retryWrites=true&w=majority`),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClientMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
