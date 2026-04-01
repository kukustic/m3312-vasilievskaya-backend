import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

   app.setBaseViewsDir(join(process.cwd(), 'views'));
   app.setViewEngine('ejs');
   app.useStaticAssets(join(process.cwd(), 'public'));
   app.use(express.urlencoded({ extended: true }));
   app.use(express.json());

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}

bootstrap();