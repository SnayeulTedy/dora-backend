import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IsEmpty, IsOptional } from "class-validator";
import { UserRole } from "./enum/roles.enum";


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nom: string;

    // @Column()
    // prenom: string;

    @Column()
    email: string

     @Column({ type: 'date', nullable: true })
    @IsOptional()
    date_naissance: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    date_creation: Date;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.User,
    })
    role: UserRole;

    @Column()
    password: string;

    @Column({ type: 'timestamp', nullable: true })
    delete_date?: Date | null;


    @Column({ default: true })
    isActive: boolean;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return bcrypt.compare(attempt, this.password);
    }
}
