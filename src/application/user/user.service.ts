import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';
import { CreateUserDto, UpdateUserDto } from './user.dto';
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

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: User[], total: number }> {
        // Validate and adjust pagination parameters if needed
        const pageNumber = page > 0 ? page : 1;
        const limitNumber = limit > 0 ? limit : 10;

        // Call the repository method to get paginated results
        const result = await this.repository.findAll(pageNumber, limitNumber);
        result.data.map((data) => {
            delete data.password;
            return data;
        });
        return result;
    }

    async findOne(id: string): Promise<User> {
        const user: User = await this.repository.findById(id);
        delete user.password;
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const poi = new User();
        Object.assign(poi, createUserDto);
        poi.password = await this.authService.hashPassword(poi.password);
        const user = await this.repository.create(poi);
        delete user.password;
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
        // Ensure that the ID is valid before proceeding
        const existingUser = await this.repository.findById(id);
        if (!existingUser) {
            throw new NotFoundException(`User '${id}' not found`);
        }

        // Merge the update data into the existing User entity
        const updatedUser = Object.assign(existingUser, updateUserDto);
        updatedUser.password = await this.authService.hashPassword(updatedUser.password);
        updatedUser.id = id;
        const user: Partial<User> = await this.repository.update(updatedUser);
        delete user.password;
        return user;
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
        return await this.repository.findById(email);
    }
}