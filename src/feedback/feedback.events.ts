export type FeedbackEventType = 'created' | 'updated' | 'deleted';

export type FeedbackEventPayload = {
  type: FeedbackEventType;
  reviewId: number;
  userEmail?: string;
  createdAt?: string;
};

