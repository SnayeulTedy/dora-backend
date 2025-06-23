import { IsEmail, IsString, MinLength, MaxLength, Matches, IsBoolean, IsOptional, isDate, IsDate } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    nom: string;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    prenom: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
        message: 'Password too weak (must contain at least 1 uppercase, 1 lowercase and 1 number)',
    })
    password: string;

    @IsDate()
    date_naissance:Date;

    @IsOptional()
    delete_date:Date;


   
}