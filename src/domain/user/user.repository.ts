import { User } from "./user.entity";

export interface IUserRepository<User> {
  findById(id: string): Promise<User>;
  findAll(page: number, limit: number): Promise<{ data: Partial<User>[], total: number }>;
  create(user: Partial<User>): Promise<User>;
  update(user: Partial<User>): Promise<Partial<User>>;
  delete(user: User): Promise<void>;
  findByUserEmail(email: string): Promise<User>;
}