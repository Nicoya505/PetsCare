import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config/configuration';
import { validationSchema } from './config/validations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[configuration],
      validationSchema,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`
    }),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: ( configService: ConfigService) =>({
        type:'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        autoLoadEntities:true,
        synchronize:false
      })
    }),

    BreedsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
