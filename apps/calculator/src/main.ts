import { NestFactory } from '@nestjs/core';
import { ExceptionHandler } from './exception/exception.handler';
import { ArgumentsHost } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import {AppModule} from "@app/calculator/src/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters({
    catch(exception: Error, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      // Create an instance of the ExceptionHandler class
      const exceptionHandler = app
        .get(ExceptionHandler)
        .handleException(exception);

      response.status(exceptionHandler.statusCode).json({
        error: exceptionHandler.error,
        message: exceptionHandler.message,
      });
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8001, '0.0.0.0');
}
bootstrap();
