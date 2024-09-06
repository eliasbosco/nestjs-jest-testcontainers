export interface IAuthPort {
  hashPassword(password: string): Promise<string>;
  comparePasswords(storedPassword: string, providedPassword: string): Promise<boolean>;
  validateUser(email: string, password: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
}