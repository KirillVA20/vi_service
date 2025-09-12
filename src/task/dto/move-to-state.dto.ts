import { IsMongoId } from 'class-validator';

export class MoveToStateDto {
  @IsMongoId()
  id: string;
}
