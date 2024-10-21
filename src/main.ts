import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const PORT = 8080;
  await app.listen(PORT);
  console.log('Server is running on port: ', PORT);
}
bootstrap();
