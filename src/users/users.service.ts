import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './enum/roles.enum';

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
        if(user.isActive) {
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