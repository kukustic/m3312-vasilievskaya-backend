import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { FeedbackModule } from './feedback/feedback.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Module({
  imports: [
    PrismaModule,
    FeedbackModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}