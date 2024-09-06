import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../../../domain/user/user.entity';
import { IUserRepository } from '../../../domain/user/user.repository';

@Injectable()
export class UserRepositoryImpl implements IUserRepository<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: User[], total: number }> {
        const [result, total] = await this.userRepository
            .createQueryBuilder('user')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return {
            data: result,
            total,
        };
    }

    async findById(id: string): Promise<User> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async create(user: User): Promise<User> {
        // Start transaction
        return await this.userRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            return await transactionalEntityManager.save(user);
        });
    }

    async update(user: Partial<User>): Promise<Partial<User>> {
        // Start transaction
        return await this.userRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            return await transactionalEntityManager.save(user);
        });
    }

    async delete(user: User): Promise<void> {
        // Start transaction
        return await this.userRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            await transactionalEntityManager.remove(user);
        });
    }

    async findByUserEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }
}