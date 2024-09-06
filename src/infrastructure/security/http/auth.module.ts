// auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthServiceImpl } from './auth.service.impl'; // Import AuthServiceImpl which implements IAuthPort
import { UserModule } from '../../../application/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from '../../../interface/in/http/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => UserModule), // Use forwardRef to resolve circular dependency with UserModule
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60m' }, // Configure token expiration
        }),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: 'IAuthPort', // Bind IAuthPort interface
            useClass: AuthServiceImpl, // Use AuthServiceImpl as the concrete implementation
        },
        JwtStrategy,
    ],
    exports: ['IAuthPort'], // Export IAuthPort so other modules can use the authentication service
})
export class AuthModule {}