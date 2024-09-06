import { Controller, Get, Post, Put, Delete, Param, Body, Query, Inject, UseGuards } from '@nestjs/common';
import { IUserPort } from '../../../../application/user/user.port';
import { User } from '../../../../domain/user/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../../../application/user/user.dto';
import { JwtAuthGuard } from '../../../../infrastructure/security/http/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(@Inject('IUserPort') private readonly userService: IUserPort) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<{ data: User[], total: number }> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.userService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Get(':email')
  findByUserEmail(@Param('email') email: string) {
    return this.userService.findByUserEmail(email);
  }
}