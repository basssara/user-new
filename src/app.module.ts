import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { dbConfig } from './db.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.getOrThrow('database.host'),
        port: config.getOrThrow('database.port'),
        username: config.getOrThrow('database.username'),
        password: config.getOrThrow('database.password'),
        database: config.getOrThrow('database.database'),
        entities: [UserEntity],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
