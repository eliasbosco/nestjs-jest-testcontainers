import { IsNotEmpty, IsString, IsUUID, IsBoolean, ValidateNested, IsOptional, IsIn, IsEmail, IsStrongPassword } from 'class-validator';
import { Role } from '../../domain/user/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  idPoi?: string;

  @IsNotEmpty()
  @IsIn([Role])
  role: Role;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsStrongPassword()
  password: string;

  @IsUUID()
  @IsOptional()
  idPoi?: string;

  @IsOptional()
  @IsIn([Role])
  role: Role;
}