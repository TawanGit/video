import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryController } from './cloudinary/cloudinary.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ⬅️ this loads .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
})
export class AppModule {}
