import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enum/roles.enum';
import { Roles } from './decorator/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get()
  async getAllUsers() {
    const users = this.userService.findAll(); 
    return users.then(userList => 
      userList.map(user => {
        const { password, ...userWithoutPassword } = user as any;
        return userWithoutPassword;
      })
    );   
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const { nom, email, password, date_naissance } = registerUserDto;
    return this.userService.register(nom, email, password, date_naissance);
  }

  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUSerDto: UpdateUserDto
  ): Promise<User> {
    const { nom, email, password, date_naissance } = updateUSerDto;
    const user = await this.userService.update(id, nom,  email, password, date_naissance);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { password: _, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    const user = await this.userService.delete(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  @Post('restore/:id')
  async restore(@Param('id') id: string): Promise<User> {
    const user = await this.userService.restore(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  @Post('disable/:id')
  @Roles(UserRole.Admin)
  async disable(@Param('id') id: string): Promise<User> {
    const user = await this.userService.disable(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  @Post('enable/:id')
  async enable(@Param('id') id: string): Promise<User> {
    const user = await this.userService.enable(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  @Get('role/:role')
  async getUsersByRole(@Param('role') role: UserRole) {
    const user = await this.userService.findByRole(role);
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  @Get('nom/:nom')
  async findOneByName(@Param('nom') nom: string): Promise<User> {
    const user = await this.userService.findOneByName(nom);
    if (!user) {
      throw new NotFoundException(`User with name ${nom} not found`);
    }
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }


  
}
