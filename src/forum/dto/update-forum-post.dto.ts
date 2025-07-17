import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateForumPostDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  contenu: string;

  @IsUUID()
  @IsNotEmpty()
  forumId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  url_media?: string; // rempli automatiquement par le controller multer
}
