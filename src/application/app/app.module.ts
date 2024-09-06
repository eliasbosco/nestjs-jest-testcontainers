import { Module } from '@nestjs/common';
import { AppController } from '../../interface/in/http/app/app.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../infrastructure/database/config/ormconfig';
import { AuthModule } from '../../infrastructure/security/http/auth.module';
import { UserModule } from '../user/user.module';
import { POIModule } from '../poi/poi.module';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // Use the config from ormconfig.ts
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' }, // Token expiration
    }),
    AuthModule,
    POIModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}