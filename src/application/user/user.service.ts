import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { IAuthPort } from '../auth/auth.port';
import { IUserPort } from './user.port';

@Injectable()
export class UserService implements IUserPort {
    constructor(
        @Inject('IUserRepository')
        private readonly repository: IUserRepository<User>,
        @Inject('IAuthPort')
        private readonly authService: IAuthPort,
    ) { }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Partial<User>[], total: number }> {
        // Validate and adjust pagination parameters if needed
        const pageNumber = page > 0 ? page : 1;
        const limitNumber = limit > 0 ? limit : 10;

        // Call the repository method to get paginated results
        const result = await this.repository.findAll(pageNumber, limitNumber);
        result.data = result.data.map((data) => {
            const { password, ...result } = data;
            return result;
        });
        return result;
    }

    async findOne(id: string): Promise<Partial<User>> {
        const { password, ...result} = await this.repository.findById(id);
        return result;
    }

    async create(user: User): Promise<Partial<User>> {
        user.password = await this.authService.hashPassword(user.password);
        const { password, ...result } = await this.repository.create(user);
        return result;
    }

    async update(id: string, user: Partial<User>): Promise<Partial<User>> {
        // Ensure that the ID is valid before proceeding
        const existingUser = await this.repository.findById(id);
        if (!existingUser) {
            throw new NotFoundException(`User '${id}' not found`);
        }

        user.password = await this.authService.hashPassword(user.password);
        user.id = id;
        const { password, ...result } = await this.repository.update(user);
        return result;
    }

    async delete(id: string): Promise<void> {
        // Ensure that the ID is valid before deleting
        const existingUser = await this.repository.findById(id);
        if (!existingUser) {
            throw new NotFoundException(`User '${id}' not found`);
        }

        return this.repository.delete(existingUser);
    }

    async findByUserEmail(email: string): Promise<User> {
        return await this.repository.findByUserEmail(email);
    }
}