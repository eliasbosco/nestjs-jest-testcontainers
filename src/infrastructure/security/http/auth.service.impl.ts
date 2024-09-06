// infrastructure/security/auth.service.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user.entity';
import { IAuthPort } from '../../../application/auth/auth.port';

@Injectable()
export class AuthServiceImpl implements IAuthPort {
    private readonly saltRounds = 10;

    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository<User>,
        private readonly jwtService: JwtService,
    ) { }

    // Method to hash a password
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password, salt);
    }

    // Method to compare hashed password
    async comparePasswords(storedPassword: string, providedPassword: string): Promise<boolean> {
        return bcrypt.compare(providedPassword, storedPassword);
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findByUserEmail(email);
        if (user === undefined) {
            Logger.error(`User not found: ${email}`);
            return null;
        }
        if (await this.comparePasswords(user.password, password)) {
            return user;
        }
        return null;
    }

    async login(email: string, password: string): Promise<any> {
        const user = await this.validateUser(email, password);
        if (!user) {
            Logger.error(`User not found: ${email}`);
            return null;
        }
        return {
            access_token: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }),
        };
    }
}