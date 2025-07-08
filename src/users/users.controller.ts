import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enum/roles.enum';
import { IsAdmin, Roles } from './decorator/role.decorator';
import { RolesGuard } from './guard/role.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private userService: UsersService) { }

  // Supprime le mot de passe avant de retourner l'utilisateur
  private sanitizeUser(user: User) {
    const { password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  @Get('profile')
  getProfile(@Req() req: any) {
    console.log('User:', req.user);
    return req.user;
  }

  @Get('me')
  async getMe(@Req() req: any): Promise<User> {
    const userId = (req.user as { id: string }).id; // Assurez-vous que l'ID de l'utilisateur est dans la requête
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return this.sanitizeUser(user);
  }


  @Get()
  @Roles(UserRole.Admin)
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users.map(user => this.sanitizeUser(user));
  }

  // @Post('register')
  // async register(@Body() registerUserDto: RegisterUserDto) {
  //   const { nom, email, password, date_naissance } = registerUserDto;
  //   return this.userService.register(nom, email, password, date_naissance);
  // }

  @Post('register-admin')
  @Roles(UserRole.Admin)
  async registerAdmin(@Body() registerUserDto: RegisterUserDto) {
    const { nom, email, password, date_naissance } = registerUserDto;
    return this.userService.createAdmin(nom, email, password, date_naissance);
  }

  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    const { nom, email, password, date_naissance } = updateUserDto;
    const user = await this.userService.update(id, nom, email, password, date_naissance);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.sanitizeUser(user);
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
    return this.sanitizeUser(user);
  }

  @Post('disable/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.Admin)
  async disable(@Param('id') id: string): Promise<User> {
    const user = await this.userService.disable(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.sanitizeUser(user);
  }


  @Post('enable/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.Admin)
  async enable(@Param('id') id: string): Promise<User> {
    const user = await this.userService.enable(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.sanitizeUser(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.sanitizeUser(user);
  }

  @Get('role/:role')
  async getUsersByRole(@Param('role') role: UserRole) {
    const users = await this.userService.findByRole(role);
    return users.map(user => this.sanitizeUser(user));
  }

  @Get('nom/:nom')
  async findOneByName(@Param('nom') nom: string): Promise<User> {
    const user = await this.userService.findOneByName(nom);
    if (!user) {
      throw new NotFoundException(`User with name ${nom} not found`);
    }
    return this.sanitizeUser(user);
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return this.sanitizeUser(user);
  }

}
