import { NestFactory } from '@nestjs/core';
import { NestSimpleApiModule } from './nest-simple-api.module';

async function bootstrap() {
  const app = await NestFactory.create(NestSimpleApiModule);
  await app.listen(3000);
}
bootstrap();
