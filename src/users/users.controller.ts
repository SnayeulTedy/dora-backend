import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get()
    async getAllUsers(){
        return this.userService.findAll();
    }

    @Post('register')
    async register(@Body() createUserDto: RegisterUserDto) {
      const { nom, prenom, email, password, date_naissance} = createUserDto;
      return this.userService.register(nom, prenom, email, password, date_naissance);
    }
}
