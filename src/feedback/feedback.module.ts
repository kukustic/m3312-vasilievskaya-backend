import { Module } from '@nestjs/common';
import { FeedbackApiController } from './feedback.api.controller.js';
import { FeedbackController } from './feedback.controller.js';
import { FeedbackService } from './feedback.service.js';

@Module({
  controllers: [FeedbackController, FeedbackApiController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}

