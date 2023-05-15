import { ClientIdentifierMiddleware } from '@app/common';
import { ClientIdentifierException } from '@app/common/middlewares/client.identifier.exception';
import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  NestModule,
} from '@nestjs/common';

@Module({
  imports: [ClientIdentifierModule],
  exports: [ClientIdentifierModule],
})
export class ClientIdentifierModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClientIdentifierMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
