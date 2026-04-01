import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto.js';
import { FeedbackService } from './feedback.service.js';

@Controller('api/feedback')
export class FeedbackApiController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  async list() {
    return await this.feedbackService.listReviews();
  }

  @Post()
  async create(@Body() dto: CreateFeedbackDto) {
    return await this.feedbackService.createReview(dto);
  }
}

