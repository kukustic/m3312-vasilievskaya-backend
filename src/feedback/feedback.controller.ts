import {
  Body,
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Redirect,
  Render,
  Sse,
} from '@nestjs/common';
import { map } from 'rxjs';
import { CreateFeedbackDto } from './dto/create-feedback.dto.js';
import { UpdateFeedbackDto } from './dto/update-feedback.dto.js';
import { FeedbackService } from './feedback.service.js';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  private parseId(rawId: string) {
    const id = Number(rawId);
    if (!Number.isInteger(id)) throw new BadRequestException('Invalid id');
    return id;
  }

  @Get()
  @Render('feedback')
  async list(@Query('auth') auth?: string) {
    const reviews = await this.feedbackService.listReviews();
    return { loggedIn: auth === 'true', reviews };
  }

  @Sse('sse')
  sse() {
    return this.feedbackService.getEventStream().pipe(
      map((payload) => ({
        data: payload,
      })),
    );
  }

  @Get('add')
  @Render('feedback-add')
  addForm(@Query('auth') auth?: string) {
    return { loggedIn: auth === 'true' };
  }

  @Post()
  @Redirect('/feedback')
  async create(@Body() dto: CreateFeedbackDto) {
    await this.feedbackService.createReview(dto);
    return;
  }

  @Get(':id')
  @Render('feedback-show')
  async show(@Param('id') id: string, @Query('auth') auth?: string) {
    const review = await this.feedbackService.getReview(this.parseId(id));
    return { loggedIn: auth === 'true', review };
  }

  @Get(':id/edit')
  @Render('feedback-edit')
  async editForm(@Param('id') id: string, @Query('auth') auth?: string) {
    const review = await this.feedbackService.getReview(this.parseId(id));
    return { loggedIn: auth === 'true', review };
  }

  // For HTML forms (since they only support GET/POST)
  @Post(':id')
  @Redirect('/feedback')
  async updateFromForm(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    await this.feedbackService.updateReview(this.parseId(id), dto);
    return;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    return await this.feedbackService.updateReview(this.parseId(id), dto);
  }

  // For HTML forms
  @Post(':id/delete')
  @Redirect('/feedback')
  async deleteFromForm(@Param('id') id: string) {
    await this.feedbackService.deleteReview(this.parseId(id));
    return;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.feedbackService.deleteReview(this.parseId(id));
  }
}

