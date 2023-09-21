import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { SystemGateway } from './system.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  exports: [TypeOrmModule],
  controllers: [SystemController],
  providers: [SystemService]
})
export class SystemModule { }
