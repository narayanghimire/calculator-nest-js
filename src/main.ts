import { NestFactory } from '@nestjs/core';
import { exceptionHandler } from './Calculator/Exception/exception-handler';
import { ArgumentsHost } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters({
    catch(exception: Error, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const exceptionResponse = exceptionHandler(exception, host);
      if (!response.headersSent) {
        // remove hello2.
        response
          .status(exceptionResponse.statusCode)
          .json({ message: 'hello2' });
      }
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  // get port from env file.
  const port = 3000;
  await app.listen(port);
}
bootstrap();
