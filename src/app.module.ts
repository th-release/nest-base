import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './configuration/configuration.module';
import { RedisModule } from './utils/redis';
import { SystemModule } from './system/system.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: "mysql",
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_SCHEMA'),
      entities: [],
      synchronize: configService.get<boolean>('TYPEORM_SYBCHRONIZE')
    })
  }),
    ConfigurationModule,
    // RedisModule,
    SystemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
