import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './enum/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async register(nom: string, email: string, password: string, date_naissance: Date): Promise<User> {
        const user = this.userRepository.create({
            nom,
            email,
            password,
            date_naissance
        });
        return this.userRepository.save(user);
    }

    async createAdmin(nom: string, email: string, password: string, date_naissance: Date): Promise<User> {
        const user = this.userRepository.create({
            nom,
            email,
            password,
            date_naissance,
            role: UserRole.Admin, // Assigning the Admin role
            isActive: true, // Ensuring the user is active by default
        });
        return this.userRepository.save(user);
    }

    async update(id: string, nom: string, email: string, password: string, date_naissance: Date): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        user.nom = nom;
        user.email = email;
        user.password = password;
        user.date_naissance = date_naissance;
        return this.userRepository.save(user);
    }



    async delete(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user || user.delete_date != null) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        user.delete_date = new Date();
        if (user.isActive) {
            user.isActive = false;
        }
        return this.userRepository.save(user);
    }

    async restore(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user || user.delete_date == null) {
            throw new NotFoundException(`User with id ${id} not found or already restored`);
        }
        user.delete_date = null;
        user.isActive = true;
        return this.userRepository.save(user);
    }

    async disable(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        user.isActive = false;
        return this.userRepository.save(user);
    }

    async changePassword(email: string, oldPassword: string, newPassword: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new UnauthorizedException(`Ancien mot de passe incorrect`);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        return this.userRepository.save(user);
    }

    async enable(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        user.isActive = true;
        return this.userRepository.save(user);
    }


    findAll(): Promise<User[]> {
        return this.userRepository.find({ where: { delete_date: IsNull() } });
    }

    async findByRole(role: UserRole): Promise<User[]> {
        return this.userRepository.find({ where: { role } });
    }

    findOne(id: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    findOneByName(nom: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { nom } });
    }

    findOneByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }
}