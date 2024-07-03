import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  page?: number;
}