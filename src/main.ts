import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:['http://localhost:3001','http://localhost:3000','http://192.168.1.34:3001'],
    methods:'GET,PUT,DELETE,PATCH,POST',
    credentials: true
  })
  //app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();