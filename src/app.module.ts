import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config/configuration';
import { validationSchema } from './config/validations';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[configuration],
      validationSchema,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: ( configService: ConfigService) =>({
        type:'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        name: configService.get<string>('database.name'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password')
      })
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
