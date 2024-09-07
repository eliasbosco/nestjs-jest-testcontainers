import { User } from '../../domain/user/user.entity';

export interface IUserPort {
    findAll(page: number, limit: number): Promise<{ data: Partial<User>[], total: number }>;
    findOne(id: string): Promise<Partial<User> | null>;
    create(user: User): Promise<Partial<User>>;
    update(id: string, user: Partial<User>): Promise<Partial<User>>;
    delete(id: string): Promise<void>;
    findByUserEmail(email: string): Promise<Partial<User>>;
}