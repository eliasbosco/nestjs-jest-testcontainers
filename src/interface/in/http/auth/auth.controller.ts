// interface/http/auth.controller.ts
import { Controller, Post, Body, Req, UseGuards, Get, Inject, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { IAuthPort } from '../../../../application/auth/auth.port';
import { JwtAuthGuard } from '../../../../infrastructure/security/http/guards/jwt-auth.guard'; // Ensure correct path to the guard
import { Request } from 'express';
import { CustomExceptionFilter } from '../../../../infrastructure/config/custom-exception.filter';

@Controller('auth')
@UseFilters(CustomExceptionFilter)
export class AuthController {
    constructor(@Inject('IAuthPort') private readonly authService: IAuthPort) { }

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        if (!loginDto?.email || !loginDto.password) {
            throw new HttpException('Email and password is required', HttpStatus.UNAUTHORIZED);
        }
        const login = await this.authService.login(loginDto.email, loginDto.password);
        if (!login) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        return login;
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: Request) {
        return req.user;
    }
}