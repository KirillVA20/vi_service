/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // redy per spec; optional on create, default false
  @IsOptional()
  @IsBoolean()
  redy?: boolean;

  @IsOptional()
  @IsBoolean()
  urgently?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  priority?: number;

  @IsOptional()
  @IsBoolean()
  archive?: boolean;
}
