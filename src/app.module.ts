import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './configuration/configuration.module';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import UserEntity from './entities/auth/user.entity';
import { AuthMiddleware } from './auth/auth.middleware';

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
      entities: [
        UserEntity
      ],
      logging: configService.get<boolean>('DATABASE_LOGGING'),
      synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE')
    })
  }),
    ConfigurationModule,
    // RedisModule,
    SystemModule,
    AuthModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
