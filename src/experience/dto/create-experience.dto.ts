import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateExperienceDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  contenu: string;

  @IsOptional()
  @IsString()
  url_media?: string;

  @IsNotEmpty()
  @IsUUID()
  paysId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
  id: string;
}
