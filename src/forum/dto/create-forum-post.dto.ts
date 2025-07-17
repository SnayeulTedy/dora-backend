import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateForumPostDto {
  @IsNotEmpty()
  titre: string;

  @IsNotEmpty()
  contenu: string;

  @IsOptional()
  url_media?: string;

  @IsUUID()
  forumId: string;

  @IsUUID()
  userId: string;
}
