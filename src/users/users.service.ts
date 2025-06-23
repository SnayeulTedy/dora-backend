import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async register(nom: string, prenom: string, email: string, password: string, date_naissance: Date): Promise<User> {
        const user = this.userRepository.create({
            nom,
            prenom,
            email,
            password,
            date_naissance
        });
        return this.userRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
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