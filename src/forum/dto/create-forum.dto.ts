import { IsNotEmpty, IsString } from 'class-validator';

export class CreateForumDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsString()
  description: string;
}
