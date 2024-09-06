import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/user/user.entity';
import { UserRepositoryImpl } from '../../infrastructure/database/user/user.repository.impl';
import { AuthModule } from '../../infrastructure/security/http/auth.module';
import { UserService } from './user.service';
import { UserController } from '../../interface/in/http/user/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Register User entity with TypeOrm
        forwardRef(() => AuthModule), // Forward reference to AuthModule to resolve circular dependency
    ],
    controllers: [UserController], // Add UserController
    providers: [
        {
            provide: 'IUserPort',
            useClass: UserService,
        },
        {
            provide: 'IUserRepository', // Bind IUserRepository interface to UserRepository
            useClass: UserRepositoryImpl,
        },
        UserService, // Provide UserService
    ],
    exports: ['IUserRepository', UserService], // Export IUserRepository and UserService
})
export class UserModule { }