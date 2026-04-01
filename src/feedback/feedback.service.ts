import { Injectable, NotFoundException } from '@nestjs/common';
import { Subject } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateFeedbackDto } from './dto/create-feedback.dto.js';
import { UpdateFeedbackDto } from './dto/update-feedback.dto.js';
import { FeedbackEventPayload } from './feedback.events.js';

@Injectable()
export class FeedbackService {
  private readonly events$ = new Subject<FeedbackEventPayload>();

  constructor(private readonly prisma: PrismaService) {}

  getEventStream() {
    return this.events$.asObservable();
  }

  async listReviews() {
    return this.prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
  }

  async getReview(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async createReview(dto: CreateFeedbackDto) {
    const { name, email, message } = dto;

    const user =
      (await this.prisma.user.findUnique({ where: { email } })) ??
      (await this.prisma.user.create({ data: { name, email } }));

    const review = await this.prisma.review.create({
      data: {
        message,
        userId: user.id,
      },
      include: { user: true },
    });

    this.events$.next({
      type: 'created',
      reviewId: review.id,
      userEmail: review.user.email,
      createdAt: review.createdAt.toISOString(),
    });

    return review;
  }

  async updateReview(id: number, dto: UpdateFeedbackDto) {
    await this.getReview(id);

    const review = await this.prisma.review.update({
      where: { id },
      data: {
        message: dto.message,
      },
      include: { user: true },
    });

    this.events$.next({
      type: 'updated',
      reviewId: review.id,
      userEmail: review.user.email,
    });

    return review;
  }

  async deleteReview(id: number) {
    await this.getReview(id);

    const review = await this.prisma.review.delete({
      where: { id },
      include: { user: true },
    });

    this.events$.next({
      type: 'deleted',
      reviewId: review.id,
      userEmail: review.user.email,
    });

    return review;
  }
}

