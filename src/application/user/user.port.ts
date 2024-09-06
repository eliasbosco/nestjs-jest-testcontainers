import { User } from '../../domain/user/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

export interface IUserPort {
  findAll(page: number, limit: number): Promise<{ data: User[], total: number }>;
  findOne(id: string): Promise<User | null>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>>;
  delete(id: string): Promise<void>;
  findByUserEmail(email: string): Promise<User>;
}