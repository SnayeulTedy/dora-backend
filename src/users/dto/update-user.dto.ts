import { IsEmail, IsString, MinLength, MaxLength, Matches, IsBoolean, IsOptional, isDate, IsDate } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsOptional()
    nom: string;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsOptional()
    prenom: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
        message: 'Password too weak (must contain at least 1 uppercase, 1 lowercase and 1 number)',
    })
    @IsOptional()
    password: string;

    @IsDate()
    @IsOptional()
    date_naissance:Date;

   
}