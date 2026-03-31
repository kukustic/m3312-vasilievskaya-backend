import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateFeedbackDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  message?: string;
}

